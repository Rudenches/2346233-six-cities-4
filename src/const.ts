import { City } from './types/types';

export const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Error = '/error'
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const monthMap: { [key: number]: string } = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

export const ACTIVE_CARD = null;

export const REVIEW_FORM = {
  rating: 0,
  review: '',
};

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const URL_MARKER_HOWERED =
  '/img/pin-active.svg';

export const CITIES: City[] = [
  { name: 'Paris', location: {latitude: 48.8566, longitude: 2.3522, zoom: 12 }},
  { name: 'Cologne', location: {latitude: 50.9375, longitude: 6.9603, zoom: 12 }},
  { name: 'Brussels', location: {latitude: 50.8503, longitude: 4.3517, zoom: 12 }},
  { name: 'Amsterdam', location: {latitude: 52.3676, longitude: 4.9041, zoom: 12 }},
  { name: 'Hamburg', location: {latitude: 53.5511, longitude: 9.9937, zoom: 12 }},
  { name: 'Dusseldorf', location: {latitude: 51.2277, longitude: 6.7735, zoom: 12 }},
];

export enum APIRoute {
  Offers = '/offers',
  Review = '/comments',
  Login = '/login',
  Logout = '/logout',
  Nearby = '/nearby',
  Favorite = '/favorite',
}
