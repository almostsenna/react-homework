import type { ChangeEvent, FormEvent } from 'react';
import type { Credentials, CredentialField, CredentialErrors } from '../types';

import { useState } from 'react';
import PropTypes from 'prop-types';
import checkProps from '../../../utils/checkProps';

interface CredentialsFormProps {
  credentials: Credentials;
  onChange: (field: CredentialField, value: string) => void;
  onSave: () => void;
}

export default function CredentialsForm(props: CredentialsFormProps) {
  checkProps(CredentialsForm, props);
  const { credentials, onChange, onSave } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<CredentialErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    if (name !== 'login' && name !== 'password') return;
    onChange(name, value);
    setErrors((previous) => ({ ...previous, [name]: '' }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: CredentialErrors = {};

    if (!credentials.login.trim()) {
      nextErrors.login = 'Введіть логін.';
    }
    if (!credentials.password) {
      nextErrors.password = 'Введіть пароль.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onSave();
    }
  }

  return (
    <form className="credentials-card" onSubmit={handleSubmit} noValidate>
      <p className="credentials-step">Крок 1 / Введення та редагування</p>
      <h2>Ваші дані</h2>

      <div className="credentials-field">
        <label htmlFor="credentials-login">Логін</label>
        <input
          id="credentials-login"
          name="login"
          type="text"
          value={credentials.login}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Наприклад, almostsenna"
          required
          aria-invalid={Boolean(errors.login)}
          aria-describedby={errors.login ? 'credentials-login-error' : undefined}
        />
        {errors.login && <p className="field-error" id="credentials-login-error" role="alert">{errors.login}</p>}
      </div>

      <div className="credentials-field">
        <label htmlFor="credentials-password">Пароль</label>
        <div className="password-input-row">
          <input
            id="credentials-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={credentials.password}
            onChange={handleChange}
            autoComplete="new-password"
            placeholder="Введіть пароль"
            required
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'credentials-password-error' : undefined}
          />
          <button className="password-toggle" type="button" aria-pressed={showPassword} aria-controls="credentials-password" onClick={() => setShowPassword((previous) => !previous)}>
            {showPassword ? 'Приховати пароль' : 'Показати пароль'}
          </button>
        </div>
        {errors.password && <p className="field-error" id="credentials-password-error" role="alert">{errors.password}</p>}
      </div>

      <button className="credentials-primary" type="submit">Зберегти дані</button>
    </form>
  );
}

CredentialsForm.propTypes = {
  credentials: PropTypes.shape({
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
