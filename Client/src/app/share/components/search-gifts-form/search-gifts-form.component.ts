import { Component, OnInit, Input, Output, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, Validators, FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppService } from '../../../core/services/app.service';
import { ApiProductsService } from '../../../core/services/api/api.products.service';
import { ProductService } from '../../../core/services/product.service';
import { EventBusService } from '../../../core/services/event-bus.service';
import * as R from 'ramda';
import * as models from '../../../models/filters';
import { UserService } from '../../../core/services/user.service';
import { RouterService } from '../../../core/services/router.service';

@Component({
  selector: 'app-search-gifts-form',
  templateUrl: './search-gifts-form.component.html',
  styleUrls: ['./search-gifts-form.component.scss']
})
export class SearchGiftsFormComponent implements OnInit {

  @Input() eventsOptions: any = [];
  @Input() interestsOptions: any = [];
  @Input() relationshipsOptions: any = [];
  @Input() ageOptions: any = [];

  public eventControl: FormControl;
  public interestControl: FormControl;
  public relationshipControl: FormControl;
  public ageControl: FormControl;
  public eventId: string;
  public Filters: models.FiltersModel;

  public isShowNudgeBanner: boolean = false;

  @ViewChild('input') input: ElementRef;
  @ViewChild('rangeCloud') rangeCloud: ElementRef;
  range: any = 500;

  constructor(private renderer: Renderer2, private productService: ProductService,
    private userService: UserService, private router: RouterService,
    private apiProduct: ApiProductsService, private eventBus: EventBusService,
    private appService: AppService) { }

  @ViewChild('popupLogin') popupLogin: ElementRef;
  public modalRef: BsModalRef;

  ngOnInit() {

    this.eventControl = new FormControl(null, Validators.required);
    this.interestControl = new FormControl(null, Validators.required);
    this.relationshipControl = new FormControl(null, Validators.required);
    this.ageControl = new FormControl(null, Validators.required);



    if (!R.isNil(this.userService.Filters)) {
      this.initFilterInfo();
      this.initControls();
    }

    var startPos;
    var nudge = document.getElementById("nudge");

    var nudgeTimeoutId = setTimeout(this.showNudgeBanner(), 5000);

    var geoSuccess = function (position) {
      this.hideNudgeBanner();
      // We have the location, don't display banner
      clearTimeout(nudgeTimeoutId);

      // Do magic with location
      startPos = position;
      document.getElementById('startLat').innerHTML = startPos.coords.latitude;
      document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    };
    var geoError = function (error) {
      console.log('Error occurred. Error code: ' + error.code);
      this.showNudgeBanner();
      // error.code can be:
      //   0: unknown error
      //   1: permission denied
      //   2: position unavailable (error response from location provider)
      //   3: timed out
      // The user didn't accept the callout
    };


    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    // check for Geolocation support
    // if (navigator) {
    //   navigator.geolocation.getCurrentPosition(pos => {

    //     var latitude = pos.coords.latitude;
    //     var longitude = pos.coords.longitude;
    //     alert(latitude + "  " + longitude);
    //   })
    // }
  }
  showNudgeBanner() {
    this.isShowNudgeBanner = true;
  };

  hideNudgeBanner = function () {
    this.isShowNudgeBanner = false;
  };

  initFilterInfo() {
    this.Filters = Object.assign({}, this.userService.Filters);
  }

  filterChange() {
    this.Filters = {
      Age: this.ageControl.value,
      Event: this.eventControl.value,
      Interests: this.interestControl.value,
      Relationships: this.relationshipControl.value
    }

    this.userService.updateFilters(this.Filters);
  }

  coverage() {
    if (typeof this.range === "string" && this.range.length !== 0) {
      return this.range;
    }
    const maxValue = this.input.nativeElement.getAttribute('max');
    const cloudRange = (this.range / maxValue) * 100;
    this.renderer.setStyle(this.rangeCloud.nativeElement, 'left', cloudRange + '%')
  }

  initControls() {
    this.eventControl.setValue(this.Filters.Event);
    this.interestControl.setValue(this.Filters.Interests);
    this.relationshipControl.setValue(this.Filters.Relationships);
    this.ageControl.setValue(this.Filters.Age);
  }


  searchProcuts() {
    this.appService.showFullPageLoader = true;

    this.apiProduct.getProducts(
      this.eventControl.value,
      this.ageControl.value,
      this.interestControl.value,
      this.relationshipControl.value
    ).subscribe((response) => {
      if (response.IsOk) {
        this.appService.showFullPageLoader = false;

        this.productService.updateProducts(response.Results);
        this.eventBus.emit(this.eventBus.EVENTS_LIST.PRODUCT_LIST_CHANGE);
        this.router.navigate(['products-results']); //products list page
      }
      else {
        this.appService.showFullPageLoader = false;
        // TODO :: handle error response
      }
    }, ((signInErr: any) => {
      this.appService.showFullPageLoader = false;
      // TODO :: handle error response
    }));
  }
}
