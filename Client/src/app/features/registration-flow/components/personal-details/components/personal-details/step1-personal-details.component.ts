import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ApiUserService } from '../../../../../../core/services/api/api.user.service';
import { RegistrationService } from '../../../../registration.service';
import { AppService } from '../../../../../../core/services/app.service';

declare var $: any;

@Component({
  selector: 'app-step1-personal-details',
  templateUrl: './step1-personal-details.component.html',
  styleUrls: ['./step1-personal-details.component.scss']
})
export class Step1PersonalDetailsComponent implements OnInit, OnDestroy {

  @Input() viewMode: any;
  @Input() currentViewMode: number;
  @Output() setLoading: EventEmitter<any> = new EventEmitter();
  @Output() changeCurrentView: EventEmitter<any> = new EventEmitter();


  get firstNameControl() {
    return this.registrationService.firstNameControl;
  }
  get lastNameControl() {
    return this.registrationService.lastNameControl;
  }
  get idNumberControl() {
    return this.registrationService.idNumberControl;
  }
  get mobilePrfsControl() {
    return this.registrationService.mobilePrfsControl;
  }
  get mobileControl() {
    return this.registrationService.mobileControl;
  }
  get extraPhonePrfsControl() {
    return this.registrationService.extraPhonePrfsControl;
  }
  get extraPhoneControl() {
    return this.registrationService.extraPhoneControl;
  }
  get emailControl() {
    return this.registrationService.emailControl;
  }



  constructor(private registrationService: RegistrationService, private apiUserService: ApiUserService) { }

  ngOnInit() {
  }

  markAsTouchedAndDirty() {
    this.firstNameControl.markAsDirty();
    this.firstNameControl.markAsTouched();

    this.lastNameControl.markAsDirty();
    this.lastNameControl.markAsTouched();

    this.idNumberControl.markAsDirty();
    this.idNumberControl.markAsTouched();

    this.mobileControl.markAsDirty();
    this.mobileControl.markAsTouched();

    this.mobilePrfsControl.markAsDirty();
    this.mobilePrfsControl.markAsTouched();

    this.extraPhoneControl.markAsDirty();
    this.extraPhoneControl.markAsTouched();

    this.extraPhonePrfsControl.markAsDirty();
    this.extraPhonePrfsControl.markAsTouched();

    this.emailControl.markAsDirty();
    this.emailControl.markAsTouched();
  }

  checkValidations() {
    this.markAsTouchedAndDirty();
    return (this.firstNameControl.valid
            && this.lastNameControl.valid
            && this.idNumberControl.valid
            && this.mobilePrfsControl.valid
            && this.mobileControl.valid
            && this.extraPhonePrfsControl.valid
            && this.extraPhoneControl.valid
            && this.emailControl.valid);
  }

  submit() {
    const formValid = this.checkValidations();
    if (formValid) {
      this.nextToOTP();
    }
  }

  nextToOTP() {

  }

  ngOnDestroy() {
  }
}
