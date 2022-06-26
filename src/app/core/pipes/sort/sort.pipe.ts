import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], sortBy: string | ((obj: any) => any), sortDirection: string = 'asc'): any[] {
    function prop(value: any) {
      if (typeof sortBy == 'function') {
        return sortBy(value);
      }
      if (typeof value === 'object') {
        return value[sortBy];
      }
      return value;
    }
    return value.sort((a, b) => {
      if (prop(a) < prop(b)) {
        return (sortDirection.toLowerCase()) === 'asc' ? -1 : 1;
      }
      if (prop(a) > prop(b)) {
        return (sortDirection.toLowerCase()) === 'asc' ? 1 : -1;
      }
      return 0;
    }
    );
  }

}
