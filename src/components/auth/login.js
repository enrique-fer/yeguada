import axios from "axios";
import React, { Component } from "react";
import bcrypt from "bcryptjs";
import Global from "../../Global";

class Login extends Component {
  url = Global.url;
  salt = bcrypt.genSaltSync(10);

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      hashPassword: "",
      error: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    if (event.target.name == "password") {
      let hash = bcrypt.hashSync(event.target.value, this.salt);

      this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
        hashPassword: hash,
      });
    } else {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
      });
    }
  }

  onSubmit(event) {
    axios
      .post(`${this.url}auth/signin`, {
        user: {
          email: this.state.email,
          password: this.state.hashPassword,
        },
      })
      .then((response) => {
        if (response.data.logged_in == "LOGGED_IN") {
          sessionStorage.setItem("token", response.data.token);
          this.props.handleSuccessfulAuth();
        } else {
          this.setState({
            error: "Correo o contraseña incorrectos",
          });
          this.props.handleUnsuccessfulAuth();
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response
            ? error.response.data.message
            : "Error al iniciar sesión",
        });
        this.props.handleUnsuccessfulAuth();
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="login">
        <div>{this.state.error}</div>

        <form className="form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              autoComplete="new-email"
              onChange={this.onChange}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              value={this.state.password}
              autoComplete="new-password"
              onChange={this.onChange}
            />
            <label htmlFor="password">Contraseña</label>
          </div>

          <div className="spacer10"></div>

          <div className="centered-btn-wrapper">
            <button type="submit" className="btn">
              Send
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
