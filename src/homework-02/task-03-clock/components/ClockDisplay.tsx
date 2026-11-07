import type { ClockProps } from '../types';

import TimeSegment from './TimeSegment';

export default function ClockDisplay({ now, locale, timeZone }: ClockProps) {
  const time = new Intl.DateTimeFormat(locale, {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).format(now);

  const [hours, minutes, seconds] = time.split(':');

  return (
    <time className="clock-time" dateTime={now.toISOString()} aria-label={time}>
      <span className="clock-digits" aria-hidden="true">
        <TimeSegment value={hours} label="години" />
        <span className="time-colon">:</span>
        <TimeSegment value={minutes} label="хвилини" />
        <span className="time-colon">:</span>
        <TimeSegment value={seconds} label="секунди" />
      </span>
    </time>
  );
}
