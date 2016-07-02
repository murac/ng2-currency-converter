import {Component} from '@angular/core';
import {ExchangeService} from "./exchange.service";
import {CurrencySelectComponent} from "./currency.select.component";

@Component({
    selector: 'currency-converter',
    directives: [CurrencySelectComponent],
    template: `
        <input type="number" [(ngModel)]="baseAmount" [class.error]="isInvalid(baseAmount)">
        <currency-select [(selected)]="baseCurrency"></currency-select>
       = <strong>{{targetAmount}}</strong>
       <currency-select [(selected)]="targetCurrency"></currency-select>
       <p>
</p>
`,
    styles: [`
        input[type=number]{
        width:10ex;
        text-align: right;
        }
        .error{
        background-color:#ff6666;
        }
`],
    providers: [ExchangeService]
})
export class AppComponent {
    baseCurrency = "USD";
    targetCurrency = "GBP";
    baseAmount = 1;

    constructor(private _exchangeService:ExchangeService) {
    }

    get targetAmount() {
        const exchangeRate = this._exchangeService
            .getExchangeRate(this.baseCurrency, this.targetCurrency);
        return this.baseAmount * exchangeRate;
    }

    isInvalid(value) {
        return !Number.isFinite(value);
    }
}