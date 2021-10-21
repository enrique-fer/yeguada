import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router';

import Calendar from 'react-calendar';

class Shop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: {},
            date: new Date(),
        }

        this.onChange = this.onChange.bind(this);
        this.loadData = this.loadData.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.location.state;
        const item = this.props.featuresCards.find(item => item._id === (id ? id : 0));

        this.props.loadHeaderImage(this.props.headers, window.location.pathname);
        this.props.fetchDates();
        this.setState({
            item
        });
    }

    loadData(props, state) {
        const { id } = props.location.state;
        const item = props.featuresCards.find(item => item._id === (id ? id : 0));

        this.props.loadHeaderImage(props.headers, window.location.pathname);

        state.item = item;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.item != nextState.item) {
            this.loadData(nextProps, nextState);
        }

        return true;
    }

    onChange(value) {
        console.log(value.getDate());
        console.log(new Date(`${value.getFullYear()}/${value.getMonth() + 1}/${value.getDate()}`));
        this.setState({
            date: value
        })
    }

    onClick() {
        this.props.addDate(this.state.item.title, this.state.date);
    }

    render() {
        const d = new Date();
        return (
            <div className='shop'>
                <div className='title'>
                    Reserva día para { this.state.item.title }
                </div>

                <div className="fecha">
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
                                    if (date.getDate() <= d.getDate() &
                                    (date.getMonth() +1) <= (d.getMonth() + 1) &
                                    date.getFullYear() <= d.getFullYear()) {
                                        dis = true;
                                    }

                                    return dis;
                                }
                            }
                            value={this.state.date} />
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