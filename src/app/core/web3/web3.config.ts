import { InjectionToken } from '@angular/core';
import Web3 from 'web3';
import { environment } from 'src/environments/environment';

export const WEB3 = new InjectionToken<Web3>('web3', {
  providedIn: 'root',
  factory: () => {
    try {
      return new Web3(new Web3.providers.WebsocketProvider(environment.web3Provider));
    } catch (err) {
      throw new Error('Non-Ethereum browser detected. You should consider trying Mist or MetaMask!');
    }
  }
});