import { Injectable, Inject } from '@angular/core';
import Web3 from "web3";
import { WEB3 } from './web3.config';
import { from, Observable, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private WEB3_ACCOUNT_PRIVATE_KEY = "WEB3_ACCOUNT_PRIVATE_KEY";

  private currentAccount = null;

  constructor(@Inject(WEB3) private web3: Web3) {}

  public registerUser() {
    return new Observable(subscriber => {
      let account = this.getAccount();
      if (account) {
        subscriber.next(account);
        subscriber.complete();
        return;
      }

      account = this.web3.eth.accounts.create();
      this.saveAccount(account.privateKey);
      this.currentAccount = account.address;

      subscriber.next(this.currentAccount);
      subscriber.complete();
    })
  }

  public getAccount() {
    if (this.currentAccount) return this.currentAccount;

    this.web3.eth.getAccounts()
      .then(console.log)

    let privateKey;
    if (privateKey = localStorage.getItem(this.WEB3_ACCOUNT_PRIVATE_KEY)) {
      this.currentAccount = this.web3.eth.accounts.privateKeyToAccount(privateKey).address;
      return this.currentAccount;
    }

    return null;
  }

  public getBalance() {
    return of(100)
      .pipe(
        delay(500)
      );
  }

  public askCredit() {
    return new Observable(subscriber => {
      let random = Math.random();

      if (random > 0.5) {
        subscriber.next({
          value: 100
        });
      } else {
        subscriber.error({
          code: 500
        })
      }
    })
    .pipe(
      delay(2000)
    );
  }

  public waitForTransaction(transactionHash: string) {
    return new Observable(subscriber => {
      subscriber.next(true);
      subscriber.complete();
    }).pipe(
      delay(1500)
    )
  }

  private saveAccount(privateKey: string) {
    localStorage.setItem(this.WEB3_ACCOUNT_PRIVATE_KEY, privateKey);
  }
}
