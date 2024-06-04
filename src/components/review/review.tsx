import { monthMap } from '../../const';
import { Review } from '../../types/types';
import React, { useMemo } from 'react';

type ReviewComponentProps = {
  review: Review;
}

const ReviewComponent = React.memo(({ review }: ReviewComponentProps): JSX.Element => {
  const formattedDate = useMemo(() => {
    const month = monthMap[Number(review.date.slice(5, 7))];
    const year = review.date.slice(0, 4);
    return `${month} ${year}`;
  }, [review.date]);

  return (
    <li key={review.id} className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${review.rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date.slice(0, 10)}>{formattedDate}</time>
      </div>
    </li>
  );
});

ReviewComponent.displayName = 'ReviewComponent';

export default ReviewComponent;
