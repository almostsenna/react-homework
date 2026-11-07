import { restaurant } from '../../../homework-03/task-01-restaurant/data/restaurantData';
import { getRestaurantErrors, normalizeRestaurant } from '../utils/restaurantValidation';
import type { EditableRestaurant, RestaurantInput, RestaurantLoadState } from '../types';

export const RESTAURANT_STORAGE_KEY = 'react-homework:restaurant:v1';
export const initialRestaurant: EditableRestaurant = normalizeRestaurant(restaurant);

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

// JSON спочатку має тип unknown: перевіряємо його перед використанням.
function parseStoredRestaurant(value: unknown): EditableRestaurant | null {
  if (
    !isRecord(value) ||
    typeof value.name !== 'string' ||
    typeof value.address !== 'string' ||
    typeof value.cuisine !== 'string' ||
    typeof value.rating !== 'number' ||
    typeof value.image !== 'string' ||
    (value.location !== undefined && typeof value.location !== 'string') ||
    (value.description !== undefined && typeof value.description !== 'string')
  ) {
    return null;
  }

  const candidate: RestaurantInput = {
    name: value.name,
    address: value.address,
    cuisine: value.cuisine,
    rating: value.rating,
    image: value.image,
    location: typeof value.location === 'string' ? value.location : '',
    description: typeof value.description === 'string' ? value.description : '',
  };
  if (Object.keys(getRestaurantErrors(candidate)).length > 0) return null;
  return normalizeRestaurant(candidate);
}

export function loadRestaurant(): RestaurantLoadState {
  const initialState: RestaurantLoadState = { restaurant: { ...initialRestaurant }, error: '' };
  if (typeof window === 'undefined') return initialState;
  try {
    const saved = window.localStorage.getItem(RESTAURANT_STORAGE_KEY);
    if (saved === null) return initialState;
    const parsed: unknown = JSON.parse(saved);
    const restored = parseStoredRestaurant(parsed);
    if (!restored) throw new Error('Invalid saved restaurant');
    return { restaurant: restored, error: '' };
  } catch {
    return {
      ...initialState,
      error: 'Не вдалося відновити збережені дані. Показано початковий ресторан.',
    };
  }
}

export function saveRestaurant(values: RestaurantInput): EditableRestaurant {
  if (Object.keys(getRestaurantErrors(values)).length > 0) {
    throw new Error('Invalid restaurant values');
  }
  const nextRestaurant = normalizeRestaurant(values);
  window.localStorage.setItem(RESTAURANT_STORAGE_KEY, JSON.stringify(nextRestaurant));
  return nextRestaurant;
}
