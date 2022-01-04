import React, { Component } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';

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
                    <CloudinaryContext className="header__logo" cloudName="djkulk2kk">
                        <Image publicId="fkjasdFEFsdaf18efsfFDAeTgf" alt="Mi Logo" />
                    </CloudinaryContext>
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
                <CloudinaryContext className="header__logo sLogo" cloudName="djkulk2kk">
                        <Image publicId="fkjasdFEFsdaf18efsfFDAeTgf" alt="Mi Logo" />
                    </CloudinaryContext>
                </div>
            </div>
        );
    }
}
            
export default MainHeader;