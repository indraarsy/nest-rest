export class Product {
    id: string;
    title: string;
    description: string;
    price: number
    constructor(id:string, title:string, desc:string, price:number) {
        this.id = id;
        this.title = title;
        this.description = desc;
        this.price = price
    }
}