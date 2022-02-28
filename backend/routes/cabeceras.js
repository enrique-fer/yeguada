"use strict";

var express = require("express");
var CabeceraController = require("../controllers/cabecera");

var router = express.Router();

router.get("/", CabeceraController.getCabeceras);
router.get("/:id", CabeceraController.getCabecera);
router.post("/save", CabeceraController.save);
router.post("/upload-image/:id", CabeceraController.upload);
router.delete("/delete/:id", CabeceraController.delete);

module.exports = router;
