import { Reviews } from '../../types/types';
import ReviewComponent from '../review/review';
import React, { useMemo } from 'react';

type ReviewListComponentProps = {
  reviews: Reviews;
}

const ReviewListComponent = React.memo(({ reviews }: ReviewListComponentProps): JSX.Element => {
  const sortedReviews = useMemo(() => reviews
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10), [reviews]);

  return (
    <ul className="reviews__list">
      {sortedReviews.map((item) => (
        <ReviewComponent key={item.id} review={item} />
      ))}
    </ul>
  );
});

ReviewListComponent.displayName = 'ReviewListComponent';

export default ReviewListComponent;
