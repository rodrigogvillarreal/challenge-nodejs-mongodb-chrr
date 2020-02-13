const express = require('express');
const router = express.Router();
const SitiosInteres = require('./sitiosInteres');

router.get('/', (req, res) => {
    res.send('Hello World!')
})

/*
Se muestran 10 registros por pagina
Parametros a recibir:
    p: nro de pagina
    q: filtro de busqueda
*/
router.get('/sitiosInteres', async (req, res) => {

    let sitioInteres;
    let sk = 0;

    if(req.query.p) sk = (req.query.p - 1) * 10;
    
    if(req.query.q){
        sitioInteres = await SitiosInteres.find({ nombre: new RegExp(req.query.q, "i") }, { id:1, nombre:1 });
    }else{
        sitioInteres = await SitiosInteres.find({}, { id:1, nombre:1 }, { skip: sk, limit: 10 });
    }
    
    res.json(sitioInteres);
});

// Detalle de un sitio por id 
router.get('/sitiosInteres/:id', async (req, res) => {
    sitio = await SitiosInteres.find({ id: req.params.id });
    res.json(sitio);
});

// Editar un sitio
router.post('/sitioInteresEdit', async (req, res) => {
    sitio = await SitiosInteres.findById({ _id: req.body.id });
    await sitio.update({ _id: sitio._id }, req.body );
    res.json({ resultado: 'Sitio editado' });
})

//Crear un sitio de interes
router.post('/sitiosInteres', async (req, res) => {
    let sitioInteres = new SitiosInteres(req.body);
    await sitioInteres.save();
    res.json({ resultado: 'Sitio creado' });
});

// Eliminar un sitio
router.post('/sitioInteresDelete', async (req, res) => {
    sitio = await SitiosInteres.findById({ _id: req.body.id });
    await sitio.remove({ _id: sitio._id });
    res.json({ resultado: 'Sitio eliminado' });
})

module.exports = router;