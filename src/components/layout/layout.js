import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../history';
import axios from 'axios';

import Home from '../home/home';
import MainHeader from '../headernavbar/main-header';
import SkewedHeader from '../headernavbar/skewed-header';
import Footer from '../footer/footer';

import Yeguada from '../yeguada/yeguada';
import Info from '../infoshop/info';
import Shop from '../infoshop/shop';
import Contacto from '../contacto/contacto';
import Auth from '../auth/auth';

import Global from '../../Global';
import ErrorPage from '../error';

class Layout extends Component {
    url = Global.dev_url;

    constructor(props) {
      super(props);

      this.state = {
          loggedStatus: "NOT_LOGGED_IN",
          isMainPage: true,
          skHeader: {
              title: "",
              bg_image: null
          }
      }

      this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
      this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
      this.handleLogOut = this.handleLogOut.bind(this);
      this.checkMainPage = this.checkMainPage.bind(this);
      this.loadHeaderImage = this.loadHeaderImage.bind(this);
    }

    componentDidMount() {
      this.checkAuthentication();
      this.loadHeaderImage(this.props.headers, window.location.pathname);
    }

    handleSuccessfulLogin() {
      this.setState({
        loggedStatus: "LOGGED_IN"
      })
    }

    handleUnsuccessfulLogin() {
      this.setState({
        loggedStatus: "NOT_LOGGED_IN"
      })
    }

    handleLogOut() {
      this.setState({
        loggedStatus: "NOT_LOGGED_IN"
      })
      sessionStorage.clear();
    }

    checkAuthentication() {
      axios.get(`${this.url}auth`, {
        headers: {
          authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      .then(response => {
        if (response.data.logged_in === 'LOGGED_IN') {
          this.handleSuccessfulLogin();
        }
      })
      .catch(error => {
        this.handleUnsuccessfulLogin();
      })
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

    authorizedPages() {
      return [
        <Route 
          path='/reserva'
          key="reserva" >
          <Shop loadHeaderImage={this.loadHeaderImage} />
        </Route>
      ];
    }

    render() {
      return (
        <div className="layout">
          {
            this.state.isMainPage ? 
            <MainHeader checkMainPage={this.checkMainPage} /> : 
            <SkewedHeader checkMainPage={this.checkMainPage} 
                          headerInfo={this.state.skHeader} 
                          isLoggedIn={this.state.loggedStatus} 
                          handleLogOut={this.handleLogOut}
            />
          }

          <Router history={history}>
            <Switch>
              <Route path='/' exact>
                <Home loadHeaderImage={this.loadHeaderImage} />
              </Route>

              <Route path='/auth'>
                <Auth
                  loadHeaderImage={this.loadHeaderImage} 
                  handleSuccessfulLogin={this.handleSuccessfulLogin}
                  handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                />
              </Route>

              <Route path='/yeguada' component={Yeguada} />
              <Route path='/info'>
                <Info loadHeaderImage={this.loadHeaderImage} />
              </Route>
              <Route path='/contacto' component={Contacto} />

              {
                this.state.loggedStatus === 'NOT_LOGGED_IN' ? 
                (
                  <Redirect from='/reserva' to='/auth' /> 
                ) : (
                  this.authorizedPages()
                )
              }

              <Route path="**" component={ErrorPage} />
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