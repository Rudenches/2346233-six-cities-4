import { createReducer } from '@reduxjs/toolkit';
import { setNearbyOffers, fetchNearbyOffers } from './action';
import { Offer } from '../types/types';

type NearbyOffersState = {
  nearbyOffers: Offer[];
  isLoading: boolean;
};

const initialState: NearbyOffersState = {
  nearbyOffers: [],
  isLoading: true,
};

const nearbyOffersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchNearbyOffers.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchNearbyOffers.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchNearbyOffers.rejected, (state) => {
      state.isLoading = false;
    });
});

export default nearbyOffersReducer;
