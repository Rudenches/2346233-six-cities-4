import { REVIEW_FORM } from '../../const';
import { useCallback, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { postComment } from '../../store/action';
import { AppDispatch } from '../../store';
import React from 'react';

type ReviewFormState = {
  rating: number;
  review: string;
  isSubmitting: boolean;
  error: string | null;
};

type ReviewFormAction =
  | { type: 'SET_RATING'; payload: number }
  | { type: 'SET_REVIEW'; payload: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_FAILURE'; payload: string };

const initialState: ReviewFormState = {
  rating: REVIEW_FORM.rating,
  review: REVIEW_FORM.review,
  isSubmitting: false,
  error: null,
};

function reviewFormReducer(state: ReviewFormState, action: ReviewFormAction): ReviewFormState {
  switch (action.type) {
    case 'SET_RATING':
      return { ...state, rating: action.payload };
    case 'SET_REVIEW':
      return { ...state, review: action.payload };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true, error: null };
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, rating: REVIEW_FORM.rating, review: REVIEW_FORM.review };
    case 'SUBMIT_FAILURE':
      return { ...state, isSubmitting: false, error: action.payload };
    default:
      return state;
  }
}

const getRatingTitle = (value: number): string => {
  switch (value) {
    case 5: return 'perfect';
    case 4: return 'good';
    case 3: return 'not bad';
    case 2: return 'badly';
    case 1: return 'terribly';
    default: return '';
  }
};

const ReviewFormComponent = React.memo(({ offerId }: { offerId: string }): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const [state, dispatchState] = useReducer(reviewFormReducer, initialState);

  const handleRatingChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchState({ type: 'SET_RATING', payload: Number(event.target.value) });
  }, []);

  const handleReviewChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatchState({ type: 'SET_REVIEW', payload: event.target.value });
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatchState({ type: 'SUBMIT_START' });

    const submit = async () => {
      if (state.rating && state.review.length >= 50 && state.review.length <= 300) {
        try {
          await dispatch(postComment({ offerId, comment: state.review, rating: state.rating })).unwrap();
          dispatchState({ type: 'SUBMIT_SUCCESS' });
        } catch (err) {
          dispatchState({ type: 'SUBMIT_FAILURE', payload: 'Failed to submit the review. Please try again.' });
        }
      } else {
        dispatchState({ type: 'SUBMIT_FAILURE', payload: 'Please provide a valid review and rating.' });
      }
    };

    submit();
  }, [dispatch, offerId, state.rating, state.review]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Array.from({ length: 5 }, (_, index) => {
          const value = 5 - index;
          return (
            <React.Fragment key={value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={`${value}-stars`}
                type="radio"
                onChange={handleRatingChange}
                disabled={state.isSubmitting}
                checked={state.rating === value}
              />
              <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={getRatingTitle(value)}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          );
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleReviewChange}
        disabled={state.isSubmitting}
        value={state.review}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={state.isSubmitting || !state.rating || state.review.length < 50 || state.review.length > 300}>Submit</button>
        {state.error && <div className="reviews__error">{state.error}</div>}
      </div>
    </form>
  );
});

ReviewFormComponent.displayName = 'ReviewFormComponent';
export default ReviewFormComponent;
