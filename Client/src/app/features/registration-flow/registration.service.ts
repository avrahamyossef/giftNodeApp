import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../validations/custom-validators';
import { CONSTANTS } from '../../constants/constacts';
import { RouterService } from '../../core/services/router.service';

@Injectable()
export class RegistrationService {

  public steps: any = {
    step1: 1,
    step2: 2,
    step3: 3,
  };
  public currentStep: number = this.steps.step1;
  public stepFinished: number = 0;
  public RegistrationToken: string = '';
  public registerSuccess: boolean;

  /** STEP 1: Personal Details Controls **/
  public firstNameControl: FormControl;
  public lastNameControl: FormControl;
  public idNumberControl: FormControl;
  public mobileControl: FormControl;
  public mobilePrfsControl: FormControl;
  public extraPhoneControl: FormControl;
  public extraPhonePrfsControl: FormControl;
  public emailControl: FormControl;
  public OTPCodeControl: FormControl;

  /** STEP 2: Address Controls **/
  public selfPickUpControl: FormControl;
  public cityControl: FormControl;
  public neighborhoodControl: FormControl;
  public streetControl: FormControl;
  public houseNumberControl: FormControl;
  public zipControl: FormControl;
  public structureControl: FormControl;
  public elevatorControl: FormControl;
  public floorControl: FormControl;
  public apartmentControl: FormControl;
  public entranceControl: FormControl;
  public notesControl: FormControl;
  public storeSelected: number; // self-pickup store

  /** STEP 3: Password Controls **/
  public passwordControl: FormControl;
  public verifyPasswordControl: FormControl;
  public commercialToggleControl: FormControl;
  public policyConditionsToggleControl: FormControl;

  constructor(private router: RouterService) { }

  resetControls() {
    /** STEP 1: Personal Details Controls **/
    this.firstNameControl       = new FormControl(null, [Validators.required, CustomValidators.validateCharacters(CONSTANTS.REGEX_CUSTOM_VALIDATORS.NAME_V2)]);
    this.lastNameControl        = new FormControl(null, [Validators.required, CustomValidators.validateCharacters(CONSTANTS.REGEX_CUSTOM_VALIDATORS.NAME_V2)]);
    this.idNumberControl        = new FormControl(null, Validators.required);
    this.mobileControl          = new FormControl(null, [Validators.required, CustomValidators.validateCharacters(CONSTANTS.REGEX_CUSTOM_VALIDATORS.PHONE_SUFFIX)]);
    this.mobilePrfsControl      = new FormControl(null, Validators.required);
    this.extraPhoneControl      = new FormControl(null, CustomValidators.validateCharacters(CONSTANTS.REGEX_CUSTOM_VALIDATORS.PHONE_SUFFIX));
    this.extraPhonePrfsControl  = new FormControl(null);
    this.emailControl           = new FormControl(null, Validators.required);
    this.OTPCodeControl         = new FormControl(null, [Validators.required, CustomValidators.minLength(CONSTANTS.LOGIN.MIN_OTP_LENGTH)]);

    /** STEP 2: Address Controls **/
    this.selfPickUpControl   = new FormControl(false);
    this.cityControl         = new FormControl(null, Validators.required);
    this.neighborhoodControl = new FormControl(null, Validators.pattern(CONSTANTS.REGEX_PATTERN_VALIDATORS.CITY));
    this.streetControl       = new FormControl({value: null, disabled: true}, [Validators.required, Validators.pattern(CONSTANTS.REGEX_PATTERN_VALIDATORS.CITY)]);
    this.houseNumberControl  = new FormControl(null, [Validators.required]);
    this.zipControl          = new FormControl(null, [Validators.required, CustomValidators.maxLength(7), CustomValidators.minLength(7)]);
    this.structureControl    = new FormControl(null, Validators.required);
    this.elevatorControl     = new FormControl(null, Validators.required);
    this.floorControl        = new FormControl(null, Validators.required);
    this.apartmentControl    = new FormControl(null, Validators.required);
    this.entranceControl     = new FormControl(null, Validators.pattern(CONSTANTS.REGEX_CUSTOM_VALIDATORS.ADDRESS_ENTRANCE));
    this.notesControl        = new FormControl(null, Validators.pattern(CONSTANTS.REGEX_CUSTOM_VALIDATORS.NAME_V2));

    /** STEP 3: Password Controls **/
    this.passwordControl = new FormControl(null, [Validators.required, Validators.pattern(CONSTANTS.REGEX_PATTERN_VALIDATORS.PASSWORD), CustomValidators.minLength(CONSTANTS.LOGIN.MIN_PASS_LENGTH)]);
    this.verifyPasswordControl = new FormControl(null, [Validators.required, Validators.pattern(CONSTANTS.REGEX_PATTERN_VALIDATORS.PASSWORD), CustomValidators.matchPassword(this.passwordControl), CustomValidators.minLength(CONSTANTS.LOGIN.MIN_PASS_LENGTH)]);
    this.commercialToggleControl = new FormControl(false);
    this.policyConditionsToggleControl = new FormControl(false, Validators.required);

  }

  changeCurrentStep(stepNumber) {
    switch (stepNumber) {
      case this.steps.step1: {
        this.router.navigate(['registration/personalDetails']);
        break;
      }
      case this.steps.step2: {
        this.router.navigate(['registration/address']);
        break;
      }
      case this.steps.step3: {
        this.router.navigate(['registration/password']);
        break;
      }
    }
    this.currentStep = stepNumber;
  }
}
