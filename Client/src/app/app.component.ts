import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from './core/services/app.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public modalRef: BsModalRef;
  @ViewChild('entrancePopup') entrancePopup: ElementRef;

  public appLoaded: boolean = false;

  constructor(private appService: AppService, private modalService: BsModalService) {
  }

  get showFullPageLoader() {
    return this.appService.showFullPageLoader;
  }


  ngOnInit() {
    this.appService.initApp();
    this.appService._appLoaded.subscribe(loaded => {
      if (loaded) {
        this.appLoaded = true;
        // if (this.userServices.isAnonymous() && !localStorage.getItem('policyApproved')) {
        //   this.modalRef = this.modalService.show(this.entrancePopup);
        // }
      }
    });
  }
}

if (typeof (<any>window).paymentAction === 'undefined') {
  (<any>window).paymentAction = (EventName) => {
    const event = new CustomEvent(EventName);
    window.dispatchEvent(event);
  };
}

