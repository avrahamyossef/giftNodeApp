import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as R from 'ramda';
import { isNullOrUndefined } from "util";

@Component({
  selector: 'app-form-group-multi-toggle',
  templateUrl: './form-group-multi-toggle.component.html',
  styleUrls: ['./form-group-multi-toggle.component.scss']
})
export class FormGroupMultiToggleComponent implements OnInit {

  @Input() options: any;
  @Input() control: FormControl;
  @Input() requiredError: string;
  @Output() optionSelected: EventEmitter<any> = new EventEmitter();
  public isNullOrUndefined = isNullOrUndefined;

  constructor() {
  }

  ngOnInit() {
    this.options.forEach((item) => {
      if (!isNullOrUndefined(this.control.value) && item.value.toString() === this.control.value.toString()) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    });
  }

  onOptionsChange(data) {
    this.control.setValue(data.value);
    this.options.forEach((item) => {
      item.selected = item.key === data.key;
    });
    if (this.optionSelected.observers.length) {
      this.optionSelected.emit(data);
    }
  }

  public isDual() {
    return this.options && this.options.length === 2;
  }
}
