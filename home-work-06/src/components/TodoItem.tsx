import clsx from "clsx";
import { priorityLabels } from "../types";
import type { Todo } from "../types";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  now: number;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const deadlineFormat = new Intl.DateTimeFormat("uk-UA", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function TodoItem({ todo, now, onToggle, onDelete }: TodoItemProps) {
  const deadline = todo.date ? new Date(todo.date) : undefined;
  const isOverdue = !todo.completed && deadline !== undefined && deadline.getTime() < now;

  return (
    <li className={clsx(styles.card, styles[todo.priority], {
      [styles.completed]: todo.completed,
      [styles.overdue]: isOverdue,
    })}>
      <label className={styles.task}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className={styles.text}>{todo.text}</span>
      </label>

      <div className={styles.meta}>
        <span className={styles.priority}>{priorityLabels[todo.priority]}</span>
        {deadline && <time dateTime={todo.date}>{deadlineFormat.format(deadline)}</time>}
        {isOverdue && <span className={styles.warning}>Прострочено</span>}
      </div>

      <button
        type="button"
        className={styles.delete}
        aria-label={`Видалити задачу «${todo.text}»`}
        title="Видалити задачу"
        onClick={() => onDelete(todo.id)}
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  );
}
