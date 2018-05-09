import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-group-checkbox',
  templateUrl: './form-group-checkbox.component.html',
  styleUrls: ['./form-group-checkbox.component.scss']
})
export class FormGroupCheckboxComponent implements OnInit {

  @Input() control: FormControl;
  @Input() errorMsgRequired: string;
  @Input() className: string;
  @Input() required: boolean;

  constructor() { }

  ngOnInit() {
    if (!this.control) {
      this.control = new FormControl();
    }
  }

}
