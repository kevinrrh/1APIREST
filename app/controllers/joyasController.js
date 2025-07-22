const joyasModel = require('../models/joyasModel')

function buscarTodo(re,res){
    joyasModel.find({})
    .then(joyas =>{
        if(joyas.length){
            return res.status(200).send({joyas})
        }
        return res.status(204).send({mensaje:"no hay nada que mostrar"})            
})
 .catch(e =>{ return res.status(404).send({mensaje:`error al consultar la informacion ${e} `})})
}

function agregarJoyas(req,res){
   //console.log(req.body)//
    new joyasModel(req.body).save()
    .then(info => { 
        return res.status(200).send({ 
                mensaje:"La informacion se guardo de forma correcta",
                info
        })
    }) 
    .catch(e =>{return res.status(404).send({mensaje:`error al guardar $(e)`})} )
}
    
async function buscarJoya(req,res,next){
    if(!req.body)req.body={}
    var consulta = { }
    consulta[req.params.key]=req.params.value
    //console.log(consulta)//
    await joyasModel.find(consulta)
    .then(joyas => { 
        if(!joyas.length) return next();
        req.body.joyas = joyas
        return next()
    })
       .catch(e =>{
        req.body.e = e
        return next()
    })
}
function mostrarJoya(req,res){
    if(req.body.e)return res.status(404).send({mensaje:`error al mostrar la info $(e)`})
    if(req.body.joyas)return res.status(200).send({mensaje:`no hay nada que mostrar $(e)`})
    let joyas = req.body.joyas
    return res.status(200).send({joyas})
}

function eliminarJoya(req, res) {
    var joyas = {}; 
    joyas = req.body.joyas;
    joyasModel.deleteOne(joyas[0])
    .then(info => {
        return res.status(200).send({ mensaje: "Registro eliminado" });
    })
    .catch(e => {
        return res.status(404).send({ mensaje: "Error al eliminar la info", e });
    });
}

function actualizarJoya(req, res) {
    var joyas = {};
    joyas = req.body.joyas;

    joyasModel.updateOne(joyas[0], req.body) // ← usamos req.body para los nuevos datos
    .then(info => {
        if (info.matchedCount === 0) {
            return res.status(404).send({ mensaje: "No se encontró la joya a actualizar" });
        }
        return res.status(200).send({ mensaje: "Registro actualizado" });
    })
    .catch(e => {
        return res.status(404).send({ mensaje: "Error al actualizar la info", e });
    });
}

module.exports = {
    buscarTodo,
    agregarJoyas,
    buscarJoya,
    mostrarJoya,
    eliminarJoya,
    actualizarJoya
}
