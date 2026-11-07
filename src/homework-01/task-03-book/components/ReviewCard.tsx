import type { BookReview } from '../types';

interface ReviewCardProps {
  review: BookReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="review-card">
      <span className="review-mark" aria-hidden="true">“</span>
      <h3>{review.title}</h3>
      <p>{review.text}</p>
      <p className="review-publication">{review.publication}</p>
    </article>
  );
}
