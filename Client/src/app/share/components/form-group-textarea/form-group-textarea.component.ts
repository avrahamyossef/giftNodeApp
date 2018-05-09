import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isNull } from 'util';

@Component({
  selector: 'app-form-group-textarea',
  templateUrl: './form-group-textarea.component.html',
  styleUrls: ['./form-group-textarea.component.scss']
})
export class FormGroupTextareaComponent implements OnInit {

  @Input() control: FormControl;
  @Input() idValue: string;
  @Input() maxlength: string;
  @Input() placeholder: string;
  @Input() description: string;
  @Input() invalidCharactersError: string;
  @Input() invalidPatternError: string;
  @Input() requiredError: string;
  @Input() errorMax: string;
  @Input() translateParams: any = [];
  @Input() invalidLengthError: string;
  @Input() invalidSpecificLengthError: string;
  @Input() markAsPristineIfEmpty: boolean = false;
  @Input() required: boolean;
  @Input() rows: number = 3;
  @Output() inputChangeCallback: EventEmitter<any> = new EventEmitter();
  @Output() focusCallback: EventEmitter<any> = new EventEmitter();

  isNull: any;

  constructor() {
  }

  onBlur(event) {
    if (this.markAsPristineIfEmpty && !event.target.value) {
      this.control.markAsPristine();
    }
    // this.control.markAsPristine();
  }

  ngOnInit() {
    this.isNull = isNull;
  }

  onChange() {
    if (this.inputChangeCallback.observers.length) {
      this.inputChangeCallback.emit();
    }
  }

  onFocus() {
    this.control.markAsPristine();
    if (this.focusCallback.observers.length) {
      this.focusCallback.emit();
    }
  }

  get elementId() {
    return `${this.idValue}Texrarea`;
  }
}
