import { Component, OnInit, Input, Output, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, Validators, FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppService } from '../../../core/services/app.service';
import { ApiProductsService } from '../../../core/services/api/api.products.service';
import { ProductService } from '../../../core/services/product.service';
import { CONSTANTS } from '../../../constants/constacts';
import { EventBusService } from '../../../core/services/event-bus.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {

  public productsList: any = [];
  public notFoundMessage: string = "אופס..לא נמצאו מתנות";

  constructor(private renderer: Renderer2, private productService: ProductService,
    private apiProduct: ApiProductsService, private eventBus: EventBusService,
    private appService: AppService) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.productsList = this.productService.product;
    this.appService.showFullPageLoader = false;

    
    this.eventBus.on(this.eventBus.EVENTS_LIST.PRODUCT_LIST_CHANGE, () => {
      this.productsList = this.productService.product;
      this.appService.showFullPageLoader = false;
    });
  }

}
