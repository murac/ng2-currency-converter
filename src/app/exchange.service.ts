import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class ExchangeService {
    private baseUrl = "http://api.fixer.io";
    private exchangeRates = new Map<string, number>();
    supportedCurrencies = null;

    constructor(private http:Http){
        this.getSupported()
            .then(supportedCurrencies=>{
                this.supportedCurrencies=supportedCurrencies;
                for(const baseCurrency of this.supportedCurrencies){
                    this.loadRates(baseCurrency);
                }
                console.log(supportedCurrencies);
            });
    }

    getSupported():Promise<string[]>{
        return this.http.get(`${this.baseUrl}/latest`).toPromise().then(response=>{
            const data = response.json();
            let supportedCurrencies=Object.keys(data.rates);
            supportedCurrencies.push(data.base);
            return supportedCurrencies;
        });
    }

    getExchangeRate(baseCurrency:string, targetCurrency: string){
        if(baseCurrency === targetCurrency) return 1;
        return this.exchangeRates.get(`${baseCurrency}/${targetCurrency}`);
    }


    loadRates(baseCurrency:string){
        const targetCurrencies=this.supportedCurrencies.filter(currency=>currency!==baseCurrency);
        this.http.get(`${this.baseUrl}/latest?base=${baseCurrency}&symbols=${targetCurrencies}`).toPromise()
            .then(response=>{
                const rates = response.json().rates;
                for(const targetCurrency in rates){
                    this.exchangeRates.set(`${baseCurrency}/${targetCurrency}`,rates[targetCurrency]);
                }
            });
    }
}