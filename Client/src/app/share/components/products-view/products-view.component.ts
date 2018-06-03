import { Component, OnInit, Input, Output, ElementRef, Renderer2, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppService } from '../../../core/services/app.service';
import { ApiProductsService } from '../../../core/services/api/api.products.service';
import { ProductService } from '../../../core/services/product.service';
import { CONSTANTS } from '../../../constants/constacts';
import { EventBusService } from '../../../core/services/event-bus.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as userModel from '../../../models/user';
import { } from '@types/googlemaps';

declare var google: any;

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {

  public productsList: any = [];
  public notFoundMessage: string = "אופס..לא נמצאו מתנות";
  public isShowNudgeBanner: boolean = false;
  // public UserLocation: userModel.UserLocationModel;
  public Distance: string = "";
  public LocationLat: Number = 0;
  public LocationLng: Number = 0;
  public loadingDistance: boolean = false;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  public placeSearch;
  public autocomplete;
  public componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };


  constructor(private renderer: Renderer2, private productService: ProductService,
    private apiProduct: ApiProductsService, private eventBus: EventBusService,
    private appService: AppService, private http: HttpClient) {
  }


  ngOnInit() {
    window.scrollTo(0, 0);

    setTimeout(() => {
      const autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocompleteAddress'), {
        types: ['geocode']
      });
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        this.onSelect.emit(place);
        this.LocationLat = place.geometry.location.lat();
        this.LocationLng = place.geometry.location.lng();
      });

    }, 1000);

    this.eventBus.on(this.eventBus.EVENTS_LIST.PRODUCT_LIST_CHANGE, () => {
      this.productsList = this.productService.product;
      this.loadingDistance = true;
      this.calculateProductsDistant();
    });

    this.productsList = this.productService.product;
    this.appService.showFullPageLoader = false;

    //check User location
    this.checkUserLocation();
  };


  searchAddress() {
    this.hideNudgeBanner();

    if ((<HTMLSelectElement>(document.getElementById('autocompleteAddress'))).value) {
      this.loadingDistance = true;
      this.calculateProductsDistant();
    }
  }

  calculateProductsDistant() {
    this.productsList.forEach(element => {
      element.Distance = this.getDistanceFromLatLonInKm(
        element.StoreLocationLat,
        element.StoreLocationLng,
        this.LocationLat,
        this.LocationLng
      )
    });
    this.loadingDistance = false;
  }
  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let radlat1 = Math.PI * lat1 / 180
    let radlat2 = Math.PI * lat2 / 180
    let radlon1 = Math.PI * lon1 / 180
    let radlon2 = Math.PI * lon2 / 180
    let theta = lon1 - lon2
    let radtheta = Math.PI * theta / 180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344;
    dist = Math.round(dist * 1000) / 1000;

    let res = "";
    if (dist > 1) {
      res = dist.toFixed(1) + ' ק״מ';
    }
    else {
      res = (dist * 1000).toString() + " מטר";
    }
    return res
  }

  checkUserLocation() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          // We have the location, don't display banner
          console.log("position : " + position);
          this.LocationLat = position.coords.latitude;
          this.LocationLng = position.coords.longitude;
          this.hideNudgeBanner();
          this.loadingDistance = true;
          this.calculateProductsDistant();
        },
        error => {
          this.showNudgeBanner();
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    }
  }

  showNudgeBanner() {
    //if (this.UserLocation.location.lat == 0 && this.UserLocation.location.lng == 0) {
    this.isShowNudgeBanner = true;
    //}
  };

  hideNudgeBanner() {
    this.isShowNudgeBanner = false;
  };

  onItemMouseOver(element){
   // debugger;
    console.log(element);
  }
}
