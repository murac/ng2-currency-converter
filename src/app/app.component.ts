import {Component} from '@angular/core';
import {ExchangeService} from "./exchange.service";

@Component({
    selector: 'currency-converter',
    template: `
        <h1>Currency Converter</h1>
        Convert: <input type="number" [(ngModel)]="baseAmount" [ngClass]="{error: isInvalid(baseAmount)}">
        <p>
        <strong>{{baseAmount}}</strong> {{baseCurrency}} = <strong>{{targetAmount}}</strong>{{targetCurrency}}
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