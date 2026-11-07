interface TimeSegmentProps {
  value: string;
  label: string;
}

export default function TimeSegment({ value, label }: TimeSegmentProps) {
  return (
    <span className="time-segment">
      <strong>{value}</strong>
      <span>{label}</span>
    </span>
  );
}
