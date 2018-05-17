import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FullPageLoaderComponent } from './components/full-page-loader/full-page-loader.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderHomePageComponent } from './components/header-home-page/header-home-page.component';
import { FormGroupInputComponent } from './components/form-group-input/form-group-input.component';
import { FormGroupCheckboxComponent } from './components/form-group-checkbox/form-group-checkbox.component';
import { FormGroupSelectComponent } from './components/form-group-select/form-group-select.component';
import { FormGroupRadiosComponent } from './components/form-group-radios/form-group-radios.component';
import { FormGroupTextareaComponent } from './components/form-group-textarea/form-group-textarea.component';
import { FormGroupMultiToggleComponent } from './components/form-group-multi-toggle/form-group-multi-toggle.component';
import { SearchGiftsFormComponent } from './components/search-gifts-form/search-gifts-form.component';
import { PopupLoginComponent } from './components/popups/popup-login/popup-login.component';
import { PopupWrapperComponent } from './components/popups/popup-wrapper/popup-wrapper/popup-wrapper.component';
import { ProductsViewComponent } from './components/products-view/products-view.component';

const sharedComponents = [
  FullPageLoaderComponent,
  HeaderComponent,
  FooterComponent,
  HeaderHomePageComponent,
  SearchGiftsFormComponent,
  FormGroupInputComponent,
  FormGroupCheckboxComponent,
  FormGroupSelectComponent,
  FormGroupRadiosComponent,
  FormGroupTextareaComponent,
  FormGroupMultiToggleComponent,
  PopupLoginComponent,
  PopupWrapperComponent,
  ProductsViewComponent
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MDBBootstrapModule.forRoot(),
    NgbModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [],
  declarations: [...sharedComponents],
  exports: [...sharedComponents],
  entryComponents: []
})
export class ShareModule {
}
