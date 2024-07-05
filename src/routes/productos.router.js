import { Router } from "express";

const router = Router();

router.get('/',(req, res)=>{
    res.status(200).json({
        mensaje: 'todo joya'
    })
})

router.post('/',(req, res)=>{
    //
})


export default router;