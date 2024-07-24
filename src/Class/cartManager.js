import fs from 'node:fs';

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
    }

    async getCarts() {
        const list = await fs.promises.readFile(this.path, 'utf-8');
        this.carts = [...JSON.parse(list).data];
        return [...this.carts]
    }

    async addProductOnCart(cid, pid){
        this.carts = await this.getCarts()
        const cartIndex = this.carts.findIndex(cart => cart.id == cid);

        if (cartIndex === -1) {
            return {error: 'no se encontro el carrito'};
        }

        const cart = this.carts[cartIndex];
        const productIndex = cart.products.findIndex(product => product.id == pid);

        if (productIndex === -1) {
            cart.products.push({ id: pid, quantity: 1 });
        } else {
            cart.products[productIndex].quantity +=1
        }

        await fs.promises.writeFile(this.path, JSON.stringify({ data: this.carts }));
        return cart
    }

    async createCart() {
        await this.getCarts();
        const newCart = {
            id: this.carts.length ? Math.max(...this.carts.map(cart => cart.id)) + 1 : 1,
            products: []
        };
        this.carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify({ data: this.carts }));
        return newCart;
    }
}

export default CartManager;
