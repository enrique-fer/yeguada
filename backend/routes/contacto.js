"use strict";

var express = require("express");
var ContactoController = require("../controllers/contacto");

var router = express.Router();

//Rutas
router.post("/sendmessage", ContactoController.send);

module.exports = router;
