import { Pipe, PipeTransform } from '@angular/core';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({
  name: 'limitTo'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string | undefined | null, limit: number = 10, trail: string = '...'): string {
    
    if (!value) {
      return '';
    }
    
    if (value.length <= limit) {
      return value;
    }
    return value.substring(0, limit) + trail;
  }
}