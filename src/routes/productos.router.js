import { Router } from "express";
import { uploader } from "../utils.js";

const router = Router();

// router.get('/',(req, res)=>{
//     res.status(200).json({
//         mensaje: 'todo joya'
//     })
// })

router.post('/',uploader.single('fotito'),(req, res)=>{
    console.log(req.file)
    res.status(200).send('Archivo subido con exito')
})


export default router;