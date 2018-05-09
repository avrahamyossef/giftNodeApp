import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-form-group-input',
  templateUrl: './form-group-input.component.html',
  styleUrls: ['./form-group-input.component.scss']
})

export class FormGroupInputComponent implements OnInit {

  @Input() control: FormControl;
  @Input() idValue: string;
  @Input() type: string;
  @Input() maxlength: string;
  @Input() placeholder: string;
  @Input() description: string;
  @Input() invalidCharactersError: string;
  @Input() invalidPatternError: string;
  @Input() requiredError: string;
  @Input() errorMax: string;
  @Input() matchPasswordError: string;
  @Input() translateParams: any = [];
  @Input() invalidLengthError: string;
  @Input() invalidSpecificLengthError: string;
  @Input() markAsPristineIfEmpty: boolean = false;
  @Input() required: boolean;
  @Input() showButton: boolean = false;
  @Input() buttonText: string;
  @Input() disabled: boolean = false;
  @Input() disabledBg: boolean = false;

  @Output() buttonAction: EventEmitter<any> = new EventEmitter();
  @Output() inputChangeCallback: EventEmitter<any> = new EventEmitter();
  @Output() focusCallback: EventEmitter<any> = new EventEmitter();

  public isNullOrUndefined: any;
  public showPasswordEye: boolean = false;

  constructor() {
  }

  onBlur(event) {
    if (this.markAsPristineIfEmpty && !event.target.value) {
      this.control.markAsPristine();
    }
  }

  ngOnInit() {
    this.isNullOrUndefined = isNullOrUndefined;
    this.showPasswordEye = this.type === 'password';
  }

  onInput() {
    if (!this.maxlength) {
      return true;
    }
    const fieldLength = this.control.value ? this.control.value.toString().length : 0;
    if (fieldLength <= this.maxlength.toString()) {
      return true;
    } else {
      let str = this.control.value.toString();
      if (this.control.value) {
        str = str.substring(0, str.length - 1);
        this.control.setValue(str);
      }
    }
  }

  onChange() {
    if (this.inputChangeCallback.observers.length) {
      this.inputChangeCallback.emit();
    }
  }

  onButtonClick() {
    this.buttonAction.emit();
  }

  onFocus() {
    if (this.focusCallback.observers.length) {
      this.focusCallback.emit();
    }
  }

  get elementId() {
    return this.type !== 'number' ? `${this.idValue}Other` : `${this.idValue}Number`;
  }

  showPassword() {
    this.type = 'text';
  }
  hidePassword() {
    this.type = 'password';

  }
}
