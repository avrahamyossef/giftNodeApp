import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as models from '../../../models/index';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ApiProductsService {

    constructor(private api: ApiService, private cookieService: CookieService) {
    }

    /**
     * sign in - get Token
     * @param {string} events
     * @param {string} interests
     * @param {string} relationships
     * @param {string} age
     * @returns {Observable<any> | ((result) => Observable<any>)}
     */
    getProducts(event: string, age: string, interests: string, relationshipsIds: string) {
        const params = {
            eventIds: event,
            ageIds: age,
            interestsIds: interests,
            relationshipsIds: relationshipsIds
        };
        const actionName = 'products';

        return this.api.post(actionName, params, false, false);
    }
}
