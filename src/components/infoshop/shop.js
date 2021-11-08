import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router';
import axios from 'axios';
import Global from '../../Global';

import Calendar from 'react-calendar';

class Shop extends Component {
    url = Global.url;
    horas = new Map([
        ['09:00', 9],
        ['09:30', 9.5],
        ['10:00', 10],
        ['10:30', 10.5],
        ['11:00', 11],
        ['11:30', 11.5],
        ['12:00', 12],
        ['12:30', 12.5],
        ['13:00', 13],
        ['13:30', 13.5]
    ])

    constructor(props) {
        super(props);

        this.state = {
            item: {
            },
            date: null,
            start: '',
            end: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.addHour = this.addHour.bind(this);
    }

    componentDidMount() {
        window.scroll({top: 0});
        if (this.props.featuresCards.length === 0) {
            axios.get(`${this.url}actividad`)
            .then(res => {
                var features = res.data.actividades;
                this.props.setFeaturesCards(features);

                const { id } = this.props.location.state;
                const item = features.find(item => item._id === (id ? id : 0));

                this.props.loadHeaderImage(this.props.headers, window.location.pathname);
                this.props.fetchDates();

                if(item != null) {
                    this.setState({
                        item
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            const { id } = this.props.location.state;
            const item = this.props.featuresCards.find(item => item._id === (id ? id : 0));

            this.props.loadHeaderImage(this.props.headers, window.location.pathname);
            this.props.fetchDates();

            if(item != null) {
                this.setState({
                    item
                });
            }
        }
    }

    onChange(value) {
        this.setState({
            date: value 
        })
    }

    onClick() {
        this.props.addDate(this.state.item.title, this.state.date);
    }

    addHour(value) {
        var hours = value.split(':');
        var date = this.state.date;
        var end = `${parseInt(hours[0], 10) + Math.floor(this.state.item.duration)}`;

        if (this.state.item.duration % 2 != 0) {
            if (hours[1] === ':30') {
                end += `:00`;
            } else {
                end += `:30`
            }
        } else {
            if (hours[1] === '30') {
                end += `:30`;
            } else {
                end += `:00`
            }
        }

        date.setHours(hours[0], hours[1]);

        this.setState({
            date: date,
            start: value,
            end: end
        })
    }

    render() {
        const d = new Date();
        const hours = Array.from(this.horas.keys());
        return (
            <div className='shop'>
                <div className='title'>
                    Reserva día para { this.state.item.title }
                </div>

                <div className="fecha">
                    <div className="reserva">
                        <div className='calendario'>
                            <Calendar
                                onChange={this.onChange}
                                minDate={ new Date(d.getFullYear(), d.getMonth(), 1)}
                                tileClassName={({date}) => {
                                    var clas = "";
                                    var exist = false;

                                    this.props.dates.map(actvDate => {
                                        if (date.getDate() === actvDate.fecha.getDate() &
                                        (date.getMonth() + 1) === (actvDate.fecha.getMonth() + 1) &
                                        date.getFullYear() === actvDate.fecha.getFullYear()) {
                                            exist = true;
                                        }
                                    })

                                    if (exist) {
                                        clas = "day-red";
                                    } 
                                    
                                    return clas;
                                }} 
                                tileDisabled={ ({date, view}) => {
                                        var dis = false;
                                        if (view == 'month') {
                                            if (date.getDate() <= d.getDate() &
                                            (date.getMonth() +1) <= (d.getMonth() + 1) &
                                            date.getFullYear() <= d.getFullYear()) {
                                                dis = true;
                                            }
                                        } else {
                                            if (view == 'year') {
                                                if ((date.getMonth() +1) < (d.getMonth() + 1) &
                                                date.getFullYear() <= d.getFullYear()) {
                                                    dis = true;
                                                }
                                            }
                                        }


                                        return dis;
                                    }
                                }
                                value={this.state.date} />
                        </div>

                        <div className="horas">
                            {
                                this.state.date ? (
                                    hours.map((hora, index) => {
                                        return (
                                            <div className={
                                                    this.horas.get(hora) <= this.horas.get(this.state.end) && this.horas.get(hora) >= this.horas.get(this.state.start) ?
                                                    'hora seleccion' : 'hora'
                                                } key={index} onClick={() => {this.addHour(hora)}}>
                                                {hora}
                                            </div>
                                        )
                                    })
                                ) : ''
                            }
                        </div>
                    </div>

                    <div className='texto'>
                        <button type="button" className="btn" onClick={this.onClick}>Reservar</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { featuresCards } = state.home;
    const { headers } = state.navbar;
    const { dates } = state.shop;
    return {
        featuresCards,
        headers,
        dates
    }
}

Shop = connect(mapStateToProps, actions)(Shop);

export default withRouter(Shop);