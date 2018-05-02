import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as models from '../../../models/index';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ApiEventsService {

  constructor(private api: ApiService, private cookieService: CookieService) {
  }
 

  getEvents() {
    const actionName = 'events';
    return this.api.get(actionName, {}, false, false);
  }

}
