import ProductEntity from './product.entity';
import { JsonPipe } from '@angular/common';

export default class TicketEntity {
    public id: number;
    public buyer: {
        name: string;
        publicKey: string;
        nif: string;
    }
    public seller: {
        id: string;
        name: string;
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
        date?,
        transactionHash?
    }) {
        this.id = data?.id;
        this.buyer = data?.buyer;
        this.seller = data?.seller;
        this.products = data?.products || [];
        this.date = data?.date;
        this.transactionHash = data?.transactionHash;

        this.calculateTotal()
    }

    public static new(publicKey: string, name: string): TicketEntity {
        return new TicketEntity({
            seller: {
                id: publicKey,
                name: name
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
            id: this.id,
            seller: {
                id: this.seller.id,
                name: this.seller.name
            },
            products: this.products,
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