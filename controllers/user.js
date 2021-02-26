'use strict'

const jwt = require('jsonwebtoken');
var dbconfig = require('../models/conexion');
const sql = require('mssql')
var dbconn = new sql.ConnectionPool(dbconfig);

var controller = {


    consultar_usuarios: function(req, res){

        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function(err){
            if (err) throw err;
            var req = new sql.Request(dbconn);
            req.query("SELECT * FROM terceros",function (err, resultado){
                if (err) console.log(err);
                else{
                    console.log(resultado);
                    res.status(200).send({
                        resultados : resultado
                    });
                }
                dbconn.close();
            });
            
        });
    },
    
    getUser : async function(req,res) {      
        var user = req.body.user;  
        var password = req.body.password;         
        user = user.toString();
        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function(err){
            if (err) throw err;            
            var req = new sql.Request(dbconn);
             req.query("SELECT * FROM terceros WHERE documento='"+user+"'",function (err, userFind){                   
                if(err) return res.status(500).send({message:"Error al encontrar usuario..."});
                if(userFind.recordset[0] == null) return res.status(401).send({message:"El usuario no existe..."});  
                if(userFind.recordset[0] !== null){
                    if( ((userFind.recordset[0].contrasena).trim()) !== password) return res.status(401).send({message:"Constraseña erronea..."});
                    else{
                        const token = jwt.sign({id:userFind.recordset[0].id_tercero},"cañondecerdo");     
                        return res.status(200).json({               
                            token :token
                        });    
                        
                    }
                }
                dbconn.close();
            });
        });                      
    },
};

module.exports = controller;

