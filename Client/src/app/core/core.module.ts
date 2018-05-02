import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './services/api/api.service';
import { AppService } from './services/app.service';
import { EventBusService } from './services/event-bus.service';

/* API services */
import { ApiUserService } from './services/api/api.user.service';
import { ApiEventsService } from './services/api/api.events.service';


@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    EventBusService,
    ApiService,
    AppService,
    ApiUserService,
    ApiEventsService
  ],
  entryComponents: []
})
export class CoreModule {
}
