import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.icon} aria-hidden="true">✓</span>
      <div className={styles.heading}>
        <h1 className={styles.title}>Todo List</h1>
        <p className={styles.subtitle}>Організуй свої щоденні справи та завдання</p>
      </div>
    </header>
  );
}
