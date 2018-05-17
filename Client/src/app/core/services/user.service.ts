import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as models from '../../models/index';
import { isNull, isNullOrUndefined } from 'util';
import { ApiUserService } from './api/api.user.service';
import { EventBusService } from './event-bus.service';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class UserService {

  public user: models.UserModel;
  public Filters: models.FiltersModel;

  constructor(private cookieService: CookieService,
    private apiUser: ApiUserService,
    private eventBus: EventBusService) {

    // this.eventBus.on(this.eventBus.EVENTS_LIST.PRODUCT_UPDATE_IN_CART_SUCCESS, (response) => {
    //   this.user.CartItemsCount = response.results.CartItemsCount;
    // }, true);
  }

  resetCartItemsCount() {
    if (this.user) {
      //this.user.CartItemsCount = 0;
    }
  }

  updateFilters(data) {
    this.Filters = data;
  }

  setAccessToken(token) {
    this.cookieService.set('access_token', token);
  }

  getUser() {
    return this.user;
  }

  isAnonymous() {
    if (isNullOrUndefined(this.user)) {
      return true;
    }
    return (isNull(this.user.Id) && !this.user.Id);
  }

  isAnonymousWithCart() {
    if (isNullOrUndefined(this.user)) {
      return false;
    }
    return (isNull(this.user.Id));
  }

  isLoggedIn() {
    if (isNullOrUndefined(this.user)) {
      return false;
    }
    return !isNull(this.user.Id);
  }

  logOut() {
    // TODO :: handle logout
    this.apiUser.logout().subscribe((response) => {
      this.reloadApp();
    }, (err) => {
      this.reloadApp();
    });
  }

  reloadApp() {
    this.cookieService.delete('access_token');
    window.location.href = '/';
  }

  updateUserInfo(response) {
    if (response.IsOk) {
      this.user = response.currentUser;
    }
  }
}

