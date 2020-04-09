export default class ProductEntity {
    public id: number;
    public name: string;
    public count: number;
    
    private _price: number;
    get price(): string {
        return this._price.toFixed(2)
    }
    set price(price: string) {
        this._price = parseInt(price);
    }

    constructor(data?: {
        id: number,
        name: string,
        price: number,
        count?: number
    }) {
        this.id = data?.id;
        this.name = data?.name;
        this._price = data?.price;
        this.count = data?.count;
    }

    public toString() {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            price: this._price,
            count: this.count
        })
    }
}