import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class EventBusService {

  public events: any[] = [];
  public globalEvents: any[] = [];
  public subscriptions: any[] = [];
  public globalSubscriptions: any[] = [];
  public EVENTS_LIST = {
    INIT_APP: 'init app',
    PRODUCT_LIST_CHANGE: 'products list change',
    EVENT_FILTER_CHANGE: 'event filter change'
  };

  constructor() {
  }

  emit(eventName: string, params?: any) {
    if (this.events[eventName]) {
      this.events[eventName].emit(params);
    }
    if (this.globalEvents[eventName]) {
      this.globalEvents[eventName].emit(params);
    }
  }

  on(eventName, callback, isGlobal = false) {
    if (!isGlobal) {
      if (!this.events[eventName]) {
        this.events[eventName] = new EventEmitter();
      }
      if (!this.subscriptions[eventName]) {
        this.subscriptions[eventName] = [];
      }
      const globalSub = this.events[eventName].subscribe(callback);
      this.subscriptions[eventName].push(globalSub);
      return globalSub;
    } else {
      if (!this.globalEvents[eventName]) {
        this.globalEvents[eventName] = new EventEmitter();
      }
      if (!this.globalSubscriptions[eventName]) {
        this.globalSubscriptions[eventName] = [];
      }
      const sub = this.globalEvents[eventName].subscribe(callback);
      this.globalSubscriptions[eventName].push(sub);
      return sub;
    }
  }

  off(eventName, isGlobal = false) {
    if (!isGlobal) {
      if (this.events[eventName]) {
        delete this.events[eventName];
      }
      if (this.subscriptions[eventName]) {
        this.subscriptions[eventName].forEach((tmpSub: Subscription) => {
          tmpSub.unsubscribe();
        });
      }
    } else {
      if (this.globalEvents[eventName]) {
        delete this.globalEvents[eventName];
      }
      if (this.globalSubscriptions[eventName]) {
        this.globalSubscriptions[eventName].forEach((tmpSub: Subscription) => {
          tmpSub.unsubscribe();
        });
      }
    }
  }

  clearEvents() {
    this.subscriptions.forEach((eventSubs) => {
      eventSubs.forEach((eventSub) => {
        eventSub.unsubscribe();
      });
    });
    this.subscriptions = [];
    this.events = [];
  }


}
