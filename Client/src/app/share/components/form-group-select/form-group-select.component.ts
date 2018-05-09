import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-group-select',
  templateUrl: './form-group-select.component.html',
  styleUrls: ['./form-group-select.component.scss']
})
export class FormGroupSelectComponent implements OnInit {

  @Output() changeCallback: EventEmitter<any> = new EventEmitter();
  @Output() focusCallback: EventEmitter<any> = new EventEmitter();
  @Output() blurCallback: EventEmitter<any> = new EventEmitter();

  @Input() idValue: string;
  @Input() control: FormControl;
  @Input() options: any = [];
  @Input() mustSelect: boolean = true;

  constructor() { }

  ngOnInit() {

  }

  onChange() {
    if (this.changeCallback.observers.length) {
      this.changeCallback.emit();
    }
  }

  onFocus() {
    if (this.focusCallback.observers.length) {
      this.focusCallback.emit();
    }
  }

  onBlur(event) {
    // if (this.markAsPristineIfEmpty && !event.target.value) {
    //   this.control.markAsPristine();
    // }
    this.control.markAsPristine();

    if (this.blurCallback.observers.length) {
      this.blurCallback.emit();
    }
  }


}
