import type { EditableRestaurant, RestaurantErrors, RestaurantField, RestaurantInput } from '../types';

const restaurantFields: RestaurantField[] = [
  'name', 'address', 'cuisine', 'rating', 'image', 'location', 'description',
];

export function isRestaurantField(value: string): value is RestaurantField {
  return restaurantFields.some((field) => field === value);
}

export function isImageSource(value: string): boolean {
  const source = value.trim();
  if (source.startsWith('images/') && source.length > 'images/'.length) return true;
  try {
    const url = new URL(source);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export function getRestaurantErrors(values: RestaurantInput): RestaurantErrors {
  const errors: RestaurantErrors = {};
  for (const field of ['name', 'address', 'cuisine'] as const) {
    if (!values[field].trim()) errors[field] = 'Заповніть це поле.';
  }
  const rating = Number(values.rating);
  if (String(values.rating).trim() === '' || !Number.isFinite(rating) || rating < 0 || rating > 5) {
    errors.rating = 'Вкажіть число від 0 до 5.';
  }
  if (!isImageSource(values.image)) {
    errors.image = 'Вкажіть http/https-посилання або шлях images/назва-файлу.jpg.';
  }
  return errors;
}

export function normalizeRestaurant(values: RestaurantInput): EditableRestaurant {
  return {
    name: values.name.trim(),
    address: values.address.trim(),
    cuisine: values.cuisine.trim(),
    rating: Number(values.rating),
    image: values.image.trim(),
    location: values.location?.trim() ?? '',
    description: values.description?.trim() ?? '',
  };
}
