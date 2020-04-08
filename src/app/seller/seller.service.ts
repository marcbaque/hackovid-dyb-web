import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Web3Service } from '../core/web3/web3.service';
import TicketEntity from '../core/entity/ticket.entity';
import ProductEntity from '../core/entity/product.entity';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(
    public web3Service: Web3Service
  ) { }

  public checkAuthorized() {
    return new Observable(subscriber => {
      if (this.web3Service.getAccount()) {
        subscriber.next(true);
        subscriber.complete();
      } else {
        subscriber.error();
        subscriber.complete();
      }
    })
  }

  public signupSeller() {
    return this.web3Service.registerUser()
  }

  public getBalance(): Observable<number> {
    return new Observable<number>(subscriber => {
      subscriber.next(100);
      subscriber.complete();
    }).pipe(
      delay(500)
    )
  }

  public getTickets(): Observable<TicketEntity[]> {
    return new Observable<TicketEntity[]>(subscriber => {
      let tickets = Array.from(Array(10).keys()).map(i => {
        return new TicketEntity({
          id: i,
          buyer: {
            name: "Marc Baqué"
          },
          seller: {
            name: "Bonpreu"
          },
          products: [
            new ProductEntity({
              id: 'p1',
              name: "Colacao",
              price: 1.2,
              count: 10
            }),
            new ProductEntity({
              id: 'p2',
              name: "Colacao",
              price: 1.2,
              count: 10
            }),
            new ProductEntity({
              id: 'p3',
              name: "Colacao",
              price: 1.2,
              count: 10
            }),
            new ProductEntity({
              id: 'p4',
              name: "Colacao",
              price: 1.2,
              count: 10
            }),
          ],
          date: new Date()
        })
      })

      subscriber.next(tickets);
      subscriber.complete();
    }).pipe(
      delay(1500)
    )
  }

  public getProducts(): Observable<ProductEntity[]> {
    return new Observable<ProductEntity[]>(subscriber => {
      let products = Array.from(Array(10).keys()).map(i => {
        return new ProductEntity({
          id: `p${i}`,
          name: `Colacao ${i}`,
          price: 1.2
        })
      })

      subscriber.next(products);
      subscriber.complete();
    }).pipe(
      delay(500)
    )
  }

  public createTicket(ticket: TicketEntity) {
    return new Observable(subscriber => {
      subscriber.next(ticket);
      subscriber.complete();
    }).pipe(
      delay(500)
    )
  }

  public checkTicketTransaction(ticket: TicketEntity): Observable<TicketEntity> {
    return new Observable<TicketEntity>(subscriber => {
      let rand = Math.random();

      if (rand > 0.75) {
        ticket.transactionHash = '0x000000000000'
        subscriber.next(ticket)
        subscriber.complete()
      } else {
        subscriber.next(null)
        subscriber.complete()
      }
    }).pipe(
      delay(500)
    )
  }
}
