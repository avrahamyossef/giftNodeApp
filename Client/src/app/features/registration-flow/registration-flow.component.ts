import { Component, OnInit } from '@angular/core';
import { RegistrationService } from './registration.service';
import { EventBusService } from '../../core/services/event-bus.service';
import { AppService } from '../../core/services/app.service';

@Component({
  selector: 'app-registration-flow',
  templateUrl: './registration-flow.component.html',
  styleUrls: ['./registration-flow.component.scss']
})
export class RegistrationFlowComponent implements OnInit {

  get currentStep() {
    return this.registrationService.currentStep;
  }
  set currentStep(val) {
    this.registrationService.currentStep = val;
  }
  get steps() {
    return this.registrationService.steps;
  }
  get registerSuccess() {
    return this.registrationService.registerSuccess;
  }

  constructor(private appService: AppService,
    private registrationService: RegistrationService,private eventBus: EventBusService) { }

  ngOnInit() {
    if(this.appService.showFullPageLoader){
      this.appService.showFullPageLoader = false;
    }
    this.registrationService.resetControls();
  }

  stepClick(stepNumber) {
    if (!this.registerSuccess) {
      this.currentStep = stepNumber;
    }
  }
}
