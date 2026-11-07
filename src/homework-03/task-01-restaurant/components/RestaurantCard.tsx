import type { Restaurant } from '../types';

import PropTypes from 'prop-types';
import checkProps from '../../../utils/checkProps';
import RestaurantRating from './RestaurantRating';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard(props: RestaurantCardProps) {
  checkProps(RestaurantCard, props);
  const { restaurant } = props;

  return (
    <article className="restaurant-card">
      <figure className="restaurant-photo">
        <img src={restaurant.image} alt={restaurant.imageAlt} width="1280" height="794" />
        {restaurant.photoCredit && <figcaption>
          <a href={restaurant.photoCredit.source} target="_blank" rel="noreferrer">
            Фото: {restaurant.photoCredit.author}
          </a>
          {' · '}
          <a href={restaurant.photoCredit.licenseUrl} target="_blank" rel="noreferrer">
            {restaurant.photoCredit.license}
          </a>
        </figcaption>}
      </figure>

      <div className="restaurant-info">
        {restaurant.location && <p className="restaurant-location">{restaurant.location}</p>}
        <h2>{restaurant.name}</h2>
        {restaurant.description && <p className="restaurant-description">{restaurant.description}</p>}
        <dl className="restaurant-facts">
          <div><dt>Адреса</dt><dd>{restaurant.address}</dd></div>
          <div><dt>Тип кухні</dt><dd>{restaurant.cuisine}</dd></div>
          <div>
            <dt>Рейтинг</dt>
            <dd>
              <RestaurantRating value={restaurant.rating} max={5} />
              <span className="rating-note">Навчальна оцінка для прикладу.</span>
            </dd>
          </div>
        </dl>
        {restaurant.source && <p className="restaurant-source">
          <a href={restaurant.source} target="_blank" rel="noreferrer">Сайт ресторану ↗</a>
        </p>}
      </div>
    </article>
  );
}

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
    address: PropTypes.string.isRequired,
    cuisine: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    description: PropTypes.string,
    source: PropTypes.string,
    photoCredit: PropTypes.shape({
      author: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
      license: PropTypes.string.isRequired,
      licenseUrl: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
