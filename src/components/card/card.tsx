import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Offer, CardType } from '../../types/types';
import { toggleFavoriteStatus } from '../../store/action';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { AppDispatch } from '../../store';
import React, { useCallback, useMemo } from 'react';

type CardComponentProps = {
  offer: Offer;
  cardType: CardType;
  isFavorite: boolean;
  authorizationStatus: AuthorizationStatus;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const CardComponent = React.memo(({ offer, cardType, isFavorite, authorizationStatus, onMouseEnter, onMouseLeave }: CardComponentProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleFavoriteClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    dispatch(toggleFavoriteStatus({ offerId: offer.id, status: isFavorite ? 0 : 1 }));
  }, [authorizationStatus, navigate, dispatch, offer.id, isFavorite]);

  const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const articleClassName = useMemo(() => {
    switch (cardType) {
      case CardType.Near:
        return 'near-places__card';
      case CardType.Favorite:
        return 'favorites__card';
      case CardType.City:
        return 'cities__card';
      default:
        return '';
    }
  }, [cardType]);

  const wrapperClassName = useMemo(() => {
    switch (cardType) {
      case CardType.Near:
        return 'near-places__image-wrapper';
      case CardType.Favorite:
        return 'favorites__image-wrapper';
      case CardType.City:
        return 'cities__image-wrapper';
      default:
        return '';
    }
  }, [cardType]);

  const imageSize = useMemo(() => {
    if (cardType === CardType.Favorite) {
      return ['150', '110'];
    } else {
      return ['260', '200'];
    }
  }, [cardType]);

  return (
    <article className={`${articleClassName} place-card`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${wrapperClassName} place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width={imageSize[0]} height={imageSize[1]} alt="Place image" />
        </Link>
      </div>
      <div className={`${cardType === CardType.Favorite ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button" onClick={handleFavoriteClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}, (prevProps, nextProps) => prevProps.isFavorite === nextProps.isFavorite &&
         prevProps.offer === nextProps.offer &&
         prevProps.cardType === nextProps.cardType &&
         prevProps.authorizationStatus === nextProps.authorizationStatus);

CardComponent.displayName = 'CardComponent';

export default CardComponent;
