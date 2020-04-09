import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, switchMap, map } from 'rxjs/operators';
import { Web3Service } from '../core/web3/web3.service';
import TicketEntity from '../core/entity/ticket.entity';
import ProductEntity from '../core/entity/product.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(
    public http: HttpClient,
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

  public signupSeller(sellerData: any) {
    return this.web3Service.registerUser()
      .pipe(
        switchMap(res => {
          const body = {
            public_key: res,
            name: sellerData.name,
            email: sellerData.email,
            nif: sellerData.cif
          }
          return this.http.post(`${environment.apiUrl}/seller`, body)
            .pipe(
              map(() => {
                this.setSellerName(body.name);
              })
            )
        })
      )
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
    return this.http.get(`${environment.apiUrl}/tickets`)
      .pipe(
        map((tickets: any[]) => {
          return tickets.map(ticket => {
            return new TicketEntity({
              id: ticket.id,
              buyer: {
                name: ticket.buyer
              },
              products: ticket.products.map(product => {
                return new ProductEntity({
                  id: product.Product.product_id,
                  name: product.Product.name,
                  price: product.Product.price,
                  count: product.amount
                })
              }),
              date: new Date(ticket.timestamp)
            })
          })
        })
      )
  }

  public getProducts(): Observable<ProductEntity[]> {
    return this.http.get(`${environment.apiUrl}/products`)
      .pipe(
        map((products: any[]) => {
          return products.map(product => {
            return new ProductEntity({
              id: product.product_id,
              name: product.name,
              price: product.price
            })
          })
        })
      )
  }

  public createTicket(ticket: TicketEntity): Observable<number> {
    const body = {
      seller: this.web3Service.getAccount(),
      timestamp: ticket.date.toISOString(),
      products: ticket.products.map(product => {
        return {
          product_id: product.id,
          amount: product.count
        }
      })
    }
    return this.http.post(`${environment.apiUrl}/tickets`, body)
      .pipe(
        map((ticket: any) => {
          return ticket.id;
        })
      );
  }

  public checkTicketTransaction(ticket: TicketEntity): Observable<string> {
    return new Observable<string>(subscriber => {
      this.getTicketById(ticket)
        .subscribe((ticket: any) => {
          if (ticket.tx_hash) {
            subscriber.next(ticket.tx_hash)
            subscriber.complete()
          } else {
            subscriber.next(null);
            subscriber.complete()
          }
        })
    })
  }

  public getTicketById(ticket: TicketEntity) {
    console.log('Previous', ticket)
    return this.http.get(`${environment.apiUrl}/ticket/${ticket.id}`)
      .pipe(
        map(ticket => {
          console.log(ticket)
        })
      )
  }

  public getSellerName() {
    return localStorage.getItem('SELLER_NAME') || '';
  }

  private setSellerName(name: string) {
    localStorage.setItem('SELLER_NAME', name);
  }
}
