import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Layout from './layout/layout';

import horseBg from '../../static/assets/images/backgrounds/horse-bg.jpg';
import leafs from '../../static/assets/images/backgrounds/leafs-bg.jpg';
import dotHorse from '../../static/assets/images/backgrounds/dot-horse-bg.jpg';
import tree from '../../static/assets/images/backgrounds/tree2-bg.jpg';

import horseRiding from '../../static/assets/images/squares/horseRiding-sq.jpg';
import littleHorse from '../../static/assets/images/squares/littleHorse-sq.jpg';
import smallHorse from '../../static/assets/images/squares/smallHorse-sq.jpg';
import teachingHorseRiding from '../../static/assets/images/squares/teachingHorseRiding-sq.jpg';

class App extends Component {
    constructor(props) {
        super(props);
    }

  componentDidMount() {
    const navbarLinks = [
        {
            _id: 0,
            title: 'Inicio',
            path: '/'
        },
        {
            _id: 1,
            title: 'Yeguada',
            path: '/yeguada',
            bg_image: horseBg
        },
        {
            _id: 2,
            title: 'Información',
            path: '/info',
            bg_image: leafs
        },
        {
            _id: 3,
            title: 'Contacto',
            path: '/contacto',
            bg_image: dotHorse
        },
        {
            _id: 4,
            title: 'Sign in',
            path: '/signin',
            bg_image: tree
        }
    ];

    const headers = [
      {
          _id: 0,
          title: 'Inicio',
          path: '/'
      },
      {
          _id: 1,
          title: 'Yeguada',
          path: '/yeguada',
          bg_image: horseBg
      },
      {
          _id: 2,
          title: 'Información',
          path: '/info',
          bg_image: leafs
      },
      {
          _id: 3,
          title: 'Contacto',
          path: '/contacto',
          bg_image: dotHorse
      },
      {
          _id: 4,
          title: 'Sign in',
          path: '/signin',
          bg_image: tree
      },
      {
          _id: 5,
          title: 'Reserva',
          path: '/shop',
          bg_image: tree
      }
    ];

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
    this.props.setNavbarLinks(navbarLinks);
    this.props.setLinks(headers);
  }

  render() {
    return (
      <Layout />
    );
  }
}

App = connect(null, actions)(App);

export default App;