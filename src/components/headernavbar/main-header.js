import React, { Component } from 'react';

import Navbar from './navbar';
import logo from '../../../static/assets/images/logos/caballoblanco.png';

class MainHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <div className="header__left">
                    <div className="header__logo">
                        <img src={logo} alt="Mi Logo" />
                    </div>
                </div>

                <div className="header__center">
                    <div className="brand-name">
                        Yeguada Arabians
                    </div>

                    <div className="links">
                        <Navbar className="links__wrapper" checkMainPage={this.props.checkMainPage} />
                    </div>
                </div>

                <div className="header__right">
                    <div className="header__logo">
                        <img src={logo} alt="Mi Logo" />
                    </div>
                </div>
            </div>
        );
    }
}
            
export default MainHeader;