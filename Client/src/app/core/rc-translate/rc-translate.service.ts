import { Injectable } from '@angular/core';
import * as data from './he.translation.json';
import * as R from 'ramda';
import * as _ from 'lodash';

@Injectable()
export class RcTranslateService {

  private textTranslation: any;

  constructor() {
    this.textTranslation = data;
  }

  getText(key: string, placeholdersReplace: any = []) {
    if (R.isNil(key)) {
      return '';
    }

    const value = _.at(this.textTranslation, key);

    if (value.length > 0) {
      if (placeholdersReplace.length) {
      }
      if (placeholdersReplace && R.is(Array, placeholdersReplace) && placeholdersReplace.length > 0) {
        value[0] = this.replacePlaceholders(value[0], placeholdersReplace);
      }
      return value[0];
    }
    return key;
  }

  replacePlaceholders(text, placeholders) {
    if (R.isNil(text)) {
      return '';
    }

    let counter = 0;

    placeholders.forEach((placeholder) => {
      if (!R.isNil(placeholder)){
        placeholder = placeholder.toString();
        text = text.replace(`{${counter}}`, placeholder);
      }
      counter++;
    });
    return text;
  }

  mergeDeep (target, source) {
    if (typeof(target) === 'object' && typeof(source) === 'object') {
      for (let key in source) {
        if (typeof(source[key]) === 'object') {
          if (!target[key]) {
            Object.assign(target, { [key]: {} });
          }
          this.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return target;
  }
}



