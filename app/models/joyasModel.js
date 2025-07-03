const mongoose = require('mongoose')

const joyasSchemas = mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        length:50,
    
    },
    descripcion:{
        type:String,
        required:true,
        length:200
    },
    precio:{
        type:String,
        required:true
    },
    peso:{
        type:Number,
        required:true
    },
    stok:{
        type:Number,
        default:10
    }
})

const joyasModel = mongoose.model('joyas',joyasSchemas)
module.exports = joyasModel