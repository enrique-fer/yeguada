"use strict";

var express = require("express");
var CaballoController = require("../controllers/caballo");

var router = express.Router();

//Rutas
router.get("/", CaballoController.getCaballos);
router.get("/:id", CaballoController.getCaballo);
router.post("/save", CaballoController.save);
router.post("/upload-image/:id", CaballoController.upload);
router.put("/update/:id", CaballoController.update);
router.delete("/delete/:id", CaballoController.delete);

module.exports = router;
