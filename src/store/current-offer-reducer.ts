import { createReducer } from '@reduxjs/toolkit';
import { setOffer, fetchOffer } from './action';
import { WideOffer } from '../types/types';

type CurrentOfferState = {
  currentOffer: WideOffer | null;
  isLoading: boolean;
};

const initialState: CurrentOfferState = {
  currentOffer: null,
  isLoading: true,
};

const currentOfferReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffer, (state, action) => {
      state.currentOffer = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchOffer.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOffer.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchOffer.rejected, (state) => {
      state.isLoading = false;
    });
});

export default currentOfferReducer;
