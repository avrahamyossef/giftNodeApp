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
      }
      //if return more the one selected value - run on all val splited by ','
      else if (!isNullOrUndefined(this.control.value)) {
        if (this.control.value.toString().indexOf(',') > -1) {
          var values = this.control.value.toString().split(',');
          values.forEach(element => {
            if (item.key.toString() == element)
              item.selected = true;
          });
        }
      }
      else {
        item.selected = false;
      }
    });
  }

  onOptionsChange(data) {
    var idsArray = [];

    this.options.forEach((item) => {
      if (item.key === data.key) {
        item.selected = !item.selected;
      };

      if (item.selected) {
        //check if item Not already exist
        if (idsArray.indexOf(item.key) === -1) {
          idsArray.push(item.key)
        }
        else {
          //if exist reomve
          var index = idsArray.indexOf(item.key);
          if (index > -1) {
            idsArray.splice(index, 1);
          }
        }
      }
    });

    this.control.setValue(idsArray.toString());
    if (this.optionSelected.observers.length) {
      this.optionSelected.emit(data);
    }
  }

  public isDual() {
    return this.options && this.options.length === 2;
  }
}
