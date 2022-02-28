import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../actions";

import Place from "./place";
import Features from "./features";
import Global from "../../Global";

class Home extends Component {
  url = Global.url;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scroll({ top: 0 });
    axios
      .get(`${this.url}actividad`)
      .then((res) => {
        var features = res.data.actividades;
        this.props.setFeaturesCards(features);
      })
      .catch((err) => {
        console.log(err);
      });

    this.props.loadHeaderImage(
      this.props.navbarLinks,
      window.location.pathname
    );
  }

  render() {
    return (
      <div className="home">
        <Place className="home__place" />

        <Features className="home__features" />

        <div className="home__map location">
          <iframe
            className="location__map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5926589193955!2d-4.232743184292201!3d43.008296701908854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd48e4b2609bd2ad%3A0xa3f5223a6c8dadca!2s39210%20Barrio%2C%20Cantabria!5e1!3m2!1ses!2ses!4v1587379947914!5m2!1ses!2ses"
            width="100%"
            height="450"
            frameBorder="0"
            style={{ border: "0" }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>

          <div className="location__data">
            <div className="location__data__icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>

            <div className="location__data__info">
              Barrio 16
              <br />
              39210 Barrio, Cantabria
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { navbarLinks } = state.navbar;
  return {
    navbarLinks,
  };
}

Home = connect(mapStateToProps, actions)(Home);

export default Home;
