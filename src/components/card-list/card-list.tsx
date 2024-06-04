import { useState, useCallback, useMemo } from 'react';
import { Offers, CardType, Offer, City } from '../../types/types';
import CardComponent from '../card/card';
import { ACTIVE_CARD, AuthorizationStatus, AppRoute } from '../../const';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCity } from '../../store/action';
import { AppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';

type CardListComponentProps = {
  offers: Offers;
  cardsType: CardType;
  onCardHover?: (offer: Offer | undefined) => void;
  favorites: Offers;
  authorizationStatus: AuthorizationStatus;
};

const CardListComponent = React.memo(({ offers, cardsType, onCardHover, favorites, authorizationStatus }: CardListComponentProps): JSX.Element => {
  const [, setActiveCard] = useState<string | null>(ACTIVE_CARD);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardMouseEnter = useCallback((offer: Offer) => {
    setActiveCard(offer.id);
    if (onCardHover) {
      onCardHover(offer);
    }
  }, [onCardHover]);

  const handleCardMouseLeave = useCallback(() => {
    setActiveCard(null);
    if (onCardHover) {
      onCardHover(undefined);
    }
  }, [onCardHover]);

  const handleCityClick = useCallback((city: City) => {
    dispatch(setCity(city));
    navigate(AppRoute.Main);
  }, [dispatch, navigate]);

  const handleDivClass = useMemo(() => {
    switch (cardsType) {
      case CardType.City:
        return 'cities__places-list places__list tabs__content';
      case CardType.Near:
        return 'near-places__list places__list';
      case CardType.Favorite:
        return 'favorites__places';
      default:
        return '';
    }
  }, [cardsType]);

  const getCards = useMemo(() => (
    <div className={handleDivClass}>
      {offers.map((offer) => {
        const isFavorite = favorites.some((favorite) => favorite.id === offer.id);
        return (
          <CardComponent
            key={offer.id}
            offer={offer}
            cardType={cardsType}
            isFavorite={isFavorite}
            authorizationStatus={authorizationStatus}
            onMouseEnter={() => handleCardMouseEnter(offer)}
            onMouseLeave={handleCardMouseLeave}
          />
        );
      })}
    </div>
  ), [offers, handleCardMouseEnter, handleCardMouseLeave, handleDivClass, cardsType, favorites, authorizationStatus]);

  if (cardsType === CardType.Favorite) {
    return (
      <li className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <a
              className="locations__item-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCityClick(offers[0].city);
              }}
            >
              <span>{offers[0].city.name}</span>
            </a>
          </div>
        </div>
        {getCards}
      </li>
    );
  }

  return getCards;
});

CardListComponent.displayName = 'CardListComponent';

export default CardListComponent;
