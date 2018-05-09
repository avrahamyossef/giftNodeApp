import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as models from '../../../../models';
//import { RegistrationService } from '../../registration.service';
import { CONSTANTS } from '../../../../constants/constacts';
import { ApiUserService } from '../../../../core/services/api/api.user.service';
//import { RcTimeService } from '../../../../core/services/rc-time.service';
import { RouterService } from '../../../../core/services/router.service';
import { AppService } from '../../../../core/services/app.service';
//import { UserService } from '../../../../../core/services/user.service';

declare var $: any;

@Component({
  selector: 'app-registration-step3',
  templateUrl: './registration-step3.component.html',
  styleUrls: ['./registration-step3.component.scss']
})
export class RegistrationStep3Component implements OnInit, OnDestroy {

  @Input() source: string;

  // public loading
  public CONSTANTS = CONSTANTS;
  private regulationApprovedOn: string;
  public viewMode = { password: 1, success: 2 };
  public currentView: number;

  /* REGISTRATION PAYLOAD */
  public userInfoPayload: any[];//models.UserInfoModel = null;
  public userCredentialsPayload: any[];//models.UserCredentialsModel = null;
  public userAddressesPayload: any[];//models.UserAddresses = null;

  get passwordControl() {
    return null; //this.registrationService.passwordControl;
  }

  get verifyPasswordControl() {
    return null; //this.registrationService.verifyPasswordControl;
  }

  get commercialToggleControl() {
    return null; //this.registrationService.commercialToggleControl;
  }

  get policyConditionsToggleControl() {
    return null; //this.registrationService.policyConditionsToggleControl;
  }

  get firstName() {
    return null; //this.registrationService.firstNameControl.value;
  }

  constructor(
              private apiUserService: ApiUserService,
              private router: RouterService,
              private appService: AppService) {
  }

  ngOnInit() {
    // if (!this.registrationService.RegistrationToken || this.registrationService.stepFinished < this.registrationService.steps.step2) {
    //   if (this.registrationService.stepFinished === this.registrationService.steps.step1) {
    //     this.registrationService.changeCurrentStep(this.registrationService.steps.step2);

    //   } else {
    //     this.registrationService.changeCurrentStep(this.registrationService.steps.step1);
    //   }
    // } else {
    //   this.currentView = this.viewMode.password;
    // }
  }

  onCommercialToggle() {
  }

  onPolicyToggle() {
    //this.regulationApprovedOn = this.time.getTimeStamp();
    //this.regulationApprovedOn = this.time.decrementDateUnitsFromDate(this.regulationApprovedOn, 3, 'hour');
  }

  /**
   * go to full catalog page
   */
  goToFullCatalog() {
    //this.router.navigate(['catalog'], { queryParams: { viewMode: CONSTANTS.CATALOG.VIEW_MODE.VIEW_2 } });
  }

  checkValidations() {
    return (
      this.passwordControl.valid &&
      this.verifyPasswordControl.valid &&
      this.policyConditionsToggleControl.valid);
  }

  /**
   * create params for registration service by RegisterModel and fires an API call.
   * 'UserAddresses' object and 'SelfPickUp' object depends on selfPickUpControl selection.
   */
  generatePayload() {
  //   this.userInfoPayload = {
  //     Email: this.registrationService.emailControl.value,
  //     FName: this.registrationService.firstNameControl.value,
  //     LName: this.registrationService.lastNameControl.value,
  //     Mobile_Prf: this.registrationService.mobilePrfsControl.value,
  //     Mobile: this.registrationService.mobileControl.value,
  //     Phone_Prf: this.registrationService.extraPhonePrfsControl.value,
  //     Phone: this.registrationService.extraPhoneControl.value,
  //     IsMarketingAprvl: this.registrationService.commercialToggleControl.value
  //   };
  //   this.userCredentialsPayload = {
  //     PWD: this.registrationService.passwordControl.value,
  //     PWD2: this.registrationService.verifyPasswordControl.value,
  //     Idz: this.registrationService.idNumberControl.value
  //   };
  //   this.userAddressesPayload = {
  //     IsSelfPickUp: this.registrationService.selfPickUpControl.value,
  //     Address: null,
  //     SelfPickUp: null
  //   };

  //   if (this.registrationService.selfPickUpControl.value) {
  //     this.userAddressesPayload.SelfPickUp = {
  //       StoreId: this.registrationService.storeSelected,
  //       Notes: this.registrationService.notesControl.value
  //     };
  //   } else {
  //     this.userAddressesPayload.Address = {
  //       CityId: this.registrationService.cityControl.value,
  //       StreetId: this.registrationService.streetControl.value,
  //       Neighborhood: this.registrationService.neighborhoodControl.value,
  //       Zip: this.registrationService.zipControl.value,
  //       Number: this.registrationService.houseNumberControl.value,
  //       Apartment: this.registrationService.apartmentControl.value,
  //       Floor: this.registrationService.floorControl.value,
  //       IsElevator: !!this.registrationService.elevatorControl.value,
  //       Entrance: this.registrationService.entranceControl.value,
  //       Structure: this.registrationService.structureControl.value,
  //       Notes: this.registrationService.notesControl.value
  //     };
  //   }
  // }

  // submit() {
  //   this.passwordControl.markAsDirty();
  //   this.verifyPasswordControl.markAsDirty();
  //   this.policyConditionsToggleControl.markAsDirty();
  //   const isFormValid = this.checkValidations();
  //   if (isFormValid) {
  //     this.appService.showFullPageLoader = true;
  //     this.generatePayload();
  //     this.apiUserService.register(this.regulationApprovedOn, this.registrationService.RegistrationToken, this.userInfoPayload, this.userCredentialsPayload, this.userAddressesPayload).subscribe((response) => {
  //       if (response.IsOK) {
  //         this.currentView = this.viewMode.success;
  //         this.registrationService.registerSuccess = true;
  //         this.apiUserService.signIn(this.registrationService.emailControl.value, this.registrationService.passwordControl.value).subscribe((signInResponse) => {
  //           if (signInResponse.access_token) {
  //             this.userService.updateUserInfo().subscribe(() => {
  //               this.appService.showFullPageLoader = false;
  //               // TODO :: when comming from checkout - return to checkout
  //               // this.router.navigate(['postLogin'], { skipLocationChange: true });
  //             }, (err: any) => {
  //               // TODO :: handle error
  //             });
  //           } else {
  //             this.appService.showFullPageLoader = false;
  //             // TODO :: error
  //           }
  //         });
  //       } else {
  //         this.appService.showFullPageLoader = false;
  //         // TODO :: error
  //       }
  //     }, (error) => {
  //       this.appService.showFullPageLoader = false;
  //       // TODO :: error
  //     });
  //   }
  }

  ngOnDestroy() {
  }
}
