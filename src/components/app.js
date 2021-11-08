import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import axios from 'axios';

import Layout from './layout/layout';
import Global from '../Global';

class App extends Component {
    url = Global.dev_url;
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