import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number, currencySymbol: string = '$'): string {
    if (isNaN(value)) {
      return '';
    }
    var currency = Number(value).toFixed(2).split(".");
    return currencySymbol + currency[0].split("").reverse().reduce((acc, num, i, orig) => {
        return num + (num != "-" && i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + currency[1];
  }
}