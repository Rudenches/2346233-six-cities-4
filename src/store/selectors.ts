import { Reviews, WideOffer, Offers, Offer } from '../types/types';
import { RootState } from './index';

export const selectCity = (state: RootState) => state.city;
export const selectOffers = (state: RootState) => state.offers.offers;
export const selectCurrentOffer = (state: RootState): WideOffer | null => state.currentOffer.currentOffer;
export const selectReviews = (state: RootState): Reviews => state.reviews.reviews;
export const selectNearbyOffers = (state: RootState): Offers => state.nearbyOffers.nearbyOffers;
export const selectLoadingStatusOffers = (state: RootState): boolean => state.offers.isLoading;
export const selectLoadingStatusOffer = (state: RootState): boolean => state.currentOffer.isLoading;
export const selectLoadingStatusReviews = (state: RootState): boolean => state.reviews.isLoading;
export const selectLoadingStatusNear = (state: RootState): boolean => state.nearbyOffers.isLoading;
export const selectAuthorizationStatus = (state: RootState) => state.authorizationStatus.authorizationStatus;
export const selectUserData = (state: RootState) => state.userData;
export const selectFavorites = (state: RootState): Offer[] => state.favorites.favorites;
export const selectLoadingStatusFavorites = (state: RootState): boolean => state.favorites.isLoading;
