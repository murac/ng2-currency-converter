import {Component} from '@angular/core';

@Component({
    selector: 'currency-converter',
    template: `
        <input type="number" [value]="baseAmount" (input)="update($event.target.value)">
        USD = <strong>{{targetAmount}}</strong>GBP
`,
    styles: [`
        input[type=number]{
        width:10ex;
        text-align: right;
        }
`]
})
export class AppComponent {
    baseAmount = 1;
    exchangeRate = 0.70;
    targetAmount = this.exchangeRate;

    update(baseAmount){
        this.targetAmount = parseFloat(baseAmount) * this.exchangeRate;
    }
}