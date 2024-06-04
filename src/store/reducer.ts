import { combineReducers } from 'redux';
import cityReducer from './city-reducer';
import offersReducer from './offers-reducer';
import currentOfferReducer from './current-offer-reducer';
import reviewsReducer from './reviews-reducer';
import nearbyOffersReducer from './nearby-offers-reducer';
import authReducer from './auth-reducer';
import userDataReducer from './user-data-reducer';
import favoritesReducer from './favorites-reducer';

const rootReducer = combineReducers({
  city: cityReducer,
  offers: offersReducer,
  currentOffer: currentOfferReducer,
  reviews: reviewsReducer,
  nearbyOffers: nearbyOffersReducer,
  authorizationStatus: authReducer,
  userData: userDataReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
