import { Pipe, PipeTransform } from '@angular/core';
import { RcTranslateService } from './rc-translate.service';

/**
 * example
 * {{'testTranslation' | rcTranslate:['p1', 'p2']}}
 */
@Pipe({
  name: 'rcTranslate'
})
export class RcTranslatePipe implements PipeTransform {

  constructor(private translate: RcTranslateService) {

  }

  transform(value: any, args?: any): any {
    return this.translate.getText(value, args);
  }

}
