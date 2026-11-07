export interface EditableRestaurant {
  name: string;
  address: string;
  cuisine: string;
  rating: number;
  image: string;
  location: string;
  description: string;
}

export type RestaurantField = keyof EditableRestaurant;
export type RestaurantErrors = Partial<Record<RestaurantField, string>>;

export type RestaurantDraft = Omit<EditableRestaurant, 'rating'> & {
  rating: string;
};

export type RestaurantInput = Omit<EditableRestaurant, 'rating' | 'location' | 'description'> & {
  rating: string | number;
  location?: string;
  description?: string;
};

export interface RestaurantLoadState {
  restaurant: EditableRestaurant;
  error: string;
}
