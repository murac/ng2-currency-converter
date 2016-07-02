import {Component, Input, EventEmitter, Output} from '@angular/core';
import {ExchangeService} from "./exchange.service";

@Component({
    selector: 'currency-select',
    template: `
        <select [(ngModel)]="selected">
            <option *ngFor="let currency of supportedCurrencies" [value]="currency">
            {{currency}}
            </option>
        </select>
        <button (click)="onSetClick()">Set</button>
        ({{selected}})
`
})
export class CurrencySelectComponent {
    @Input() selected: string;
    @Output() selectedChange  = new EventEmitter();

    supportedCurrencies = [];

    constructor(exchangeService: ExchangeService){
        this.supportedCurrencies = exchangeService.supportedCurrencies;
    }

    onSetClick(){
        this.selectedChange.emit(this.selected);
    }

}