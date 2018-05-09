import { FormControl, Validators } from '@angular/forms';

export class CustomValidators extends Validators {

  static validateCharacters(validCharacters) {
    return (control: FormControl) => {
      if (control.value && control.value.length > 0) {
        const matches = control.value.match(validCharacters);
        const empty = control.value.trim().length === 0;
        return !empty && matches && matches.length ? null : { invalidCharacters: true };
      } else {
        return null;
      }
    };
  }

  static validateIdNumber(): any {
    return (control: FormControl) => {
      if (control.value && control.value.length > 0) {
        let id = String(control.value).trim();

        if (id.length > 9 || id.length < 5) {
          return false;
        }

        // Pad string with zeros up to 9 digits
        id = id.length < 9 ? ('00000000' + id).slice(-9) : id;

        return Array.from(id, Number).reduce((counter, digit, i) => {
          const step = digit * ((i % 2) + 1);
          return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0 ? null : { invalidCharacters: true };
      } else {
        return null;
      }
    };
  }

  static minDate(date, time) {
    return (control: FormControl) => {
      if (control.value) {
        const formatted: any = time.format(control.value, time.defaultViewDateFormat, time.fullDateTimeFormat);

        return new Date(formatted).setHours(23, 59, 59, 999) >= new Date(date).getTime() ? null : { minDate: true };
      } else {
        return null;
      }
    };
  }

  static maxDate(date, time) {
    return (control: FormControl) => {
      if (control.value) {
        const formatted: any = time.format(control.value, time.defaultViewDateFormat, time.fullDateTimeFormat);

        return new Date(formatted).getTime() <= new Date(date).getTime() ? null : { maxDate: true };
      } else {
        return null;
      }
    };
  }

  static minLength(length) {
    return (control: FormControl) => {
      if (control.value) {

        return control.value.toString().length >= length ? null : { minlength: true };
      } else {
        return null;
      }
    };
  }

  static maxLength(length) {
    return (control: FormControl) => {
      if (control.value) {

        return control.value.toString().length <= length ? null : { maxlength: true };
      } else {
        return null;
      }
    };
  }

  static maxValue(value) {
    return (control: FormControl) => {
      if (control.value !== null) {
        return control.value <= value ? null : { maxvalue: true };
      } else {
        return null;
      }
    };
  }

  static minValue(value) {
    return (control: FormControl) => {
      if (control.value !== null) {
        return control.value >= value ? null : { minvalue: true };
      } else {
        return null;
      }
    };
  }

  static required() {
    return (control: FormControl) => {
      return control.value ? null : { required: true };
    };
  }

  static matchPassword(compareControl: FormControl) {
    return (control: FormControl) => {
      const value = compareControl.value;
      if (control.value && value !== null) {
        return control.value.toString() === value.toString() ? null : { matchPassword: true };
      } else {
        return null;
      }
    };
  }
}
