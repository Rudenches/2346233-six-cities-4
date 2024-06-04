import { createReducer } from '@reduxjs/toolkit';
import { setReviews, fetchReviews, postComment } from './action';
import { Reviews } from '../types/types';

type ReviewsState = {
  reviews: Reviews;
  isLoading: boolean;
};

const initialState: ReviewsState = {
  reviews: [],
  isLoading: true,
};

const reviewsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchReviews.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchReviews.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchReviews.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(postComment.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(postComment.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(postComment.rejected, (state) => {
      state.isLoading = false;
    });
});

export default reviewsReducer;
