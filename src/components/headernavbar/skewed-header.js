import React, { Component } from "react";

import Navbar from "./navbar";
import PageTitle from "./pageTitle";
import Global from "../../Global";

class SkewedHeader extends Component {
  url = Global.url;

  constructor(props) {
    super(props);
  }

  render() {
    const { headerInfo } = this.props;

    return (
      <div className="skewed-header">
        <div
          className="skewed-header__bg"
          style={{
            backgroundImage: `url("https://res.cloudinary.com/djkulk2kk/image/upload/${headerInfo.bg_image}")`,
          }}
        />

        <div className="skewed-header__content">
          <div className="content">
            <div className="content__dropdown dropdown">
              <button className="dropbtn">
                <i className="fas fa-align-justify"></i>
              </button>

              <div className="skewed-links">
                <Navbar
                  className="skewed-links__wrapper"
                  checkMainPage={this.props.checkMainPage}
                />
              </div>
            </div>

            <PageTitle
              className="content__title"
              title={`${headerInfo.title}`}
            />
          </div>
        </div>

        {this.props.isLoggedIn === "LOGGED_IN" ? (
          <div
            className="skewed-header__logout"
            onClick={() => this.props.handleLogOut()}
          >
            Cerrar Sesión <i className="fas fa-sign-out-alt"></i>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default SkewedHeader;
