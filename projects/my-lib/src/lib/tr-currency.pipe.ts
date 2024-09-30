import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trCurrency',
  standalone: true
})
export class TrCurrencyPipe implements PipeTransform {

  transform(value: number, symbol: string = "", isCurrencyFront: boolean = true, fraction:number = 2): string {
    if(fraction < 0) fraction = 0;

    if (value === 0 || value === undefined) { 
      if(fraction === 0){
        if(isCurrencyFront){
          return `${symbol}0`
        }else{
          return `0 ${symbol}`
        }
      }else{
        if(isCurrencyFront){
          return `${symbol}0,${'0'.repeat(fraction)}`;
        }else{
          return `0,${'0'.repeat(fraction)} ${symbol}`;
        }        
      }      
    }

    let isValueNegative:boolean = false;
    if(value < 0){
      isValueNegative = true;
      value *= -1;
    }

    if (!isNaN(value)) {
      value = parseFloat(value.toFixed(fraction));
    } else {
      value = 0;
    }

    let money = value.toString().split(".")
    let newMoney = "";
    let lira = money[0];
    let penny = money.length > 1 ? money[1] : "";

    // Küsuratları doğru uzunlukta yapma
    if (penny.length < fraction) {
      penny = penny + "0".repeat(fraction - penny.length);
    }

    let count = 0;
    for (let i = lira.length; i > 0; i--) {      
      if (count == 3 && count < (lira.length)) {
        newMoney = lira[i-1] + "." + newMoney 
        count = 1;
      } else {
        newMoney = lira[i-1] + newMoney
        count++;
      }
    }

    if(!isCurrencyFront){
      if(fraction === 0){
        newMoney = `${newMoney} ${symbol}`;
      }else{
        newMoney = `${newMoney},${penny} ${symbol}`;
      }
    }
    else{
      if(fraction === 0){
        newMoney = `${symbol}${newMoney}`;
      }else{
        newMoney = `${symbol}${newMoney},${penny}`;
      }      
    }

    if(isValueNegative){
      newMoney = "-" + newMoney;
    }    
    return newMoney;
  }
}
