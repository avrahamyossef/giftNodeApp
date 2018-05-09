import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationFlowComponent } from './registration-flow.component';
import { RegistrationStep1Component } from './components/personal-details/registration-step1.component';
import { RegistrationStep2Component } from './components/address/registration-step2.component';
import { RegistrationStep3Component } from './components/password/registration-step3.component';

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationFlowComponent,
    children: [
      {
        path: '',
        redirectTo: 'personalDetails',
        pathMatch: 'full'
      },
      {
        path: 'personalDetails',
        component: RegistrationStep1Component
      },
      {
        path: 'address',
        component: RegistrationStep2Component
      },
      {
        path: 'password',
        component: RegistrationStep3Component
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class RegistrationFlowRoutingModule {
}
