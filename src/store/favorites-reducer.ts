import { createReducer } from '@reduxjs/toolkit';
import { setFavorites, fetchFavorites, toggleFavoriteStatus } from './action';
import { Offer } from '../types/types';

type FavoritesState = {
  favorites: Offer[];
  isLoading: boolean;
};

const initialState: FavoritesState = {
  favorites: [],
  isLoading: true,
};

const favoritesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFavorites, (state, action) => {
      state.favorites = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchFavorites.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchFavorites.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchFavorites.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(toggleFavoriteStatus.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(toggleFavoriteStatus.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(toggleFavoriteStatus.rejected, (state) => {
      state.isLoading = false;
    });
});

export default favoritesReducer;
