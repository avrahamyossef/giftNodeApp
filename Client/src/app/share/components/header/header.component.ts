import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RouterService } from '../../../core/services/router.service';
import { AppService } from '../../../core/services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('popupLogin') popupLogin: ElementRef;
  public modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private appService: AppService,
    private router: RouterService) { }

  ngOnInit() {
  }

  toBusinessLoginRegister() {
    this.modalRef = this.modalService.show(this.popupLogin);
  }
}
