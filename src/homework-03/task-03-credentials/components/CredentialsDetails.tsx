import type { Credentials } from '../types';

import { useState } from 'react';
import PropTypes from 'prop-types';
import checkProps from '../../../utils/checkProps';

interface CredentialsDetailsProps {
  credentials: Credentials;
  onEdit: () => void;
  onReset: () => void;
}

export default function CredentialsDetails(props: CredentialsDetailsProps) {
  checkProps(CredentialsDetails, props);
  const { credentials, onEdit, onReset } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="credentials-card credentials-result" aria-labelledby="credentials-result-title">
      <p className="credentials-step">Крок 2 / Перегляд даних</p>
      <h2 id="credentials-result-title">Збережені дані</h2>

      <dl className="saved-credentials">
        <div><dt>Логін</dt><dd>{credentials.login}</dd></div>
        <div>
          <dt>Пароль</dt>
          <dd className="saved-password">
            <span className="secret-value" id="saved-password" aria-label={showPassword ? undefined : 'Пароль приховано'}>
              {showPassword ? credentials.password : '••••••••'}
            </span>
            <button className="password-toggle" type="button" aria-pressed={showPassword} aria-controls="saved-password" onClick={() => setShowPassword((previous) => !previous)}>
              {showPassword ? 'Приховати пароль' : 'Показати пароль'}
            </button>
          </dd>
        </div>
      </dl>

      <div className="credentials-actions">
        <button className="credentials-primary" type="button" onClick={onEdit}>Редагувати дані</button>
        <button className="credentials-secondary" type="button" onClick={onReset}>Очистити</button>
      </div>
      <p className="credentials-note">Поверніться до редагування, щоб змінити логін або пароль.</p>
    </section>
  );
}

CredentialsDetails.propTypes = {
  credentials: PropTypes.shape({
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
