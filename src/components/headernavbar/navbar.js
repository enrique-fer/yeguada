import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import history from '../../history';

class Navbar extends Component {
    constructor() {
        super();
    }

    render() {
        const { className } = this.props;

        return (
            <div className={`${className} navbar`}>
                {
                    this.props.navbarLinks.map(link => {
                        return (
                            <a className="navbar__link" key={link._id} 
                                onClick={() => { 
                                    this.props.checkMainPage(link);
                                    history.push(link.path) ;
                                }
                            }>
                                {link.title}
                            </a>
                        )
                    })
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { navbarLinks } = state.navbar;
    return {
        navbarLinks
    }
}

Navbar = connect(mapStateToProps, actions)(Navbar);

export default Navbar;