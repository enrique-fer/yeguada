import React, { Component } from 'react';

import { connect } from 'react-redux';

export class Caballo extends Component {
    constructor() {
        super();
    }

    render() {
        const { className, horse, handleClick } = this.props;
        return (
            <div className={`${className} caballo`}>
                <div className="caballo__image">
                    <img src={horse.image} />
                </div>

                <div className="caballo__info">
                    <div className="name">
                        <h1>{horse.title}</h1>
                    </div>

                    <div className="ethnic">
                        <span>Raza</span> {horse.info.raza}
                    </div>

                    <div className="color">
                        <span>Pelaje</span> {horse.info.color}
                    </div>

                    <div className="age">
                        <span>Edad</span> {horse.info.edad} años
                    </div>

                    <div className="parents">
                        <div className="parents__mother">
                            <span>Madre</span> {horse.info.madre}
                        </div>

                        <div className="parents__father">
                            <span>Padre</span> {horse.info.padre}
                        </div>
                    </div>
                </div>

                <div className="caballo__back" onClick={handleClick}>
                    <i className="fas fa-arrow-left" title="volver"></i>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { horse } = state.yeguada;
    return {
        horse
    }
}

Caballo = connect(mapStateToProps)(Caballo);

export default Caballo;