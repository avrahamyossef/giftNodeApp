import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationExtras,
  NavigationStart,
  Router,
  RoutesRecognized
} from '@angular/router';
import { EventBusService } from './event-bus.service';
import { ApiService } from './api/api.service';

@Injectable()
export class RouterService {
  currentUrlName: string;

  constructor(private router: Router, private location: Location, private eventBus: EventBusService, private Api: ApiService) {
    this.subscribe();
  }

  subscribe() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.eventBus.clearEvents();
      }
      if (event instanceof NavigationEnd) {
        this.Api.clearCache();
        this.setPathName();
      }
      if (event instanceof NavigationCancel) {
      }
      if (event instanceof NavigationError) {
      }
      if (event instanceof RoutesRecognized) {
      } 
      
    });
  }

  setPathName() {
    this.currentUrlName = this.router.url;
  }

  navigate(commands: any[], extras: NavigationExtras = { skipLocationChange: false }) {
    this.router.navigate(commands, extras);
  }

  getCurrentLocation(): string {
    return this.location.path();
  }
}
