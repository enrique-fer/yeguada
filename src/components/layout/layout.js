import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../history';

import Home from '../home/home';
import MainHeader from '../headernavbar/main-header';
import SkewedHeader from '../headernavbar/skewed-header';
import Footer from '../footer/footer';

import Yeguada from '../yeguada/yeguada';
import Info from '../infoshop/info';
import Shop from '../infoshop/shop';
import Contacto from '../contacto/contacto';

class Layout extends Component {
    constructor() {
      super();

      this.state = {
          isMainPage: true,
          skHeader: {
              title: "",
              bg_image: null
          }
      }

      this.checkMainPage = this.checkMainPage.bind(this);
      this.loadHeaderImage = this.loadHeaderImage.bind(this);
    }

    componentDidMount() {
      this.loadHeaderImage(this.props.headers, window.location.pathname);
    }

    shouldComponentUpdate(nextProps) {
      if (this.props.headers.length != nextProps.headers.length) {
        this.loadHeaderImage(nextProps.headers, window.location.pathname);
      }
      return true;
    }

    loadHeaderImage(links, path) {
      links.forEach(link => {
        if (link.path === path) {
          this.checkMainPage(link);
        }
      });
    }
    
    checkMainPage(link) {
      this.setState({
        isMainPage: link.isMainPage,
        skHeader: {
          title: link.title,
          bg_image: link.bg_image
        }
      });
    }

    render() {
      return (
          <div className="layout">
            {
                this.state.isMainPage ? 
                <MainHeader checkMainPage={this.checkMainPage} /> : 
                <SkewedHeader checkMainPage={this.checkMainPage} headerInfo={this.state.skHeader} />
            }

            <Router history={history}>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/yeguada' component={Yeguada} />
                    <Route path='/info'>
                      <Info loadHeaderImage={this.loadHeaderImage} />
                    </Route>
                    <Route path='/reserva'>
                        <Shop loadHeaderImage={this.loadHeaderImage} />
                    </Route>
                    <Route path='/contacto' component={Contacto} />
                    {/* Other routes */}
                </Switch>
            </Router>

            <Footer checkMainPage={this.checkMainPage}/>
          </div>
      );
    }
}

function mapStateToProps(state) {
  const { headers } = state.navbar;
  return { headers };
}

Layout = connect(mapStateToProps)(Layout);

export default Layout;