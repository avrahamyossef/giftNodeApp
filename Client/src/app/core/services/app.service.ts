import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { EventBusService } from './event-bus.service';
import { Subject } from "rxjs/Subject";
import { ApiUserService } from './api/api.user.service';
import { ApiEventsService } from './api/api.events.service';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';

@Injectable()
export class AppService {

    private _showFullPageLoader = true;
    public _appLoaded = new Subject<boolean>();

    constructor(private eventBus: EventBusService, private apiUserService: ApiUserService,
        private apiEventsService: ApiEventsService) {
        this.eventBus.on(this.eventBus.EVENTS_LIST.INIT_APP, () => {
            this.initApp();
        });
    }

    get showFullPageLoader() {
        return this._showFullPageLoader;
    }

    set showFullPageLoader(val) {
        this._showFullPageLoader = val;
    }

    get appLoaded() {
        return this._appLoaded;
    }

    initApp() {
        this.apiEventsService.getEvents().subscribe((response) => {

            if (response) {
                alert("response is: " + response);
            }
            else {
                alert("error in init app function");
            }
        })
        //   if (response.IsOK === true) {
        //     if (response.Results.AnonymousToken) {
        //       this.userService.setAccessToken(response.Results.AnonymousToken.access_token);
        //     }

        //     this.apiUser.getUserInfo().subscribe((user) => {
        //       if (user.IsOK === true) {
        //         this.userService.user = user.Results;
        //       } else {
        //         // TODO :: handle error response
        //       }
        //       this.finishLoading();

        //     });
        //   } else {
        //     // TODO :: handle error response of user
        //     this.finishLoading();

        //   }
        //     }, (error) => {
        //       // TODO :: handle error response of app init
        //       this.finishLoading();
        //     }, () => {
        //       // TODO :: handle error response of app init
        //     });
        //   }

        //   finishLoading() {
        //     this._showFullPageLoader = false;
        //     this._appLoaded.next(true);
    }
}
