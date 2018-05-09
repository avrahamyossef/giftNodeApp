import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { EventBusService } from './event-bus.service';
import { Subject } from "rxjs/Subject";
import { ApiUserService } from './api/api.user.service';
import { ApiEventsService } from './api/api.events.service';
import { ApiInterestsService } from './api/api.interests.service';
import { ApiRelationshipService } from './api/api.relationships.service';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';

@Injectable()
export class AppService {

    private _showFullPageLoader = true;
    public _appLoaded = new Subject<boolean>();

    constructor(
        private eventBus: EventBusService,
        private apiUserService: ApiUserService,
        private apiEventsService: ApiEventsService,
        private apiInterestsService: ApiInterestsService,
        private apiRelationshipService: ApiRelationshipService) {

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
        console.log('initApp function called..')
        /**
         * load events list data
         */
        this.apiEventsService.getEvents().subscribe((response) => {

            if (response.IsOk) {
                console.log("initApp getEvents finish with success response");
                this.finishLoading(["events", response]);
            }
            else {
                console.log("error in initAapp getEvents error: " + response.errorMessage);
                this.finishLoading(null);
            }
        }, (error) => {
            console.log("error in initApp getEvents err: " + error);
            this.finishLoading(null);
        }),

            /**
             * load relationships list data
             */
            this.apiRelationshipService.getRelationships().subscribe((response) => {

                if (response.IsOk) {
                    console.log("initApp getRelationships finish with success response");
                    this.finishLoading(["relationships", response]);
                }
                else {
                    console.log("error in initAapp getRelationships error: " + response.errorMessage);
                    this.finishLoading(null);
                }
            }, (error) => {
                console.log("error in initApp getRelationships err: " + error);
                this.finishLoading(null);
            }),

            /**
             * load interests list data
             */
            this.apiInterestsService.getInterests().subscribe((response) => {

                if (response.IsOk) {
                    console.log("initApp getInterests finish with success response");
                    this.finishLoading(["interests", response]);
                }
                else {
                    console.log("error in initAapp getInterests error: " + response.errorMessage);
                    this.finishLoading(null);
                }
            }, (error) => {
                console.log("error in initApp getInterests err: " + error);
                this.finishLoading(null);
            })
    }


    /**Î
     * finish loading upadate proprties - for loader and show content
     */
    finishLoading(response) {
        this._showFullPageLoader = false;
        this._appLoaded.next(response);
    }
}
