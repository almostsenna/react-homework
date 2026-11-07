import type { ChangeEvent, FormEvent } from 'react';
import type { EditableRestaurant, RestaurantDraft, RestaurantErrors, RestaurantField } from '../types';

import { useState } from 'react';
import PropTypes from 'prop-types';
import checkProps from '../../../utils/checkProps';
import { getRestaurantErrors, normalizeRestaurant, isRestaurantField } from '../utils/restaurantValidation';

const textFields: { name: RestaurantField; label: string; required: boolean }[] = [
  { name: 'name', label: 'Назва', required: true },
  { name: 'address', label: 'Адреса', required: true },
  { name: 'cuisine', label: 'Тип кухні', required: true },
  { name: 'location', label: 'Місто та країна', required: false },
];

interface RestaurantFormProps {
  initialValues: EditableRestaurant;
  onSave: (restaurant: EditableRestaurant) => void;
  onCancel: () => void;
}

export default function RestaurantForm(props: RestaurantFormProps) {
  checkProps(RestaurantForm, props);
  const { initialValues, onSave, onCancel } = props;
  const [draft, setDraft] = useState<RestaurantDraft>(() => ({
    ...initialValues,
    rating: String(initialValues.rating),
  }));
  const [errors, setErrors] = useState<RestaurantErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.currentTarget;
    if (!isRestaurantField(name)) return;
    setDraft((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = getRestaurantErrors(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      onSave(normalizeRestaurant(draft));
    }
  }

  return (
    <form className="restaurant-editor-form" onSubmit={handleSubmit} noValidate aria-labelledby="restaurant-editor-title">
      <h2 id="restaurant-editor-title">Дані ресторану</h2>
      <div className="restaurant-editor-grid">
        {textFields.map((field) => (
          <div className={field.name === 'address' ? 'restaurant-editor-field restaurant-editor-wide' : 'restaurant-editor-field'} key={field.name}>
            <label htmlFor={`restaurant-${field.name}`}>{field.label}</label>
            <input
              id={`restaurant-${field.name}`}
              name={field.name}
              type="text"
              value={draft[field.name]}
              onChange={handleChange}
              required={field.required}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={errors[field.name] ? `restaurant-${field.name}-error` : undefined}
            />
            {errors[field.name] && <p className="restaurant-field-error" id={`restaurant-${field.name}-error`} role="alert">{errors[field.name]}</p>}
          </div>
        ))}

        <div className="restaurant-editor-field">
          <label htmlFor="restaurant-rating">Рейтинг</label>
          <input
            id="restaurant-rating"
            name="rating"
            type="number"
            min="0"
            max="5"
            step="any"
            value={draft.rating}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.rating)}
            aria-describedby={errors.rating ? 'restaurant-rating-error' : undefined}
          />
          {errors.rating && <p className="restaurant-field-error" id="restaurant-rating-error" role="alert">{errors.rating}</p>}
        </div>

        <div className="restaurant-editor-field restaurant-editor-wide">
          <label htmlFor="restaurant-image">Зображення будівлі</label>
          <input
            id="restaurant-image"
            name="image"
            type="text"
            value={draft.image}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.image)}
            aria-describedby={errors.image ? 'restaurant-image-hint restaurant-image-error' : 'restaurant-image-hint'}
          />
          <p className="restaurant-editor-hint" id="restaurant-image-hint">Посилання http/https або шлях до файлу, наприклад images/restaurant-building.jpg.</p>
          {errors.image && <p className="restaurant-field-error" id="restaurant-image-error" role="alert">{errors.image}</p>}
        </div>

        <div className="restaurant-editor-field restaurant-editor-wide">
          <label htmlFor="restaurant-description">Короткий опис</label>
          <textarea
            id="restaurant-description"
            name="description"
            value={draft.description}
            onChange={handleChange}
            rows={4}
          />
        </div>
      </div>

      <div className="restaurant-editor-actions">
        <button className="restaurant-editor-primary" type="submit">Зберегти зміни</button>
        <button className="restaurant-editor-secondary" type="button" onClick={onCancel}>Скасувати</button>
      </div>
    </form>
  );
}

RestaurantForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    cuisine: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
