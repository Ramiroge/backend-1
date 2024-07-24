import { Router } from "express";

const app = Router()

// Saludo
app.get('/', (req, res)=>{
    const { nombre } = req.query
    res.render('saludo', {
        name: nombre,
        edad: 22
    })
})

// Admin
app.get('/admin', (req, res)=>{
    const { nombre } = req.query
    res.render('admin', {
        isAdmin: true,
        notas: [{
            titulo: 'artui',
            description: 'asdasd'
        },{
            titulo: 'artui2',
            description: 'hgfhgfghfgh'
        }]
    })
})

app.get('/register', (req, res)=>{
    res.render('register',{})
})

export default app;