import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';

import SquareCard from './squareCard';

class Info extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadHeaderImage(this.props.headers, window.location.pathname);
    }

    render() {
        return (
            <div className="info">
                {
                    this.props.featuresCards.map(card => {
                        return (
                            <SquareCard className="info__card" card={card} key={card._id}/>
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { featuresCards } = state.home;
    const { headers } = state.navbar;
    return {
        featuresCards,
        headers
    }
}

Info = connect(mapStateToProps, actions)(Info);

export default Info;