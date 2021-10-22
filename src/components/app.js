import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import axios from 'axios';

import Layout from './layout/layout';
import Global from '../Global';

import horseRiding from '../../static/assets/images/squares/horseRiding-sq.jpg';
import littleHorse from '../../static/assets/images/squares/littleHorse-sq.jpg';
import smallHorse from '../../static/assets/images/squares/smallHorse-sq.jpg';
import teachingHorseRiding from '../../static/assets/images/squares/teachingHorseRiding-sq.jpg';

class App extends Component {
    url = Global.url;
    constructor(props) {
        super(props);
    }

  componentDidMount() {
    axios.get(`${this.url}cabecera`)
        .then(res => {
            var cabeceras = res.data.cabeceras;
            this.props.setLinks(cabeceras);

            var links = cabeceras.slice(0, 5);
            this.props.setNavbarLinks(links);
        })
        .catch(err => {
            console.log(err);
        });

    const featuresCards = [
      {
          _id: 0,
          title: "Cubriciones",
          content: [
              "Lorem ipsum dolor sit amet.",
              "Lorem ipsum dolor sit amet consectetur."
          ],
          description: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
          icon: "fas fa-horse-head",
          image: smallHorse
      },
      {
          _id: 1,
          title: "Clases",
          content: [
              "Lorem ipsum dolor sit amet.",
              "Lorem ipsum dolor sit amet consectetur."
          ],
          description: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
          icon: "fas fa-graduation-cap",
          image: horseRiding
      },
      {
          _id: 2,
          title: "Rutas",
          content: [
              "Lorem ipsum dolor sit amet.",
              "Lorem ipsum dolor sit amet consectetur."
          ],
          description: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
          icon: "fas fa-mountain",
          image: teachingHorseRiding
      },
      {
          _id: 3,
          title: "Cria",
          content: [
              "Lorem ipsum dolor sit amet.",
              "Lorem ipsum dolor sit amet consectetur."
          ],
          description: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
          icon: "fas fa-horse-head",
          image: littleHorse
      },
      {
          _id: 4,
          title: "Pupilaje",
          content: [
              "Lorem ipsum dolor sit amet.",
              "Lorem ipsum dolor sit amet consectetur."
          ],
          description: " Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
          icon: "fas fa-home",
          image: littleHorse
      }
    ];

    this.props.setFeaturesCards(featuresCards);
  }

  render() {
    return (
      <Layout />
    );
  }
}

App = connect(null, actions)(App);

export default App;