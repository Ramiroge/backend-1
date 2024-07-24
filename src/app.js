import express from 'express';
import { __dirname } from './utils.js';
import ProductosRoute from './routes/productos.router.js';
import ViewRouters from './routes/views.route.js';
import ProductManager from './Class/productManager.js';
import CartManager from './Class/cartManager.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

const app = express();

app.engine('handlebars',handlebars.engine()) ;// setea el tipo de motor de plantilla
app.set('views', __dirname + '/views') ;
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api/products', ProductosRoute);
app.use('/', ViewRouters);



// Inicialización de Managers
const productManager = new ProductManager(__dirname + '/data/product.json');
const cartManager = new CartManager(__dirname + '/data/cart.json'); 

// Iniciar servidor
const httpServer = app.listen(8080, () => {
    console.log('arranco la nave');
});

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
    console.log('id socket: ', socket.id);
    console.log('cantidad de sockets: ', socketServer.engine.clientsCount);
    console.log('nuevo dispositico conectado');

    socket.on('mensaje', (data)=> {
        console.log('mensaje recibido: ', data);
    })

    // socket.on('newProduct', async (product) => {
    //     await productManager.addProduct(product);
    //     const productos = await productManager.getProductList();
    //     socketServer.emit('productUpdate', productos);
    // });

    // socket.on('deleteProduct', async (id) => {
    //     await productManager.deleteProduct(id);
    //     const productos = await productManager.getProductList();
    //     socketServer.emit('productUpdate', productos);
    // });



    
// Agregar Producto
// app.post('/api/products', async (req, res) => {
//     const newProduct = req.body;
//     await productManager.addProduct(newProduct);
//     res.status(201).json({ mensaje: 'Producto añadido' });
// });

// // Actualizar producto
// app.put('/api/products/:id', async (req, res) =>{
//     const { id } = req.params;
//     const productoActualizar = req.body;
//     await productManager.updateProduct(id, productoActualizar);
//     res.status(203).json({ mensaje: 'Actualizado'});
// })

// // Rutas GET
// app.get('/api/products', async (req, res) => {
//     const productList = await productManager.getProductList();
//     res.status(200).json({ resultado: productList }); 
// });

// // Ver producto por ID
// app.get('/api/products/:id', async (req, res) => {
//     const { id } = req.params
//     const productFind = await productManager.getProductById(id)
//     res.status(201).json({ resultado: productFind})
// })

// // Eliminar producto
// app.delete('/api/products/:id', async (req, res) => {
//     const { id } = req.params;
//     await productManager.deleteProduct(id);
//     res.status(200).json({ mensaje: 'Producto eliminado' });
// });



// // Crear nuevo carrito
// app.post('/api/carts', async (req, res) => {
//     const newCart = await cartManager.createCart();
//     res.status(200).json({ mensaje: 'Carrito creado', carrito: newCart });
// })

// //Agregar producto al carrito
// app.post('/api/carts/:cid/product/:pid', async (req, res) => {
//     const { cid , pid} = req.params;
//     await cartManager.addProductOnCart(cid, pid);
//     res.status(200).json({ mensaje: 'Producto agregado al carrito'});
// })
})