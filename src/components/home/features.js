import React, { Component } from "react"

import { connect } from "react-redux";
import * as actions from '../../actions';
import { Link } from "react-router-dom";

class Features extends Component {
    constructor() {
        super();
    }

    render() {
        const { className } = this.props;
        return(
            <div className={`${className} features`}>
                <div className="features__feature feature">
                    {
                        this.props.featuresCards.map(card => {
                            return (
                                <Link to={`/info#${card.title}`} className="feature__column column" key={card._id}>
                                    <i className={`${card.icon} column__icon`}></i>
                
                                    <div className="column__title">
                                        <p>{card.title}</p>
                                    </div>
                    
                                    <div className="column__content">
                                        {card.description}
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { featuresCards } = state.home;
    return {
        featuresCards
    }
}

Features = connect(mapStateToProps, actions)(Features);

export default Features;