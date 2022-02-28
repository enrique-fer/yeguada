"use strict";

var express = require("express");
var ReservaController = require("../controllers/reserva");

var router = express.Router();

router.get("/", ReservaController.getReservas);
router.get("/usuario/:id", ReservaController.getReservasUsuario);
router.get("/:id", ReservaController.getReserva);
router.post("/save", ReservaController.save);
router.delete("/delete/:id", ReservaController.delete);

module.exports = router;
