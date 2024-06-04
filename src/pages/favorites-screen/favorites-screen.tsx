import { AppRoute, AuthorizationStatus } from '../../const';
import { Link, NavLink } from 'react-router-dom';
import { CardType } from '../../types/types';
import CardListComponent from '../../components/card-list/card-list';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthorizationStatus, selectFavorites, selectUserData } from '../../store/selectors';
import { AppDispatch } from '../../store';
import { logout } from '../../store/action';
import React, { useCallback, useMemo } from 'react';

const FavoritesScreen = React.memo((): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const userData = useSelector(selectUserData);
  const favorites = useSelector(selectFavorites);

  const cities = useMemo(() => Array.from(new Set(favorites.map((offer) => offer.city.name))), [favorites]);
  const filterBookmarkedOffers = useCallback((city: string) => favorites.filter((offer) => offer.city.name === city), [favorites]);

  const handleLogoutClick = useCallback((evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(logout());
  }, [dispatch]);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
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
                </ul>
              ) : (
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
      {favorites.length > 0 ? (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {cities.map((city) => (
                  <CardListComponent
                    key={city}
                    cardsType={CardType.Favorite}
                    offers={filterBookmarkedOffers(city)}
                    favorites={favorites}
                    authorizationStatus={authorizationStatus}
                  />
                ))}
              </ul>
            </section>
          </div>
        </main>
      ) : (
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>
      )}
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
});

FavoritesScreen.displayName = 'FavoritesScreen';

export default FavoritesScreen;
