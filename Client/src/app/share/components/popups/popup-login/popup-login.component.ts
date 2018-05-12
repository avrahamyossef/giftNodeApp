import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../validations/custom-validators';
import { CONSTANTS } from '../../../../constants/constacts';
import { ApiUserService } from '../../../../core/services/api/api.user.service';
import { UserService } from '../../../../core/services/user.service';
import { RouterService } from '../../../../core/services/router.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppService } from '../../../../core/services/app.service';

@Component({
  selector: 'app-popup-login',
  templateUrl: './popup-login.component.html',
  styleUrls: ['./popup-login.component.scss']
})
export class PopupLoginComponent implements OnInit {

  @Input() modalRef: BsModalRef;

  public idEmailControl: FormControl;
  public passwordControl: FormControl;
  public showInvalidError: boolean = false;
  public forgotPasswordView: boolean = false;

  constructor(private apiUser: ApiUserService,
    private userService: UserService, private appService: AppService,
    private router: RouterService, private modalService: BsModalService) { }

  ngOnInit() {
    this.idEmailControl = new FormControl(null, Validators.required);
    this.passwordControl = new FormControl(null, [Validators.required, CustomValidators.pattern(CONSTANTS.REGEX_PATTERN_VALIDATORS.PASSWORD)]);
  }

  inputChanged() {
    this.showInvalidError = false;
  }

  keypress($event) {
    const key = $event.key;

    const pattern = CONSTANTS.REGEX_PATTERN_VALIDATORS.PASSWORD;
    const regx = new RegExp(pattern);

    if (!regx.exec(key)) {
      $event.preventDefault();
    }
  }

  isFormValid() {
    return (this.idEmailControl.valid && this.passwordControl.valid);
  }

  signIn() {
    this.appService.showFullPageLoader = true;
    this.idEmailControl.markAsDirty();
    this.passwordControl.markAsDirty();
    if (this.isFormValid()) {
      if (this.passwordControl.value.length == 0) {//< CONSTANTS.LOGIN.MIN_PASS_LENGTH) {
        this.showInvalidError = true;
      } else {
        this.apiUser.signIn(this.idEmailControl.value, this.passwordControl.value).subscribe((response) => {
          if (response.token) {
            this.userService.setAccessToken(response.token);
            this.userService.updateUserInfo(response);
                this.appService.showFullPageLoader = false;
                this.gotoPostLogin();
            
          } else {
            this.appService.showFullPageLoader = false;
            this.showInvalidError = true;
            // TODO :: handle error response
          }
        }, ((signInErr: any) => {
          this.appService.showFullPageLoader = false;
          this.showInvalidError = true;
          // TODO :: handle error response
        }));
      }
    }
    else{
      this.appService.showFullPageLoader = false;
      this.showInvalidError = true;
    }
  }

  /**
   * go to homepage
   */
  gotoPostLogin() {
    //this.router.navigate(['postLogin'], { skipLocationChange: true });
    this.router.navigate(['']); //home page
    this.modalRef.hide();
  }

  navigateToRegistration() {
    this.router.navigate(['registration']);
    this.modalRef.hide();
  }

  forgotPasswordClicked() {
    this.forgotPasswordView = true;
    this.modalRef.hide();
  }

  backToLogin() {
    this.forgotPasswordView = false;
  }
}
