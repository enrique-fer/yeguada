import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../../history";

import Login from "./login";
import SignUp from "./signUp";

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authLinks: [
        {
          _id: 0,
          title: "Login",
          active: true,
        },
        {
          _id: 1,
          title: "Registro",
          active: false,
        },
      ],
    };

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    window.scroll({ top: 0 });
    this.props.loadHeaderImage(this.props.headers, window.location.pathname);
  }

  handleSuccessfulAuth() {
    this.props.handleSuccessfulLogin();
    history.push("/");
  }

  handleUnsuccessfulAuth() {
    this.props.handleUnsuccessfulLogin();
  }

  onClick(id) {
    var links = this.state.authLinks;
    links.forEach((link) => {
      if (link._id == id) {
        link.active = true;
      } else {
        link.active = false;
      }
    });

    this.setState({
      authLinks: links,
    });
  }

  render() {
    return (
      <div className="auth">
        <div className="auth__nav">
          {this.state.authLinks.map((link) => {
            return (
              <div
                className={`auth-link ${link.active ? "active" : ""}`}
                key={link._id}
                onClick={() => {
                  this.onClick(link._id);
                }}
              >
                <p>{link.title}</p>
              </div>
            );
          })}
        </div>
        {this.state.authLinks[0].active ? (
          <Login
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
          />
        ) : (
          ""
        )}

        {this.state.authLinks[1].active ? (
          <SignUp
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { headers } = state.navbar;
  return {
    headers,
  };
}

Auth = connect(mapStateToProps, null)(Auth);

export default Auth;
