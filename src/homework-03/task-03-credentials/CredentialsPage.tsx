import type { Credentials, CredentialField } from './types';

import { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import CredentialsForm from './components/CredentialsForm';
import CredentialsDetails from './components/CredentialsDetails';
import '../styles.css';

export default function CredentialsPage() {
  const [credentials, setCredentials] = useState<Credentials>({ login: '', password: '' });
  const [isEditing, setIsEditing] = useState(true);

  function handleChange(field: CredentialField, value: string) {
    setCredentials((previous) => ({ ...previous, [field]: value }));
  }

  function handleSave() {
    setCredentials((previous) => ({ ...previous, login: previous.login.trim() }));
    setIsEditing(false);
  }

  function handleReset() {
    setCredentials({ login: '', password: '' });
    setIsEditing(true);
  }

  return (
    <div className="credentials-page task-page">
      <PageTitle eyebrow="Навчальна форма" title="Логін і пароль" description="Введіть дані, перегляньте їх і за потреби змініть." />
      {isEditing ? (
        <CredentialsForm credentials={credentials} onChange={handleChange} onSave={handleSave} />
      ) : (
        <CredentialsDetails credentials={credentials} onEdit={() => setIsEditing(true)} onReset={handleReset} />
      )}
      <p className="credentials-note">Після виходу із завдання або оновлення сторінки дані очистяться.</p>
    </div>
  );
}
