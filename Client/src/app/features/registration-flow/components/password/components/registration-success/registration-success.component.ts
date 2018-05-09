import { Component, OnDestroy, OnInit } from '@angular/core';
import * as models from '../../../../../../models';
import { FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../../../validations/custom-validators';
import { CONSTANTS } from '../../../../../../constants/constacts';
import { ApiUserService } from '../../../../../../core/services/api/api.user.service';
import { RegistrationService } from '../../../../registration.service';

declare var $: any;

@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.scss']
})
export class RegistrationSuccessComponent implements OnInit, OnDestroy {

  constructor(private registrationService: RegistrationService,
              private userService: ApiUserService) {
  }

  ngOnInit() {
    }


  ngOnDestroy() {
  }
}
