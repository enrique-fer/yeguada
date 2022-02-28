import React, { Component } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";

import Navbar from "../headernavbar/navbar";

class Footer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="footer">
        <div className="footer__logo">
          <CloudinaryContext className="header__logo" cloudName="djkulk2kk">
            <Image publicId="fkjasdFEFsdaf18efsfFDAeTgf" alt="Mi Logo" />
          </CloudinaryContext>
        </div>

        <div className="footer__phone-days-hours contact">
          <div className="contact__hours-days">
            <div className="hours">10 AM - 6PM</div>

            <div className="days">V - S - D</div>
          </div>

          <div className="contact__phone">+34 684 14 88 36</div>
        </div>

        <div className="footer__links links">
          <Navbar
            className="links__wrapper"
            checkMainPage={this.props.checkMainPage}
          />
        </div>

        <div className="footer__social-media">
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>

          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>

          <a href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>

        <div className="footer__copyright">
          &copy; 2021 Yeguada Arabians &#124; Todos los derechos reservados
        </div>
      </div>
    );
  }
}

export default Footer;
