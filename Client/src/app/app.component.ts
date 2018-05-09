import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from './core/services/app.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import * as models from './models/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public modalRef: BsModalRef;

  public eventsList: models.EventsModel[];
  public interestsList: models.InterestsModel[];
  public relationshipsList: models.RelationshipModel[];


  @ViewChild('entrancePopup') entrancePopup: ElementRef;

  constructor(private appService: AppService, private modalService: BsModalService) {
  }

  get showFullPageLoader() {
    return this.appService.showFullPageLoader;
  }


  ngOnInit() {
    console.log('ngOnInit app.component..');
  }
}
if (typeof (<any>window).paymentAction === 'undefined') {
  (<any>window).paymentAction = (EventName) => {
    const event = new CustomEvent(EventName);
    window.dispatchEvent(event);
  };
}

