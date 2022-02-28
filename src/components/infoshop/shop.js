import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { withRouter } from "react-router";
import axios from "axios";
import Global from "../../Global";

import Calendar from "react-calendar";

class Shop extends Component {
  url = Global.url;
  horas = new Map([
    ["09:00", 9],
    ["09:30", 9.5],
    ["10:00", 10],
    ["10:30", 10.5],
    ["11:00", 11],
    ["11:30", 11.5],
    ["12:00", 12],
    ["12:30", 12.5],
    ["13:00", 13],
    ["13:30", 13.5],
  ]);

  constructor(props) {
    super(props);

    this.state = {
      item: {},
      date: null,
      start: "",
      end: "",
      user: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.addHour = this.addHour.bind(this);
  }

  componentDidMount() {
    window.scroll({ top: 0 });
    axios.get(`${this.url}reserva`).then(
      (response) => {
        this.props.fetchDates(response.data.reservas);
      },
      (error) => {
        console.log(error);
      }
    );

    if (this.props.featuresCards.length === 0) {
      axios
        .get(`${this.url}actividad`)
        .then((res) => {
          var features = res.data.actividades;
          this.props.setFeaturesCards(features);

          const { id } = this.props.location.state;
          const item = features.find((item) => item._id === (id ? id : 0));

          this.props.loadHeaderImage(
            this.props.headers,
            window.location.pathname
          );

          if (item != null) {
            this.setState({
              item,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const { id } = this.props.location.state;
      const item = this.props.featuresCards.find(
        (item) => item._id === (id ? id : 0)
      );

      this.props.loadHeaderImage(this.props.headers, window.location.pathname);

      if (item != null) {
        this.setState({
          item,
        });
      }
    }

    var token = sessionStorage.getItem("token");

    if (token != null) {
      axios
        .get(`${this.url}auth/user`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.setState({
            user: response.data.user,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  onChange(value) {
    this.setState({
      date: value,
      start: "",
      end: "",
    });
  }

  buildForm() {
    var formData = new FormData();

    formData.append("activity_id", this.state.item._id);
    formData.append("date", this.state.date);
    formData.append("start", this.state.start);
    formData.append("end", this.state.end);
    formData.append("user_id", this.state.user._id);

    return formData;
  }

  onClick() {
    axios.post(`${this.url}reserva/save`, this.buildForm()).then(
      (res) => {
        this.props.addDate(this.state.item.title, this.state.date);
        axios.get(`${this.url}reserva`).then(
          (response) => {
            alert(
              `Se ha realizado una reserva para el ${
                this.state.date.getUTCDate() + 1
              }/${
                this.state.date.getMonth() + 1
              }/${this.state.date.getFullYear()}`
            );
            this.props.fetchDates(response.data.reservas);
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addHour(value) {
    var hoursplit = value.split(":");
    var date = this.state.date;
    var end = "";
    const hours = Array.from(this.horas.keys());

    var dates = [];
    this.props.dates.forEach((actv) => {
      var actvDate = new Date(actv.date);
      if (
        (this.state.date.getDate() === actvDate.getDate()) &
        (this.state.date.getMonth() === actvDate.getMonth()) &
        (this.state.date.getFullYear() === actvDate.getFullYear())
      ) {
        dates.push(actv);
      }
    });

    var resHours = [];
    if (dates) {
      hours.forEach((hora) => {
        dates.forEach((date) => {
          if (
            this.horas.get(hora) >= this.horas.get(date.start) &&
            this.horas.get(hora) <= this.horas.get(date.end)
          ) {
            resHours.push(hora);
          }
        });
      });
    }

    if (this.state.item.duration % 1 != 0) {
      if (hoursplit[1] === "30") {
        end = `${
          parseInt(hoursplit[0], 10) + Math.floor(this.state.item.duration) + 1
        }:00`;
      } else {
        end = `${
          parseInt(hoursplit[0], 10) + Math.floor(this.state.item.duration)
        }:30`;
      }
    } else {
      if (hoursplit[1] === "30") {
        end = `${
          parseInt(hoursplit[0], 10) + Math.floor(this.state.item.duration)
        }:30`;
      } else {
        end = `${
          parseInt(hoursplit[0], 10) + Math.floor(this.state.item.duration)
        }:00`;
      }
    }

    var fin = false,
      inic = false;
    resHours.forEach((resHour) => {
      if (end === resHour) {
        fin = true;
      }

      if (value === resHour) {
        inic = true;
      }
    });

    if (!fin && !inic) {
      this.setState({
        start: value,
        end: end,
      });
    } else {
      this.setState({
        start: "",
        end: "",
      });
      alert("No se puede reservar para esa hora");
    }
  }

  getCalendar() {
    const d = new Date();

    return (
      <Calendar
        onChange={this.onChange}
        minDate={new Date(d.getFullYear(), d.getMonth(), 1)}
        tileClassName={({ date }) => {
          var clas = "";
          var exist = false;

          this.props.dates.map((actv) => {
            var actvDate = new Date(actv.date);
            if (
              (date.getDate() === actvDate.getDate()) &
              (date.getMonth() === actvDate.getMonth()) &
              (date.getFullYear() === actvDate.getFullYear())
            ) {
              exist = true;
            }
          });

          if (exist) {
            clas = "day-red";
          }

          return clas;
        }}
        tileDisabled={({ date, view }) => {
          var dis = false;
          if (view == "month") {
            if (
              (date.getDate() <= d.getDate()) &
              (date.getMonth() <= d.getMonth()) &
              (date.getFullYear() <= d.getFullYear())
            ) {
              dis = true;
            }
          } else {
            if (view == "year") {
              if (
                (date.getMonth() + 1 < d.getMonth() + 1) &
                (date.getFullYear() <= d.getFullYear())
              ) {
                dis = true;
              }
            }
          }

          return dis;
        }}
        value={this.state.date}
      />
    );
  }

  render() {
    const hours = Array.from(this.horas.keys());
    return (
      <div className="shop">
        <div className="title">Reserva día para {this.state.item.title}</div>

        <div className="fecha">
          <div className="reserva">
            <div className="calendario">{this.getCalendar()}</div>

            <div className="horas">
              {this.state.date
                ? hours.map((hora, index) => {
                    var dates = [];
                    this.props.dates.forEach((actv) => {
                      var actvDate = new Date(actv.date);
                      if (
                        (this.state.date.getDate() === actvDate.getDate()) &
                        (this.state.date.getMonth() === actvDate.getMonth()) &
                        (this.state.date.getFullYear() ===
                          actvDate.getFullYear())
                      ) {
                        dates.push(actv);
                      }
                    });

                    var className = "";
                    if (dates) {
                      dates.forEach((date) => {
                        if (
                          this.horas.get(hora) >= this.horas.get(date.start) &&
                          this.horas.get(hora) <= this.horas.get(date.end)
                        ) {
                          className = "res";
                        }
                      });
                    }

                    if (className === "res") {
                      className += " hora";
                    } else {
                      if (
                        this.horas.get(hora) <=
                          this.horas.get(this.state.end) &&
                        this.horas.get(hora) >= this.horas.get(this.state.start)
                      ) {
                        className += "hora seleccion";
                      } else {
                        className += "hora";
                      }
                    }

                    return (
                      <div
                        className={className}
                        key={index}
                        onClick={() => {
                          this.addHour(hora);
                        }}
                      >
                        {hora}
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>

          <div className="texto">
            <button type="button" className="btn" onClick={this.onClick}>
              Reservar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { featuresCards } = state.home;
  const { headers } = state.navbar;
  const { dates } = state.shop;
  return {
    featuresCards,
    headers,
    dates,
  };
}

Shop = connect(mapStateToProps, actions)(Shop);

export default withRouter(Shop);
