import { CommentForm, ReviewsList, OffersList, Map } from 'components';
import { AuthorizationStatus } from 'const';
import { useAppSelector } from 'hooks';
import { useState } from 'react';
import { Comment, Offer } from 'types';

interface Props {
  offerData: Offer;
  nearbyOffers: Offer[];
  offerComments: Comment[] | null;
}

export default function OfferItem({ offerData, nearbyOffers, offerComments }: Props) {
  const { id, price, rating, type, isPremium, images, goods, title, maxAdults, bedrooms, description, host: { avatarUrl, isPro, name } } = offerData;

  const authStatus = useAppSelector((state) => state.user.authorizationStatus);
  const nearby = useAppSelector((state) => state.offers.nearbyOffers);

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);
  const onOfferHover = (offerId: number | null) => {
    const currentOffer = nearbyOffers.find((item) => item.id === offerId);

    setSelectedOffer(currentOffer);
  };

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {images.slice(0, 6).map((image) => (
              <div key={image} className="property__image-wrapper">
                <img className="property__image" src={image} alt="Studio" />
              </div>
            ))}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {isPremium ? (
              <div className="property__mark">
                <span>Premium</span>
              </div>) : null}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {title}
              </h1>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{ width: `${Math.round(rating * 100 / 5)}%` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {goods.map((good) => (
                  <li key={good} className="property__inside-item">
                    {good}
                  </li>))}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {name}
                </span>
                {isPro ? (<span className="property__user-status">Pro</span>) : null}
              </div>
              <div className="property__description">
                <p className="property__text">
                  {description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              {offerComments ? (
                <ReviewsList comments={offerComments} />) : null}
              {authStatus === AuthorizationStatus.Auth ?
                <CommentForm offerId={id} /> :
                null}
            </section>
          </div>
        </div>
        <Map selectedOffer={selectedOffer} offersList={nearby} activeOffer={offerData} className='property__map map' />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OffersList offersList={nearbyOffers} onOfferHover={onOfferHover} className='near-places__list places__list' />
        </section>
      </div>
    </main>
  );
}
