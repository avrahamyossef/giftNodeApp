import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as models from '../../models/product';
import { isNull, isNullOrUndefined } from 'util';
import { ApiProductsService } from './api/api.products.service';
import { EventBusService } from './event-bus.service';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ProductService {

    public product: models.ProductModel[] = [];

    constructor(private cookieService: CookieService,
        private apiProduct: ApiProductsService,
        private eventBus: EventBusService) {

        // this.eventBus.on(this.eventBus.EVENTS_LIST.PRODUCT_UPDATE_IN_CART_SUCCESS, (response) => {
        //   this.user.CartItemsCount = response.results.CartItemsCount;
        // }, true);
    }

    updateProducts(products) {
        this.product = products;
    }
}

