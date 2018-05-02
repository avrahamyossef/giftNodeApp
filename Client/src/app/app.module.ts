import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { UserComponent } from './features/user/user.component';
import { SignInComponent } from './features/user/sign-in/sign-in.component';
import { SignUpComponent } from './features/user/sign-up/sign-up.component';
import { HomeComponent } from './features/homepage/homepage.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from './features/footer/footer.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MDBBootstrapModule.forRoot(),
    ModalModule.forRoot(),

  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
