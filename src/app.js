import express from 'express';
import  {__dirname} from './utils.js';
import ProducosRoute from './routes/productos.router.js';
const app = express();

// middleware es un intermediario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api/productos', ProducosRoute);

app.listen(8080, () => {
    console.log('servidor listo')
})