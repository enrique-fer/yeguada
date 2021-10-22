import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SquareCard extends Component {
    constructor() {
        super();
    }

    render() {
        const { className, card } = this.props;
        return (    
            card._id % 2 === 0 ? (
                <Link to={{
                    pathname: '/reserva', 
                    state: {id: card._id}
                 }} className={`${className} square-card`} key={card._id} >
                    <div className="square-card__image">
                        <p name={card.title} className="anchor-link">
                            <img src={card.image} alt="Horse" />
                        </p>
                    </div>

                    <div className="square-card__content">
                        <h1>{card.title}</h1>
                        
                        <ul>
                            {
                                card.content.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </Link>
            ) :  ( 
                <Link to={{
                    pathname: '/shop', 
                    state: {id: card._id}
                 }} className={`${className} square-card`} key={card._id} >
                    <div className="square-card__content">
                        <h1>{card.title}</h1>
                        
                        <ul>
                            {
                                card.content.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <div className="square-card__image">
                        <p name={card.title} className="anchor-link">
                            <img src={card.image} alt="Horse" />
                        </p>
                    </div>
                </Link>
            )
        )
    }
}

export default SquareCard;
