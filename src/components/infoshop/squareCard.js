import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Global from '../../Global';

class SquareCard extends Component {
    url = Global.url;

    constructor() {
        super();
    }

    render() {
        const { className, card, index } = this.props;
        
        return (    
            index % 2 === 0 ? (
                <Link to={{
                    pathname: '/reserva', 
                    state: {id: card._id}
                 }} className={`${className} square-card`} key={card._id} >
                    <div className="square-card__image">
                        <p name={card.title} className="anchor-link">
                            {
                                card.image ? 
                                    <img src={`${this.url}actividad/get-image/${card.image}`} alt={card.title} /> :
                                    <img src={`http://via.placeholder.com/500`} alt={card.title} title="No hay foto para la actividad" />
                            }
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
                    pathname: '/reserva', 
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
                            {
                                card.image ? 
                                    <img src={`${this.url}actividad/get-image/${card.image}`} alt={card.title} /> :
                                    <img src={`http://via.placeholder.com/500`} alt={card.title} title="No hay foto para el caballo" />
                            }
                        </p>
                    </div>
                </Link>
            )
        )
    }
}

export default SquareCard;
