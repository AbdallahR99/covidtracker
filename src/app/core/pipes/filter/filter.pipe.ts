import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(
    value: any[], query: string, filterByProp: string, filterByFallBack: string ): any[] {
     return value
    ?.filter(
      f => filterByProp ?
      f[filterByProp]?.toLowerCase()?.includes(query?.toString()?.toLowerCase()) ||
      f[filterByProp]?.toString()?.toLowerCase()?.includes(filterByFallBack?.toString()?.toLowerCase())
      : f?.toString()?.toLowerCase()?.includes((query ?? '').toString()?.toLowerCase()) ||
        f?.toString()?.toLowerCase()?.includes((filterByFallBack ?? '').toString()?.toLowerCase())
    );
    }


}
