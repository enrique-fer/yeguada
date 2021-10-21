import React, { Component } from 'react';

import Navbar from './navbar';
import PageTitle from './pageTitle';

class SkewedHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { headerInfo } = this.props;

        return (
            <div className="skewed-header">  
                <div className="skewed-header__bg" style={{backgroundImage: `url("${headerInfo.bg_image}")`}}/>

                <div className="skewed-header__content">
                    <div className="content">
                        <div className="content__dropdown dropdown">
                                <button className="dropbtn">
                                    <i className="fas fa-align-justify"></i>
                                </button>
                                
                                <div className="skewed-links">
                                    <Navbar className="skewed-links__wrapper" checkMainPage={this.props.checkMainPage} />
                                </div>
                        </div>
                    
                        <PageTitle className="content__title" title={`${headerInfo.title}`} />
                    </div>
                </div>                
            </div>
        );
    }
}
            
export default SkewedHeader;