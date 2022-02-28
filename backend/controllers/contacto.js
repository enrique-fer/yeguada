"use strict";

var validator = require("validator");
var nodemailer = require("nodemailer");

var controller = {
  send: (req, res) => {
    var message = req.body.message;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "login",
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    var mailMessage = {};
    var mailOptions = {};

    try {
      var validate_name = !validator.isEmpty(message.name);
      var validate_email = !validator.isEmpty(message.email);
      var validate_text = !validator.isEmpty(message.text);
    } catch (err) {
      return res.status(200).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    if (validate_name && validate_email && validate_text) {
      mailMessage = `${message.name} (${message.email}) te ha enviado un mensaje.\n\n
      ${message.text}`;

      mailOptions = {
        from: process.env.GMAIL,
        to: process.env.GMAIL,
        subject: "Nuevo Mensaje",
        text: mailMessage,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(200).send({
            status: "error",
          });
        } else {
          return res.status(200).send({
            status: "succes",
          });
        }
      });
    } else {
      return res.status(500).send({
        status: "error",
        message: "Los datos no son validos",
      });
    }
  },
};

module.exports = controller;
