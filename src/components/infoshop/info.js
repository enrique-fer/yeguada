import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../actions";

import Global from "../../Global";

import SquareCard from "./squareCard";

class Info extends Component {
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

    this.props.loadHeaderImage(this.props.headers, window.location.pathname);
  }

  render() {
    return (
      <div className="info">
        {this.props.featuresCards.map((card, index) => {
          return (
            <SquareCard
              className="info__card"
              card={card}
              key={card._id}
              index={index}
            />
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { featuresCards } = state.home;
  const { headers } = state.navbar;
  return {
    featuresCards,
    headers,
  };
}

Info = connect(mapStateToProps, actions)(Info);

export default Info;
