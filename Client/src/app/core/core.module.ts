import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './services/api/api.service';
import { AppService } from './services/app.service';
import { EventBusService } from './services/event-bus.service';
import { RcTranslatePipe } from './rc-translate/rc-translate.pipe';
import { RcTranslateService } from './rc-translate/rc-translate.service';
import { RouterService } from './services/router.service';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';

/* API services */
import { ApiUserService } from './services/api/api.user.service';
import { ApiEventsService } from './services/api/api.events.service';
import { ApiInterestsService } from './services/api/api.interests.service';
import { ApiRelationshipService } from './services/api/api.relationships.service'
import { ApiProductsService } from './services/api/api.products.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [
    RcTranslatePipe
  ],
  exports: [
    RcTranslatePipe
  ],
  providers: [
    EventBusService,
    ApiService,
    AppService,
    ApiUserService,
    ApiEventsService,
    ApiInterestsService,
    ApiRelationshipService,
    RcTranslateService,
    RouterService,
    UserService,
    ApiProductsService,
    ProductService
  ],
  entryComponents: []
})
export class CoreModule {
}
