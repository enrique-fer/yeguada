import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Calendar from 'react-calendar';

class Shop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: {},
            isCalendar: false,
            date: new Date(),
        }

        this.onChange = this.onChange.bind(this);
        this.changeClass = this.changeClass.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        // Array de fechas ocupadas que se obtiene del back
        const { id } = this.props.location.state;
        const item = this.props.featuresCards.find(item => item._id === (id ? id : 0));

        this.props.loadHeaderImage(this.props.headers, window.location.pathname);

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
        console.log(value);
        this.setState({
            date: value
        })
    }

    changeClass() {
        if (this.state.isCalendar) {
            this.setState({
                isCalendar: false
            })
        } else {
            this.setState({
                isCalendar: true
            })
        }
    }

    render() {
        const d = new Date();
        return (
            <div className='shop'>
                <div className='title'>
                    {
                        this.state.item.title
                    }
                </div>

                <div className="fecha">
                    <button className="calBtn" onClick={this.changeClass}>Calendario</button>

                    <div className={this.state.isCalendar ? 'calendario visible' : 'calendario'}>
                        <Calendar
                            onChange={this.onChange}
                            // minDate={ new Date(d.getFullYear(), d.getMonth(), 1)}
                            // tileClassName={} para dar color a los dias
                            // tileDisabled={ ({date, view}) =>
                            //     date.getUTCDate() === 25
                            // }
                            //     (view === 'month') &&
                            //     disabledDates.some(disabledDate =>
                            //         date.getFullYear() > disabledDate.getFullYear() &&
                            //         date.getMonth() > disabledDate.getMonth() &&
                            //         date.getDate() > disabledDate.getDate()
                            //     )
                            // }
                            value={this.state.date} />
                    </div>

                    <div className={this.state.isCalendar ? 'texto visible' : 'texto'}>
                        {
                            `Dia ${this.state.date.getUTCDate()}, mes ${this.state.date.getMonth()}`
                            // this.state.date.toUTCString()
                        }
                    </div>
                </div>
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

Shop = connect(mapStateToProps)(Shop);

export default withRouter(Shop);