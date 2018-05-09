import { Component, OnDestroy, OnInit } from '@angular/core';
import * as models from '../../../../models';
import { FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../validations/custom-validators';
import { CONSTANTS } from '../../../../constants/constacts';
import { ApiUserService } from '../../../../core/services/api/api.user.service';
import { RegistrationService } from '../../registration.service';

declare var $: any;

@Component({
  selector: 'app-registration-step1',
  templateUrl: './registration-step1.component.html',
  styleUrls: ['./registration-step1.component.scss']
})
export class RegistrationStep1Component implements OnInit, OnDestroy {

  public viewMode = {
    personalDetails: 1,
    OTPCode: 2
  };
  public currentViewMode: number;
  public loadingResults: boolean;

  constructor(private registrationService: RegistrationService,
              private userService: ApiUserService) {
  }

  ngOnInit() {
    this.currentViewMode = this.viewMode.personalDetails;

    // this.userService.getRegistrationToken().subscribe((response) => {
    //   if (response.IsOK) {
    //     this.registrationService.RegistrationToken = response.Results.RegistrationToken;
    //   }
    // });
  }

  setLoading(isLoading) {
    this.loadingResults = isLoading;
  }

  changeCurrentView(viewMode) {
    this.currentViewMode = viewMode;
  }

  ngOnDestroy() {
  }
}
