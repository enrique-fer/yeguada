import axios from "axios";
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { CloudinaryContext, Image } from "cloudinary-react";

import Global from "../../Global";

class Contacto extends Component {
  url = Global.url;

  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      message: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    window.scroll({ top: 0 });
  }

  onChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { name, email, message } = this.state;
    axios
      .post(`${this.url}contacto/sendmessage`, {
        message: {
          name: name,
          email: email,
          text: message,
        },
      })
      .then((response) => {
        if (response.data.status === "succes") {
          alert("El correo se envio correctamente");
          this.setState({
            name: "",
            email: "",
            message: "",
          });
        } else {
          alert("Se ha producido un error, vuelve a intentarlo más tarde");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="page-container">
        <div className="contact-grid-wrapper">
          <div className="company-metadata-sidebar-wrapper">
            <div className="logo">
              <CloudinaryContext className="header__logo" cloudName="djkulk2kk">
                <Image publicId="fkjasdFEFsdaf18efsfFDAeTgf" alt="Mi Logo" />
              </CloudinaryContext>
            </div>

            <div className="company-details-wrapper">
              <i className="fas fa-map-marker-alt"></i>

              <div>
                Barrio 16
                <br />
                39210 Barrio, Cantabria
              </div>
            </div>

            <div className="company-details-wrapper">
              <i className="fas fa-phone-volume"></i>

              <div>+34 684 14 88 36</div>
            </div>

            <div className="company-details-wrapper">
              <i className="far fa-clock"></i>

              <div>
                10 AM - 6PM
                <br />V - S - D
              </div>
            </div>
          </div>

          <form className="form" onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                autoComplete="off"
                type="text"
                id="fullName"
                name="name"
                placeholder="Nombre"
                value={this.state.name}
                onChange={this.onChange}
              />
              <label htmlFor="fullName">Nombre</label>
            </div>

            <div className="form-group">
              <input
                autoComplete="off"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChange}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-group">
              <textarea
                name="message"
                id="message"
                placeholder="Mensaje"
                value={this.state.message}
                onChange={this.onChange}
              ></textarea>
              <label htmlFor="message">Mensaje</label>
            </div>

            <div className="spacer10"></div>

            <div className="centered-btn-wrapper">
              <button type="submit" className="btn">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Contacto = reduxForm({
  form: "Contacto",
})(Contacto);

export default Contacto;
