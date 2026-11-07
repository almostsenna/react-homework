import PropTypes from 'prop-types';
import checkProps from '../../../utils/checkProps';

interface RestaurantRatingProps {
  value: number;
  max?: number;
}

export default function RestaurantRating(props: RestaurantRatingProps) {
  checkProps(RestaurantRating, props);
  const { value, max = 5 } = props;

  return (
    <div className="restaurant-rating" aria-label={`Рейтинг: ${value} з ${max}`}>
      <span className="rating-star" aria-hidden="true">★</span>
      <strong>{value}</strong>
      <span>/ {max}</span>
    </div>
  );
}

RestaurantRating.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
};
