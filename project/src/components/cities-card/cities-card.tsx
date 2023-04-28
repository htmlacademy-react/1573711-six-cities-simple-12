import { Offer } from 'types';
import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';
import { AppRoute } from 'const';
import { Premium } from 'components';

interface Props {
  offer: Offer;
  onOfferHover: (offerId: number | null) => void;
}

export default function CitiesCard({ offer, onOfferHover }: Props) {
  const { title, price, rating, type, previewImage, isPremium, id } = offer;

  const ratingBar = `${Math.round(rating * 100 / 5)}%`;

  const handleMouseEnter = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onOfferHover(id);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onOfferHover(null);
  };

  return (
    <article className="cities__card place-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium ? <Premium /> : null}
      <Link key={id} to={AppRoute.Offer.replace(/:id/, `${id}`)}>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place interior" />
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>

          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: ratingBar }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <div style={{ cursor: 'pointer' }}>{title}</div>
          </h2>
          <p className="place-card__type">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
        </div>
      </Link>
    </article >
  );
}
