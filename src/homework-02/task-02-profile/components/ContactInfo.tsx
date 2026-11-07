interface ContactInfoProps {
  phone: string;
  email: string;
  city: string;
  github: string;
}

export default function ContactInfo({ phone, email, city, github }: ContactInfoProps) {
  return (
    <section className="surface-card" aria-labelledby="contacts-title">
      <h2 id="contacts-title">Контакти</h2>
      <dl className="contact-list">
        <div>
          <dt>Телефон</dt>
          <dd>{phone ? <a href={`tel:${phone}`}>{phone}</a> : <span className="empty-value">Не вказано</span>}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{email ? <a href={`mailto:${email}`}>{email}</a> : <span className="empty-value">Не вказано</span>}</dd>
        </div>
        <div><dt>Місто проживання</dt><dd>{city}</dd></div>
        <div><dt>GitHub</dt><dd><a href={github} target="_blank" rel="noreferrer">almostsenna ↗</a></dd></div>
      </dl>
    </section>
  );
}
