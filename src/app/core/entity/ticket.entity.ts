import ProductEntity from './product.entity';
import { JsonPipe } from '@angular/common';

export default class TicketEntity {
    public id: string;
    public buyer: {
        name: string;
        publicKey: string;
        nif: string;
    }
    public seller: {
        name: string;
        publicKey: string;
        cif: string;
    }
    public products: ProductEntity[] = [];
    public total: string = '0.00';
    public date: Date;

    public transactionHash: string;

    constructor(data?: {
        id?,
        buyer?,
        seller?,
        products?: ProductEntity[],
        date?
    }) {
        this.id = data?.id;
        this.buyer = data?.buyer;
        this.seller = data?.seller;
        this.products = data?.products || [];
        this.date = data?.date;

        this.calculateTotal()
    }

    public static new(publicKey: string): TicketEntity {
        return new TicketEntity({
            seller: {
                name: publicKey
            },
            products: [],
            date: new Date()
        })
    }

    public addProduct(product: ProductEntity) {
        this.products.push(product);

        this.calculateTotal()
    }

    public toString() {
        return JSON.stringify({
            seller: this.seller.publicKey,
            products: this.products.map(product => product.toString()),
            date: this.date.getTime()
        })
    }

    private calculateTotal() {
        let total = 0;
        this.products.forEach(product => {
            total += (product.count * parseFloat(product.price));
        })

        this.total = total.toFixed(2);
    }
}