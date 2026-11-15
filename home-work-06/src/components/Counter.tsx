import styles from "./Counter.module.css";

interface CounterProps {
  total: number;
  completed: number;
}

export function Counter({ total, completed }: CounterProps) {
  return (
    <section className={styles.counter} aria-label="Статистика завдань" aria-live="polite">
      <div className={styles.total}>
        <span>Усього задач</span>
        <strong>{total}</strong>
      </div>
      <div className={styles.completed}>
        <span>Виконано</span>
        <strong>{completed}</strong>
      </div>
    </section>
  );
}
