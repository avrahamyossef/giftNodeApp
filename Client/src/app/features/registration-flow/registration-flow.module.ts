import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationService } from './registration.service';
import { CoreModule } from '../../core/core.module';
import { ShareModule } from '../../share/share.module';
import { RegistrationFlowRoutingModule } from './registration-flow.routing.module';
import { RegistrationFlowComponent } from './registration-flow.component';
import { RegistrationSuccessComponent } from './components/password/components/registration-success/registration-success.component';
// Step 1
import { RegistrationStep1Component } from './components/personal-details/registration-step1.component';
import { Step1PersonalDetailsComponent } from './components/personal-details/components/personal-details/step1-personal-details.component';
// Step 2
import { RegistrationStep2Component } from './components/address/registration-step2.component';
import { Step2SelfPickupSelectionComponent } from './components/address/components/self-pickup-selection/step2-self-pickup-selection.component';
// Step 3
import { RegistrationStep3Component } from './components/password/registration-step3.component';



@NgModule({
  imports: [
    CommonModule,
    RegistrationFlowRoutingModule,
    ShareModule,
    CoreModule
  ],
  declarations: [
    RegistrationFlowComponent,
    RegistrationStep1Component,
    RegistrationStep2Component,
    RegistrationStep3Component,
    Step1PersonalDetailsComponent,
    Step2SelfPickupSelectionComponent,
    RegistrationSuccessComponent
  ],
  providers: [RegistrationService]
})
export class RegistrationModule { }
