import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import *  as R from 'ramda';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs//observable/of';
import { CookieService } from 'ngx-cookie-service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ApiService {
    private baseUrl: string;
    private getObs = {};

    constructor(private http: HttpClient, private cookieService: CookieService) {
        this.baseUrl = environment.apiBaseUrl;
    }
    get(actionName, requestParams = {}, force = true, useSuffixAPI = true) {
        const params = new HttpParams({
            fromObject: requestParams
        });
        const actionKey = `${actionName}_${JSON.stringify(requestParams)}`;
        const options = {
            params: params,
            headers: this.getHeaders()
        };

        if (!this._makeTheCall(actionKey, force, this.getObs)) {
            if (this.getObs[actionKey].data) {
                return Observable.of(this.getObs[actionKey].data);
            }
            return this.getObs[actionKey].obs;
        }

        const baseUrl = this.getBaseUrl(useSuffixAPI);
        const apiFullPath = `${baseUrl}${actionName}`;

        this.getObs[actionKey] = {
            obs: this.http.get(apiFullPath, options).pipe(
                mergeMap((result) => {
                    this.getObs[actionKey].data = result;
                    return Observable.of(result);
                }),
                catchError((error) => {
                    return this.handleError(error);
                })
            )
        };
        return this.getObs[actionKey].obs;
    }

    handleError(error) {
        console.log('HANDLE ERROR WITH STATUS: ' + error.status);
        return new ErrorObservable(error);
        // return of({ error: error });
    }

    post(actionName, requestParams = {}, wrapInObject: boolean = true, useSuffixAPI = true) {
        const baseUrl = this.getBaseUrl(useSuffixAPI);
        if (wrapInObject) {
            requestParams = {
                Object: requestParams
            };
        }

        return this.http.post(`${baseUrl}${actionName}`, requestParams, { headers: this.getHeaders() }).pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        );
    }

    private getBaseUrl(useSuffix: boolean = true) {
        return `${this.baseUrl}`;
    }

    private getGUID() {
        let guid = this.cookieService.get('guid');
        if (!guid) {
            guid = this.createGuid();
            this.cookieService.set('guid', guid);
        }
        return guid;
    }

    private getHeaders() {
        let headers: any = {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        };

        const token = this.cookieService.get('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        if (environment.production) {
            headers = {
                'Content-Type': 'application/json; charset=utf-8'
            };
        }

        return new HttpHeaders(headers);
    }

    private _makeTheCall(actionKey: string, force: boolean, promisesArray: any) {
        let makeTheCall = true;

        if (!R.isNil(promisesArray[actionKey])) {
            const pending = R.isNil(promisesArray[actionKey].data);

            if (pending || !force) {
                makeTheCall = false;
            }
        }

        return makeTheCall;
    }

    public clearCache() {
        // this.getObs = {};
    }

    private createGuid() {
        return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    }

}