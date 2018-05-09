import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as models from '../../../models/index';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ApiUserService {

  constructor(private api: ApiService,private cookieService: CookieService) {
  }
 
  /**
   * register
   * @param userInfo
   * @returns {Observable<Object>}
   */
  register(regulationApprovedOn: string, token: string, userInfo: models.UserModel, ) {
    const params = {
      UserInfo: userInfo,
    };
    return this.api.post('auth/signup', params);
  }

  /**
   * sign in - get Token
   * @param {string} userName
   * @param {string} password
   * @returns {Observable<any> | ((result) => Observable<any>)}
   */
  signIn(userName: string, password: string) {
    const params = {
      email: userName,
      password: password
    };
    const actionName = 'auth/login';

    return this.api.post(actionName, params, false, false);
  }

  logout() {
    const actionName = 'LogOut';
    return this.api.get(actionName, {}, true, false);
  }
}
