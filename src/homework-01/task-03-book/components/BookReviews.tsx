import type { BookReview } from '../types';

import ReviewCard from './ReviewCard';

interface BookReviewsProps {
  reviews: BookReview[];
}

export default function BookReviews({ reviews }: BookReviewsProps) {
  return (
    <section className="reviews" aria-labelledby="reviews-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Після прочитання</p>
          <h2 id="reviews-title">Рецензії на книгу</h2>
        </div>
        <p className="reviews-note">Перекази відгуків, наведених видавцем.</p>
      </div>

      <div className="review-grid">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <p className="reviews-source">
        <a href="https://books.apple.com/us/book/how-to-build-a-car/id1256347813" target="_blank" rel="noreferrer">
          Джерело відгуків: опис видавця в Apple Books ↗
        </a>
      </p>
    </section>
  );
}
