import { Router } from 'express';
import ProductManager from '../Class/productManager.js';
import { __dirname } from '../utils.js';

const app = Router();

const productManager = new ProductManager(__dirname + '/data/product.json');

app.get('/home', async (req, res) => {
    const products = await productManager.getProductList();
    res.render('home', { products });
});

export default app;
