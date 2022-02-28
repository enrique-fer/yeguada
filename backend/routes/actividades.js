"use strict";

var express = require("express");
var ActividadController = require("../controllers/actividad");

var router = express.Router();

//Rutas
router.get("/", ActividadController.getActividades);
router.get("/:id", ActividadController.getActividad);
router.post("/save", ActividadController.save);
router.post("/upload-image/:id", ActividadController.upload);
router.put("/update/:id", ActividadController.update);
router.delete("/delete/:id", ActividadController.delete);

module.exports = router;
