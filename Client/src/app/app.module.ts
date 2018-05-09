import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule , NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { FullPageLoaderComponent } from './share/components/full-page-loader/full-page-loader.component';
import { ShareModule } from './share/share.module';
import { HomePageModule } from './features/homepage/homepage.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RegistrationModule } from './features/registration-flow/registration-flow.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MDBBootstrapModule,
    AppRoutingModule,
    CoreModule,
    ShareModule,
    HomePageModule,
    RegistrationModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
