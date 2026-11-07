import PageTitle from '../../components/PageTitle';
import RestaurantCard from './components/RestaurantCard';
import { restaurant } from './data/restaurantData';
import '../styles.css';

export default function RestaurantPage() {
  return (
    <div className="restaurant-page task-page">
      <PageTitle eyebrow="Знайомство із закладом" title="Ресторан" description="Адреса, кухня та місце для смачної зустрічі." />
      <RestaurantCard restaurant={restaurant} />
    </div>
  );
}
