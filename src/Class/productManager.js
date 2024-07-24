import fs from 'node:fs';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.productList = [];
    }

    async getProductList() {
        const list = await fs.promises.readFile(this.path, 'utf-8');
        this.productList = [...JSON.parse(list).data];
        return [...this.productList];
    }

    async getProductById(id) {
        await this.getProductList();
        return this.productList.find(product => product.id === Number(id));
    }

    async deleteProduct(id) {
        await this.getProductList();
        const initialLength = this.productList.length;
        this.productList = this.productList.filter(product => product.id !== Number(id));
        const finalLength = this.productList.length;
        console.log(`Initial length: ${initialLength}, Final length: ${finalLength}`); // Log para verificar la longitud
        if (initialLength === finalLength) {
            throw new Error('Producto no encontrado');
        }
        await fs.promises.writeFile(this.path, JSON.stringify({ data: this.productList }));
    }

    async addProduct(product) {
        await this.getProductList();
        const newProduct = { id: this.productList.length + 1, ...product };
        this.productList.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify({ data: this.productList }));
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        await this.getProductList();
        const productIndex = this.productList.findIndex(product => product.id == id);

        if (productIndex === -1) {
            return { error: 'Producto no encontrado' };
        }

        this.productList[productIndex] = { ...this.productList[productIndex], ...updatedFields };
        await fs.promises.writeFile(this.path, JSON.stringify({ data: this.productList }));
        return this.productList[productIndex];
    }
}

export default ProductManager;
