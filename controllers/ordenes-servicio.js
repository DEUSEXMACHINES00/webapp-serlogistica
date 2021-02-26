'use strict'
var dbconfig = require('../models/conexion');
const sql = require('mssql')
var dbconn = new sql.ConnectionPool(dbconfig);
var funcionesVarias = require('../models/funcionesVarias');
const fs = require('fs');
const { type } = require('os');
const fileUpload = require('express-fileupload');
const { dirname } = require('path');

var controller = {

    consultar_idTercero: function (req, res) {
        var user = req.params.user;
        user = user.toString();
        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);
            req.query("SELECT * FROM terceros WHERE documento='" + user + "'", function (err, idterceroFind) {
                if (err) return res.status(500).send({ message: "Error al encontrar el id tercero..." });
                if (idterceroFind.recordset[0] == null) return res.status(401).send({ message: "El usuario no existe..." });
                return res.status(200).send({ idterceroFind });
                dbconn.close();
            });
        });

    },

    consultar_terceros: function (req, res) {

        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);
            req.query("SELECT * FROM terceros", function (err, resultado) {
                if (err) console.log(err);
                else {

                    res.status(200).send({
                        resultados: resultado
                    });
                    dbconn.close();
                }
            });
        });
    },
    consultar_almacenes_deposito: function (req, res) {

        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);
            req.query("SELECT * FROM Almacenes_Deposito", function (err, resultado) {
                if (err) console.log(err);
                else {

                    res.status(200).send({
                        resultados: resultado
                    });
                    dbconn.close();
                }
            });
        });
    },
    consultar_ordenes_servicio: function (req, res) {

        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);
            req.query("SELECT * FROM Ordenes_Servicio", function (err, resultado) {
                if (err) console.log(err);
                else {

                    res.status(200).send({
                        resultados: resultado
                    });
                    dbconn.close();
                }
            });
        });
    },

    insertar_Datos: function (req, res) {

        var params = req.body;
        var string = funcionesVarias("Ordenes_Servicio", "Insertar", params, "");
        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) console.log(err);
            dbconn.query(string, (err, resultado) => {
                if (err) console.log(err);
                else {
                    res.status(200).send({
                        resultados: resultado,
                        params: params
                    });
                    dbconn.close();
                }
            });
        });
    },

    consultar_numero_orden: function (req, res) {

        var id = req.params.id_temporal;
        id = parseInt(id);
        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);
            req.query("SELECT * FROM Ordenes_Servicio WHERE id_temporal=" + id, function (err, ordenFind) {
                if (err) return res.status(500).send({ message: "Error : " + err });
                if (ordenFind.recordset[0] == null) return res.status(401).send({ message: "La orden no existe..." });
                return res.status(200).send({ ordenFind });
                dbconn.close();
            });
        });
    },

    crear_directorio: function (req, res) {
        var hoy = new Date();
        var año = hoy.getFullYear();
        var mes = (hoy.getMonth() + 1);
        var n_orden = req.params.n_orden;
        var filesToUpload = [];

        if (req.files) {

            filesToUpload = req.files.archivos;

            if (!fs.existsSync(__dirname + "/directorios/" + año)) {
                fs.mkdir(__dirname + "/directorios/" + año, function (err) {
                    if (err) throw err;
                    console.log("Directorio " + año + " creado correctamente...");
                    if (!fs.existsSync(__dirname + "/directorios/" + año + "/" + mes)) {
                        fs.mkdir(__dirname + "/directorios/" + año + "/" + mes, function (err) {
                            if (err) throw err;
                            console.log("Directorio " + mes + " creado correctamente dentro de " + año + "...");
                            fs.mkdir(__dirname + "/directorios/" + año + "/" + mes + "/" + n_orden, function (err) {
                                if (err) throw err;
                                for (var i = 0; i < filesToUpload.length; i++) {
                                    var file = filesToUpload[i];
                                    var fileName = filesToUpload[i].name

                                    file.mv(__dirname + "/directorios/" + año + "/" + mes + "/" + n_orden + "/" + fileName, function (err) {
                                        if (err) {
                                            res.send(err);
                                        } else {
                                            res.send("File uploaded")
                                        }
                                    });
                                }
                                console.log("Directorio " + n_orden + " creado correctamente dentro de " + mes + "del año " + año + "...");


                            });
                        });
                    }
                });

            } else {
                if (!fs.existsSync(__dirname + "/directorios/" + año + "/" + mes)) {
                    fs.mkdir(__dirname + "/directorios/" + año + "/" + mes, function (err) {
                        if (err) throw err;
                        console.log("Directorio " + mes + " creado correctamente dentro de " + año + "...");
                    });
                } else {
                    fs.mkdir(__dirname + "/directorios/" + año + "/" + mes + "/" + n_orden, function (err) {
                        if (err) throw err;
                        for (var i = 0; i < filesToUpload.length; i++) {
                            var file = filesToUpload[i];
                            var fileName = filesToUpload[i].name

                            file.mv(__dirname + "/directorios/" + año + "/" + mes + "/" + n_orden + "/" + fileName, function (err) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res.send("File uploaded")
                                }
                            });
                        }
                        console.log("Directorio " + n_orden + " creado correctamente dentro de " + mes + "del año " + año + "...");

                    });
                }

            }
            return res.status(200).send({
                message: "Creado con exito"
            })
        }
    }

}

module.exports = controller;



