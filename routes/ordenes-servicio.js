    'use strict'

var express = require('express');
var OrdenesController = require ('../controllers/ordenes-servicio');
const jwt = require('jsonwebtoken');

var router = express.Router();


router.get('/consultar_terceros',OrdenesController.consultar_terceros);
router.post('/insertar_Orden_Servicio',OrdenesController.insertar_Datos);
router.get('/consultar_idTercero/:user',OrdenesController.consultar_idTercero);
router.get('/consultar_depositos',OrdenesController.consultar_almacenes_deposito);
router.get('/consultar_ordenes_Servicio',OrdenesController.consultar_ordenes_servicio);
router.post('/crear_directorios/:n_orden',OrdenesController.crear_directorio);
router.get('/consultar_numero_orden/:id_temporal',OrdenesController.consultar_numero_orden);


module.exports = router;

function verifyToken(req, res, next){
    if(!req.headers.authorization) return res.status(401).send({message :"anUnthorize request"});
    const token = req.headers.authorization.split(' ')[1];        
    if( token == 'null') return res.status(401).send({message :"anUnthorize request"});    
    const verifiedToken = jwt.verify(token, "cañondecerdo");
    req.userId = verifiedToken.id;
    next();
}
