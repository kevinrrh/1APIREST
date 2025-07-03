const express = require('express')
const router = express.Router()
const joyasController =require('../controllers/joyasController')

router.get('/joyas',joyasController.buscarTodo)

router.get('/joyas/anillo', (req,res)=>{
    res.json({
        mensaje:"hola mundo"
    })
})

module.exports=router