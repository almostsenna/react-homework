interface CounterProps {
  total: number;
  completed: number;
}

export function Counter({ total, completed }: CounterProps) {
  return (
    <div className="counter" aria-live="polite">
      <span className="counter-label">Задач: {total} (виконано: {completed})</span>
    </div>
  );
}
