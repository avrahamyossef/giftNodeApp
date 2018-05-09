import { Component, OnInit, Input, Output } from '@angular/core';
import * as models from '../../models/index';
import { AppService } from '../../core/services/app.service';
import { ApiUserService } from '../../core/services/api/api.user.service';
import { FormControl, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomePageComponent implements OnInit {

  public eventsOptions: any = [];
  public interestsOptions: any = [];
  public relationshipsOptions: any = [];
  public ageOptions: any = [];
  public appLoaded: boolean = false;

  constructor(private appService: AppService, private apiUserService: ApiUserService) {
  }

  ngOnInit() {
    this.appService.showFullPageLoader = true;

    this.buildAgeOptions();

    //load all data api  - for first page
    setTimeout(() => {
      this.appService.initApp();
    }, 100);

    this.appService._appLoaded.subscribe(data => {
      if (data !== null) {
        this.appLoaded = true;
        this.appService.showFullPageLoader = false;

        console.log('appLoaded is:' + this.appLoaded);

        switch (data[0]) {
          case "events":
            //this.eventsList = data[1].Results;
            this.eventsOptions = data[1].Results.map((tmpEvent) => {
              return {
                key: tmpEvent.event_id,
                value: tmpEvent.event_name
              };
            });
            break;
          case "relationships":
            this.relationshipsOptions = data[1].Results.map((tmpEvent) => {
              return {
                key: tmpEvent.relationship_id,
                value: tmpEvent.relationship_name
              };
            });
            break;
          case "interests":
            this.interestsOptions = data[1].Results.map((tmpEvent) => {
              return {
                key: tmpEvent.interests_id,
                value: tmpEvent.interests_name,
                text: tmpEvent.interests_name
              };
            });
            break;
        }
      }
    });
    console.log('appLoaded under buildAgeOptions is:' + this.appLoaded);
  }

  buildAgeOptions() {
    const _group0 = {
      key: 0,
      value: "כל גיל"
    }
    const _group1 = {
      key: 1,
      value: "0-1"
    }
    const _group2 = {
      key: 2,
      value: "1-2"
    }
    const _group3 = {
      key: 3,
      value: "3-6"
    }
    const _group4 = {
      key: 4,
      value: "7-10"
    }
    const _group5 = {
      key: 5,
      value: "11-13"
    }
    const _group6 = {
      key: 6,
      value: "14-17"
    }
    const _group7 = {
      key: 7,
      value: "18-21"
    }
    const _group8 = {
      key: 8,
      value: "22-30"
    }
    const _group9 = {
      key: 9,
      value: "30-40"
    }
    const _group10 = {
      key: 10,
      value: "40-50"
    }
    const _group11 = {
      key: 11,
      value: "50-70"
    }
    const _group12 = {
      key: 12,
      value: "70 +"
    }
    this.ageOptions = [];

    this.ageOptions.push(_group0);
    this.ageOptions.push(_group1);
    this.ageOptions.push(_group2);
    this.ageOptions.push(_group3);
    this.ageOptions.push(_group4);
    this.ageOptions.push(_group5);
    this.ageOptions.push(_group6);
    this.ageOptions.push(_group7);
    this.ageOptions.push(_group8);
    this.ageOptions.push(_group9);
    this.ageOptions.push(_group10);
    this.ageOptions.push(_group11);
    this.ageOptions.push(_group12);
  }
}
