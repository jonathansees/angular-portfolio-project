import { ShoppingCart } from './shopping-cart';

export class Order {
    datePlaced:number;
    items: any[];

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();

        this.items = shoppingCart.items.map(i => {
            return {
                product: {
                brand: i.brand,
                model: i.model,
                imageUrl: i.imageUrl,
                price: i.price
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            }
        })
    }
}