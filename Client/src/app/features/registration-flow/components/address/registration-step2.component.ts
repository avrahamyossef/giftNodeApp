import { Component, OnDestroy, OnInit } from '@angular/core';
import * as models from '../../../../models';
import { FormControl, Validators } from '@angular/forms';
import { CONSTANTS } from '../../../../constants/constacts';
import { CustomValidators } from '../../../../validations/custom-validators';
import { RegistrationService } from '../../registration.service';
import { RouterService } from '../../../../core/services/router.service';

declare var $: any;

@Component({
  selector: 'app-registration-step2',
  templateUrl: './registration-step2.component.html',
  styleUrls: ['./registration-step2.component.scss']
})
export class RegistrationStep2Component implements OnInit, OnDestroy {

  get selfPickUpControl() {
    return this.registrationService.selfPickUpControl;
  }

  get cityControl() {
    return this.registrationService.cityControl;
  }

  get neighborhoodControl() {
    return this.registrationService.neighborhoodControl;
  }

  get streetControl() {
    return this.registrationService.streetControl;
  }

  get houseNumberControl() {
    return this.registrationService.houseNumberControl;
  }

  get zipControl() {
    return this.registrationService.zipControl;
  }

  get structureControl() {
    return this.registrationService.structureControl;
  }

  get elevatorControl() {
    return this.registrationService.elevatorControl;
  }

  get floorControl() {
    return this.registrationService.floorControl;
  }

  get apartmentControl() {
    return this.registrationService.apartmentControl;
  }

  get entranceControl() {
    return this.registrationService.entranceControl;
  }

  get notesControl() {
    return this.registrationService.notesControl;
  }

  public isValid: boolean;

  constructor(private registrationService: RegistrationService) {
  }

  ngOnInit() {
    if (!this.registrationService.RegistrationToken || this.registrationService.stepFinished < this.registrationService.steps.step1) {
      this.registrationService.changeCurrentStep(this.registrationService.steps.step1);

    }
  }

  onToggle() {
    if (this.selfPickUpControl.value) {

    } else {

    }
  }

  /**
   * check valid attribute of all fields (FormControl)
   * @return {boolean}
   */
  validateForm() {
    return (
    this.cityControl.valid &&
    this.neighborhoodControl.valid &&
    this.streetControl.valid &&
    this.houseNumberControl.valid &&
    this.zipControl.valid &&
    this.structureControl.valid &&
    this.elevatorControl.valid &&
    this.floorControl.valid &&
    this.apartmentControl.valid &&
    this.entranceControl.valid &&
    this.notesControl.valid);
  }

  /**
   * mark all fields as dirty for validations.
   * route to 3rd step and update 'stepFinished'
   */
  submit() {
    this.cityControl.markAsDirty();
    this.neighborhoodControl.markAsDirty();
    this.streetControl.markAsDirty();
    this.houseNumberControl.markAsDirty();
    this.zipControl.markAsDirty();
    this.structureControl.markAsDirty();
    this.elevatorControl.markAsDirty();
    this.floorControl.markAsDirty();
    this.apartmentControl.markAsDirty();
    this.entranceControl.markAsDirty();
    this.notesControl.markAsDirty();

    this.isValid = this.validateForm();

    if (this.isValid) {
      this.registrationService.stepFinished = this.registrationService.currentStep;
      this.registrationService.changeCurrentStep(this.registrationService.steps.step3);
    }
  }

  ngOnDestroy() {
  }
}
