"use strict";

var validator = require("validator");
var nodemailer = require("nodemailer");
var Reserva = require("../models/reserva");
var Usuario = require("../models/usuario");
var Actividad = require("../models/actividad");

var controller = {
  getReservas: (req, res) => {
    Reserva.find({})
      .sort("_id")
      .exec((err, reservas) => {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error al devolver los reservas",
          });
        }

        if (!reservas) {
          return res.status(400).send({
            status: "error",
            message: "No hay reservas que mostrar",
          });
        }

        return res.status(200).send({
          status: "succes",
          reservas,
        });
      });
  },
  getReservasUsuario: (req, res) => {
    var id = req.params.id;

    Reserva.find(
      {
        user_id: id,
      },
      (error, reservas) => {
        if (error) {
          return res.status(500).send({
            status: "error",
            message: "Se ha producido un error en la busqueda",
          });
        }

        if (reservas.length == 0) {
          return res.status(404).send({
            status: "error",
            message: "No existen reservas",
          });
        }

        return res.status(200).send({
          status: "success",
          reservas,
        });
      }
    );
  },
  getReserva: (req, res) => {
    var reservaId = req.params.id;

    if (!reservaId || reservaId == null) {
      return res.status(404).send({
        status: "error",
        message: "No existe la cabecera",
      });
    }

    Reserva.findById(reservaId, (err, reserva) => {
      if (err || !reserva) {
        return res.status(404).send({
          status: "error",
          message: "No existe la reserva",
        });
      }

      return res.status(200).send({
        status: "succes",
        reserva: reserva,
      });
    });
  },
  save: (req, res) => {
    var params = req.body;

    try {
      var validate_activity_id = !validator.isEmpty(params.activity_id);
      var validate_date = !validator.isEmpty(params.date.toString());
      var validate_start = !validator.isEmpty(params.start);
      var validate_end = !validator.isEmpty(params.end);
      var validate_user_id = !validator.isEmpty(params.user_id);
    } catch (err) {
      return res.status(200).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    if (
      validate_activity_id &&
      validate_date &&
      validate_start &&
      validate_end &&
      validate_user_id
    ) {
      var reserva = new Reserva();

      reserva.activity_id = params.activity_id;
      reserva.date = params.date;
      reserva.start = params.start;
      reserva.end = params.end;
      reserva.user_id = params.user_id;

      var usuario = {},
        actividad = {};
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "login",
          user: process.env.GMAIL,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
      var message = {};
      var mailOptions = {};

      Usuario.findById(params.user_id).then((user) => {
        usuario = user;
        Actividad.findById(params.activity_id).then((activity) => {
          actividad = activity;
          reserva.save((error, reservaStored) => {
            if (error || !reservaStored) {
              return res.status(404).send({
                status: "error",
                message: "La reserva no se ha guardado",
              });
            }

            message = `${usuario.nombre} ${
              usuario.apellidos
            } a creado una reserva para ${actividad.title}, el ${
              reservaStored.date.getUTCDate() + 1
            }/${
              reservaStored.date.getMonth() + 1
            }/${reservaStored.date.getFullYear()}, a las ${params.start}`;

            mailOptions = {
              from: process.env.GMAIL,
              to: process.env.GMAIL,
              subject: "Nueva Reserva",
              text: message,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email enviado: " + info.response);
              }
            });

            message = `Tienes una reserva para ${activity.title}, el ${
              reservaStored.date.getUTCDate() + 1
            }/${
              reservaStored.date.getMonth() + 1
            }/${reservaStored.date.getFullYear()}, a las ${params.start}`;

            mailOptions = {
              from: process.env.GMAIL,
              to: usuario.email,
              subject: "Nueva Reserva",
              text: message,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email enviado: " + info.response);
              }
            });

            return res.status(200).send({
              status: "succes",
              reserva: reservaStored,
            });
          });
        });
      });
    } else {
      return res.status(500).send({
        status: "error",
        message: "Los datos no son validos",
      });
    }
  },
  delete: (req, res) => {
    var reservaId = req.params.id;

    Reserva.findOneAndDelete({ _id: reservaId }, (err, resRemoved) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al borrar",
        });
      }

      if (!resRemoved) {
        return res.status(404).send({
          status: "error",
          message: "No se ha borrado, posiblemente no exista",
        });
      }

      return res.status(200).send({
        status: "success",
        reserva: resRemoved,
      });
    });
  },
};

module.exports = controller;
