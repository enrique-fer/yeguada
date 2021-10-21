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
      if ((!this.state.isMainPage && link.path === '/') ||
          (this.state.isMainPage && link.path === '/')){
        this.setState({
          isMainPage: true,
          skHeader: {
            title: "",
            bg_image: null
          }
        });
      } else {
        this.setState({
          isMainPage: false,
          skHeader: {
            title: link.title,
            bg_image: link.bg_image
          }
        });
      }
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
                    <Route path='/shop'>
                        <Shop loadHeaderImage={this.loadHeaderImage} />
                    </Route>
                    {/* Other routes */}
                </Switch>
            </Router>

            <Footer />
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