import { useDispatch, useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Link, NavLink } from 'react-router-dom';
import { City, Offer, CardType } from '../../types/types';
import { setCity, logout } from '../../store/action';
import { selectCity, selectLoadingStatusOffers, selectOffers, selectAuthorizationStatus, selectUserData, selectFavorites } from '../../store/selectors';
import CardListComponent from '../../components/card-list/card-list';
import MapComponent from '../../components/map/map';
import CityList from '../../components/city-list/city-list';
import SortOptions from '../../components/sort-options/sort-options';
import { CITIES } from '../../const';
import { useState, useEffect, useCallback } from 'react';
import { AppDispatch } from '../../store';

function MainScreen(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const city = useSelector(selectCity);
  const offers = useSelector(selectOffers);
  const isLoadingOffers = useSelector(selectLoadingStatusOffers);
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const userData = useSelector(selectUserData);
  const favorites = useSelector(selectFavorites);

  const [sortedOffers, setSortedOffers] = useState<Offer[]>([]);
  const [hoveredOffer, setHoveredOffer] = useState<Offer | undefined>(undefined);

  useEffect(() => {
    setSortedOffers(offers.filter((offer) => offer.city.name === city.name));
  }, [city, offers]);

  const handleCityChange = useCallback((newCity: City) => {
    dispatch(setCity(newCity));
  }, [dispatch]);

  const handleSortChange = useCallback((sortType: string) => {
    let sorted = [...offers.filter((offer) => offer.city.name === city.name)];
    switch (sortType) {
      case 'Price: low to high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'Price: high to low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'Top rated first':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:

        sorted = [...offers.filter((offer) => offer.city.name === city.name)];
        break;
    }
    setSortedOffers(sorted);
  }, [city.name, offers]);

  const handleLogoutClick = useCallback((evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(logout());
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              {authorizationStatus === AuthorizationStatus.Auth ? (
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <NavLink className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper"><img src={userData?.avatarUrl} alt="User avatar"/></div>
                      <span className="header__user-name user__name">{userData?.email}</span>
                      <span className="header__favorite-count">{favorites.length}</span>
                    </NavLink>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#" onClick={handleLogoutClick}>
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>) : (
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <NavLink className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </NavLink>
                  </li>
                </ul>
              )}

            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index ${sortedOffers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList cities={CITIES} currentCity={city} onCityChange={handleCityChange} />
        </div>
        {isLoadingOffers && (
          <div>Loading...</div>
        )}

        {!isLoadingOffers && sortedOffers.length > 0 && (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {sortedOffers.length} places to stay in {city.name}
                </b>
                <SortOptions onSortChange={handleSortChange} />
                <CardListComponent
                  offers={sortedOffers}
                  cardsType={CardType.City}
                  onCardHover={setHoveredOffer}
                  favorites={favorites}
                  authorizationStatus={authorizationStatus}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <MapComponent city={city} points={sortedOffers} selectedPoint={undefined} hoveredPoint={hoveredOffer} />
                </section>
              </div>
            </div>
          </div>
        )}

        {!isLoadingOffers && sortedOffers.length === 0 && (
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {city.name}</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MainScreen;
