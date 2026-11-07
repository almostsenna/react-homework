import type { ClockProps } from '../types';

export default function DateDisplay({ now, locale, timeZone }: ClockProps) {
  const date = new Intl.DateTimeFormat(locale, {
    timeZone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now);

  return <p className="clock-date">{date}</p>;
}
