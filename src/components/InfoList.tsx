import type { ReactNode } from 'react';

interface InfoListProps {
  items: { id: string; label: string; value: ReactNode }[];
}

export default function InfoList({ items }: InfoListProps) {
  return (
    <dl className="info-list">
      {items.map((item) => (
        <div key={item.id}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
