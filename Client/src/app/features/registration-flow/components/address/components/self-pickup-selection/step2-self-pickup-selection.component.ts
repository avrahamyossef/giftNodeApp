import { Component, OnDestroy, OnInit } from '@angular/core';
import * as models from '../../../../../../models';
import { RegistrationService } from '../../../../registration.service';
//import { ApiDistributionService } from '../../../../../../core/services/api/api-distribution.service';
import { isNullOrUndefined } from 'util';

declare var $: any;

@Component({
  selector: 'app-step2-self-pickup-selection',
  templateUrl: './step2-self-pickup-selection.component.html',
  styleUrls: ['./step2-self-pickup-selection.component.scss']
})
export class Step2SelfPickupSelectionComponent implements OnInit, OnDestroy {

  public stores: any[];//models.Store[];
  public loadingResults: boolean = false;
  public isValid: boolean = false;
  get notesControl() {
    return this.registrationService.notesControl;
  }
  get storeSelected() {
    return this.registrationService.storeSelected;
  }

  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
    this.loadStores();
  }

  loadStores() {
    this.loadingResults = true;
    // this.apiDistribution.getStores().subscribe((response) => {
    //   if (response.IsOK) {
    //     this.loadingResults = false;
    //     this.stores = response.Results.Stores;
    //   } else {
    //     this.loadingResults = false;
    //     // TODO :: error
    //   }
    // }, (error) => {
    //   this.loadingResults = false;
    //   // TODO :: error
    // });
  }

  selectStore(storeId) {
    if (this.isValid) {
      this.isValid = false;
    }
    this.registrationService.storeSelected = storeId;
  }

  submit() {
    this.isValid = !isNullOrUndefined(this.registrationService.storeSelected);
    if (this.isValid) {
      this.registrationService.stepFinished = this.registrationService.currentStep;
      this.registrationService.changeCurrentStep(this.registrationService.steps.step3);
    }
  }

  ngOnDestroy() {
  }
}
