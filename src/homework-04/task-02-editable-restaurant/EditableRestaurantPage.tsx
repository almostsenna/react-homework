import type { EditableRestaurant, RestaurantLoadState } from './types';
import type { Restaurant } from '../../homework-03/task-01-restaurant/types';

import { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import RestaurantCard from '../../homework-03/task-01-restaurant/components/RestaurantCard';
import { restaurant as originalRestaurant } from '../../homework-03/task-01-restaurant/data/restaurantData';
import RestaurantForm from './components/RestaurantForm';
import { loadRestaurant, saveRestaurant } from './storage/restaurantStorage';
import '../../homework-03/styles.css';
import './styles.css';

export default function EditableRestaurantPage() {
  const [saved, setSaved] = useState<RestaurantLoadState>(loadRestaurant);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  function handleSave(values: EditableRestaurant) {
    try {
      const nextRestaurant = saveRestaurant(values);
      setSaved({ restaurant: nextRestaurant, error: '' });
      setIsEditing(false);
      setMessage('Зміни збережено. Вони залишаться після оновлення сторінки.');
    } catch {
      setSaved((previous) => ({
        ...previous,
        error: 'Не вдалося зберегти зміни. Спробуйте ще раз; введені значення залишилися у формі.',
      }));
      setMessage('');
    }
  }

  function handleEdit() {
    setMessage('');
    setIsEditing(true);
  }

  function handleCancel() {
    setSaved((previous) => ({ ...previous, error: '' }));
    setIsEditing(false);
    setMessage('Редагування скасовано.');
  }

  const restaurant: Restaurant = {
    ...saved.restaurant,
    imageAlt: `Будівля ресторану ${saved.restaurant.name}`,
    // Авторство стосується вбудованого фото, тому для нового зображення його не показуємо.
    photoCredit: saved.restaurant.image === originalRestaurant.image ? originalRestaurant.photoCredit : undefined,
    source:
      saved.restaurant.name === originalRestaurant.name &&
      saved.restaurant.address === originalRestaurant.address
        ? originalRestaurant.source
        : undefined,
  };

  return (
    <div className="restaurant-page task-page editable-restaurant-page">
      <PageTitle eyebrow="Продовження домашньої роботи 3" title="Редагування ресторану" description="Змініть інформацію та збережіть її для наступного відкриття сторінки." />
      {saved.error && <p className="restaurant-storage-error" role="alert">{saved.error}</p>}
      {message && <p className="restaurant-save-message" role="status">{message}</p>}

      {isEditing ? (
        <RestaurantForm initialValues={saved.restaurant} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
          <div className="restaurant-editor-toolbar">
            <button className="restaurant-editor-primary" type="button" onClick={handleEdit}>Редагувати ресторан</button>
            <p>Зміни зберігаються в цьому браузері.</p>
          </div>
          <RestaurantCard restaurant={restaurant} />
        </>
      )}
    </div>
  );
}
