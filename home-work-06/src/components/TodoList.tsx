import type { SortOrder, StatusFilter, Todo } from "../types";
import { TodoItem } from "./TodoItem";
import styles from "./TodoList.module.css";

interface TodoListProps {
  todos: Todo[];
  now: number;
  sortOrder: SortOrder;
  statusFilter: StatusFilter;
  onSort: () => void;
  onFilter: (filter: StatusFilter) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const sortLabels: Record<SortOrder, string> = {
  none: "Сортувати",
  asc: "Сортувати А–Я",
  desc: "Сортувати Я–А",
};

export function TodoList({
  todos,
  now,
  sortOrder,
  statusFilter,
  onSort,
  onFilter,
  onToggle,
  onDelete,
}: TodoListProps) {
  return (
    <section className={styles.section} aria-labelledby="task-list-heading">
      <div className={styles.toolbar}>
        <h2 id="task-list-heading" className={styles.heading}>Задачі</h2>
        <div className={styles.actions}>
          <select
            className={styles.control}
            aria-label="Статус завдань"
            value={statusFilter}
            onChange={(event) => onFilter(event.target.value as StatusFilter)}
          >
            <option value="all">Усі</option>
            <option value="active">У процесі</option>
            <option value="completed">Виконані</option>
          </select>
          <button className={styles.control} type="button" onClick={onSort}>
            {sortLabels[sortOrder]}
          </button>
        </div>
      </div>

      {todos.length === 0 ? (
        <p className={styles.empty}>
          {statusFilter === "all" ? "Список завдань порожній." : "За цим фільтром задач немає."}
        </p>
      ) : (
        <ul className={styles.list}>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} now={now} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </section>
  );
}
