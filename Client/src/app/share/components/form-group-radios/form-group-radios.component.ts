import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-group-radios',
  templateUrl: './form-group-radios.component.html',
  styleUrls: ['./form-group-radios.component.scss']
})
export class FormGroupRadiosComponent implements OnInit {

  @Input() control: FormControl;
  @Input() idValue: string;
  @Input() requiredError: string;
  @Input() options: any;
  @Input() renderExternalComponent: boolean;

  @Output() optionSelected: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onClick(data) {
    if (this.optionSelected.observers.length) {
      this.optionSelected.emit(data);
    }
  }

}
