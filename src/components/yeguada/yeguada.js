import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import ImageSlider from './imageSlider';
import Caballo from './caballo';

import enigma from '../../../static/assets/images/horses/Enigma.jpg';
import oxi from '../../../static/assets/images/horses/Oxi.jpg';
import jaharany from '../../../static/assets/images/horses/Jaharany.jpg';
import furia from '../../../static/assets/images/horses/Furia.jpg';

class Yeguada extends Component {
    constructor() {
        super();

        this.state = {
            horse: null
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const horses = [
            {
                _id: 0,
                title: "Enigma",
                info :{
                    raza: "Pura Raza Árabe",
                    edad: 12,
                    color: "Negro",
                    padre: "Basir",
                    madre: "Sarsiura"
                },
                image: enigma
            },
            {
                _id: 1,
                title: "Oxi",
                info :{
                    raza: "Pura Raza Árabe",
                    edad: 12,
                    color: "Negro",
                    padre: "Basir",
                    madre: "Sarsiura"
                },
                image: oxi
            },
            {
                _id: 2,
                title: "Jaharany",
                info :{
                    raza: "Pura Raza Árabe",
                    edad: 12,
                    color: "Negro",
                    padre: "Basir",
                    madre: "Sarsiura"
                },
                image: jaharany
            },
            {
                _id: 3,
                title: "Furia",
                info :{
                    raza: "Pura Raza Árabe",
                    edad: 12,
                    color: "Negro",
                    padre: "Basir",
                    madre: "Sarsiura"
                },
                image: furia
            }
        ];

        const content = [
            {
                _id: 0,
                active: true,
                component: <ImageSlider className="yeguada__slider" sliderData={horses} handleClick={this.handleClick} />
            },
            {
                _id: 1,
                active: false,
                component: <Caballo className="yeguada__caballo" handleClick={this.handleClick} />
            }
        ];

        this.props.setHorses(horses);
        this.props.setHorsesContent(content);
    }

    handleClick = (horse) => {
        var id;
        this.props.horsesContent.map(content => {
            if (!content.active) {
                id = content._id;
            }
        });
        this.props.changeActiveContent(id, horse);
    }

    renderContent() {
        let jsx;
        if (this.props.horsesContent) {
            this.props.horsesContent.map(link => {
                if (link.active) {
                    jsx = link.component;
                }
            })
        }

        return jsx;
    }


    render() {
        return (
            <div className="yeguada">
                {
                    this.renderContent()
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { horsesContent, onClick } = state.yeguada;
    return {
        horsesContent,
        onClick
    }
}

Yeguada = connect(mapStateToProps, actions)(Yeguada);

export default Yeguada;