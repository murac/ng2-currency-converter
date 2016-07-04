import {Component} from '@angular/core';
import {ExchangeService} from "./exchange.service";
import {CurrencySelectComponent} from "./currency.select.component";
import {FixedPipe} from "./fixed.pipe";
import {HTTP_PROVIDERS} from "@angular/http";

@Component({
    selector: 'currency-converter',
    directives: [CurrencySelectComponent],
    pipes: [FixedPipe],
    template: `
        <input type="number" [(ngModel)]="baseAmount" [class.error]="isInvalid(baseAmount)">
        <currency-select [(selected)]="baseCurrency"></currency-select>
       = <strong>{{ targetAmount | fixed }}</strong>
       <currency-select [(selected)]="targetCurrency"></currency-select>
         <p *ngIf="isInvalid(baseAmount)">Please Enter a Valid Amount</p>
       
`,
    styles: [`
        input[type=number]{
        width:10ex;
        text-align: right;
        }
        .error {
        background-color:#ff6666;
        }
`],
    providers: [ExchangeService, HTTP_PROVIDERS]
})
export class AppComponent {
    now = Date.now();
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