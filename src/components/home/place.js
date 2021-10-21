import React, { Component } from "react"

class Place extends Component {
    constructor() {
        super();
    }

    render() {
        const { className } = this.props;
        return(
            <div className={`${className} place`}>
                <div className="place__left">
                    <div className="place__left__top">
                        Situación inmejorable
                    </div>
                </div>

                <div className="place__right">
                    <div className="place__right__top">
                        Pura Raza Árabe
                    </div>
                </div>
            </div>
        );
    }
}

export default Place;