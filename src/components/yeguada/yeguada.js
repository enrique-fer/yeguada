import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';

import Global from '../../Global';

import ImageSlider from './imageSlider';
import Caballo from './caballo';

class Yeguada extends Component {
    url = Global.url;

    constructor() {
        super();

        this.state = {
            horse: null
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        window.scroll({top: 0});
        axios.get(`${this.url}caballo`)
            .then(res => {
                const horses = res.data.caballos;
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
            })
            .catch(err => {
                console.log(err);
            })
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