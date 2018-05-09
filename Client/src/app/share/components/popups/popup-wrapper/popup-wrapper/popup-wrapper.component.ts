import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-popup-wrapper',
  templateUrl: './popup-wrapper.component.html',
  styleUrls: ['./popup-wrapper.component.scss']
})
export class PopupWrapperComponent implements OnInit {

  @Input() modalRef: BsModalRef;

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.modalRef.hide();
  }

}
