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
  public priceControl: FormControl;
  public genderControl: FormControl;
  public eventId: string;
  public Filters: models.FiltersModel;
  public priceRangeText: string = "עד";

  @ViewChild('input') input: ElementRef;
  @ViewChild('rangeCloud') rangeCloud: ElementRef;
  range: any = this.userService.Filters ? this.userService.Filters.Price : 500;

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
    this.priceControl = new FormControl(null, Validators.required);
    this.genderControl = new FormControl(null, Validators.required);

    if (!R.isNil(this.userService.Filters)) {
      this.initFilterInfo();
      this.initControls();
    }
  }

  initFilterInfo() {
    this.Filters = Object.assign({}, this.userService.Filters);
  }

  filterChange() {
    this.Filters = {
      Age: this.ageControl.value,
      Event: this.eventControl.value,
      Interests: this.interestControl.value,
      Relationships: this.relationshipControl.value,
      Price: this.priceControl.value,
      Gender: this.genderControl.value
    }

    this.userService.updateFilters(this.Filters);
  }

  coverage() {
    if (typeof this.range === "string" && this.range.length !== 0) {
      return this.range;
    }
    const maxValue = this.input.nativeElement.getAttribute('max');
    const cloudRange = (this.range / maxValue) * 100;
    this.renderer.setStyle(this.rangeCloud.nativeElement, 'left', cloudRange + '%');

    if (this.range === parseInt(maxValue)) {
      this.priceRangeText = "מעל"
    }
    else {
      this.priceRangeText = "עד"
    }
  }

  initControls() {
    this.eventControl.setValue(this.Filters.Event);
    this.interestControl.setValue(this.Filters.Interests);
    this.relationshipControl.setValue(this.Filters.Relationships);
    this.ageControl.setValue(this.Filters.Age);
    this.priceControl.setValue(this.Filters.Price);
    this.genderControl.setValue(this.Filters.Gender);
  }


  searchProcuts() {
    this.appService.showFullPageLoader = true;

    this.apiProduct.getProducts(
      this.eventControl.value,
      this.ageControl.value,
      this.interestControl.value,
      this.relationshipControl.value,
      this.priceControl.value
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
