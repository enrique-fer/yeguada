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
  }

  render() {
    return (
      <Layout />
    );
  }
}

App = connect(null, actions)(App);

export default App;