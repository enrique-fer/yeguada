import React, { Component } from "react";
import { Link } from "react-router-dom";
import Global from "../../Global";
import { CloudinaryContext, Image } from "cloudinary-react";

class SquareCard extends Component {
  url = Global.url;

  constructor() {
    super();
  }

  render() {
    const { className, card, index } = this.props;

    return index % 2 === 0 ? (
      <Link
        to={{
          pathname: "/reserva",
          state: { id: card._id },
        }}
        className={`${className} square-card`}
        key={card._id}
      >
        <div className="square-card__image">
          <div name={card.title} className="anchor-link">
            {card.image ? (
              <CloudinaryContext className="item__foto" cloudName="djkulk2kk">
                <Image
                  className="cab-image"
                  publicId={card.image}
                  width="500px"
                  height="500px"
                />
              </CloudinaryContext>
            ) : (
              <img
                src={`https://via.placeholder.com/500`}
                alt={card.title}
                title="No hay foto para la actividad"
              />
            )}
          </div>
        </div>

        <div className="square-card__content">
          <h1>{card.title}</h1>

          <ul>
            {card.content.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>
      </Link>
    ) : (
      <Link
        to={{
          pathname: "/reserva",
          state: { id: card._id },
        }}
        className={`${className} square-card`}
        key={card._id}
      >
        <div className="square-card__content">
          <h1>{card.title}</h1>

          <ul>
            {card.content.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>

        <div className="square-card__image">
          <div name={card.title} className="anchor-link">
            {card.image ? (
              <CloudinaryContext className="item__foto" cloudName="djkulk2kk">
                <Image
                  className="cab-image"
                  publicId={card.image}
                  width="500px"
                  height="500px"
                />
              </CloudinaryContext>
            ) : (
              <img
                src={`https://via.placeholder.com/500`}
                alt={card.title}
                title="No hay foto para el caballo"
              />
            )}
          </div>
        </div>
      </Link>
    );
  }
}

export default SquareCard;
