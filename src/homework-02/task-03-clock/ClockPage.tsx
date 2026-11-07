import { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import ClockDisplay from './components/ClockDisplay';
import DateDisplay from './components/DateDisplay';

export default function ClockPage() {
  const [now, setNow] = useState<Date>(() => new Date());
  const locale = 'uk-UA';
  const timeZone = 'Europe/Kyiv';

  useEffect(() => {
    const timerId = setInterval(() => {
      // Беремо поточний час заново, щоб не накопичувати похибку лічильника.
      setNow(new Date());
    }, 1000);

    // При виході зі сторінки та повторному монтуванні таймер очищується.
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="clock-page task-page">
      <PageTitle eyebrow="Кожна секунда має значення" title="Поточний час" description="Київ, Україна · 24-годинний формат" />
      <section className="clock-face" aria-label="Годинник за київським часом">
        <div className="clock-status"><span aria-hidden="true" />Оновлення щосекунди</div>
        <ClockDisplay now={now} locale={locale} timeZone={timeZone} />
        <DateDisplay now={now} locale={locale} timeZone={timeZone} />
        <p className="clock-zone">{timeZone}</p>
      </section>
    </div>
  );
}
