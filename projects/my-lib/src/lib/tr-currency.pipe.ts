import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trCurrency',
  standalone: true
})
export class TrCurrencyPipe implements PipeTransform {

  transform(value: number, symbol: string = "", isCurrencyFront: boolean = false): string {
    if (value == 0) {            
      return "0,00 " + symbol;
    }

    let isValueNegative:boolean = false;
    if(value < 0){
      isValueNegative = true;
      value *= -1;
    }

    let money = value.toString().split(".")
    let newMoney = "";
    let lira = money[0];
    let penny = "00";
    if (money.length > 1) {
      penny = money[1]
      if (penny.length == 1) {
        penny = penny + "0"
      }

      if (penny.length > 1) {
        penny = this.convertNumber(+penny).toString();
      }
    }

    let count = 0;
    for (let i = lira.length; i > 0; i--) {      
      if (count == 3 && count < (lira.length)) {
        newMoney = lira[i-1] + "." + newMoney 
        count = 1;
      }else{
        newMoney = lira[i-1] + newMoney
        count++;
      }
    }

    if(!isCurrencyFront)
      newMoney = `${newMoney},${penny} ${symbol}`;
    else  
     newMoney = `${symbol}${newMoney},${penny}`;

    if(isValueNegative){
      newMoney = "-" + newMoney;
    }    
    return newMoney;
  } 

  convertNumber(value: number): number {
    const stringValue = value.toString();
    if (stringValue.length > 2) {
      const remainingValue = parseInt(stringValue.substr(2));
      if (remainingValue > 5) {
        return parseInt(stringValue.substr(0, 2)) + 1;
      }
      return parseInt(stringValue.substr(0, 2));
    }
    return value;
  }

}
