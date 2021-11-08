import React, { Component } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import Global from '../../Global';

class SignUp extends Component {
    url = Global.url;
    salt = bcrypt.genSaltSync(10);

    constructor() {
        super();

        this.state = {
            error: "",
            name: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            repPassword: "",
            hashPassword: ""
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.buildForm = this.buildForm.bind(this);
        this.checkPasswords = this.checkPasswords.bind(this);
    }

    onChange(event) {
        if (event.target.name == "password") {
            let hash = bcrypt.hashSync(event.target.value, this.salt);

            this.setState({
                ...this.state,
                [event.target.name]: event.target.value,
                hashPassword: hash
            });
        } else {
            if (event.target.name == "repPassword") {
                this.setState({
                    ...this.state,
                    [event.target.name]: event.target.value
                });
                this.checkPasswords(event.target.value);
            } else {
                this.setState({
                    ...this.state,
                    [event.target.name]: event.target.value
                });
            }
        }
    }

    onSubmit(event) {
        event.preventDefault();
        axios.post(`${this.url}auth/signup`,
           this.buildForm()
        ).then(response => {
            if (response.data.logged_in == 'LOGGED_IN') {
                sessionStorage.setItem("token", reponse.data.token);
                this.props.handleSuccessfulAuth();
            } else {
                this.setState({
                    error: "Algun campo es incorrecto"
                });
                this.props.handleUnsuccessfulAuth();
            }
        }).catch(error => {
            this.setState({
                error: error.response.data.message
            });
            this.props.handleUnsuccessfulAuth();
        })
    }

    buildForm() {
        var formData = new FormData();

        formData.append("nombre", this.state.name);
        formData.append("apellidos", this.state.lastName);
        formData.append("email", this.state.email);
        formData.append("telefono", this.state.phone);
        formData.append("password", this.state.hashPassword);
        
        return formData;
    }

    checkPasswords(repPassword) {
        if (this.state.password.localeCompare(repPassword) != 0) {
            this.setState({
                error: "Las contraseñas no coinciden"
            });
        } else {
            this.setState({
                error: ""
            });
        }
    }

    render() {
        return (
            <div className="signup">
                <div>
                    {this.state.error}
                </div>

                <form className="form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            autoComplete="off" 
                            type="text" 
                            id="name" 
                            name="name"
                            placeholder="Nombre" 
                            value={this.state.name} 
                            onChange={this.onChange} />
                        <label htmlFor="name">Nombre</label>
                    </div>

                    <div className="form-group">
                        <input
                            autoComplete="off" 
                            type="text" 
                            id="lastName" 
                            name="lastName"
                            placeholder="Apellidos" 
                            value={this.state.lastName} 
                            onChange={this.onChange} />
                        <label htmlFor="lastName">Apellidos</label>
                    </div>

                    <div className="form-group">
                        <input
                            autoComplete="off" 
                            type="email" 
                            id="email" 
                            name="email"
                            placeholder="Email" 
                            value={this.state.email} 
                            onChange={this.onChange} />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="form-group">
                        <input
                            autoComplete="off" 
                            type="text" 
                            id="phone" 
                            name="phone"
                            placeholder="Telefono (+34)" 
                            value={this.state.phone} 
                            onChange={this.onChange} />
                        <label htmlFor="phone">Telefono</label>
                    </div>

                    <div className="form-group">
                        <input
                            autoComplete="new-password" 
                            type="password" 
                            id="password" 
                            name="password"
                            placeholder="Contraseña" 
                            value={this.state.password} 
                            onChange={this.onChange} />
                        <label htmlFor="password">Contraseña</label>
                    </div>

                    <div className="form-group">
                        <input
                            autoComplete="off" 
                            type="password" 
                            id="repPassword" 
                            name="repPassword"
                            placeholder="Repetir Contraseña" 
                            value={this.state.repPassword} 
                            onChange={this.onChange} />
                        <label htmlFor="repPassword">Repetir Contraseña</label>
                    </div>

                    <div className="spacer10"></div>

                    <div className="centered-btn-wrapper">
                        <button type="submit" className="btn"
                            disabled={this.state.error == "" ? false : true}
                        >Send</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;