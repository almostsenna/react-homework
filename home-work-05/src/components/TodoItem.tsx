import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={todo.completed ? "todo-item completed" : "todo-item"}>
      <label className="todo-label">
        <input
          className="todo-checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span>{todo.text}</span>
      </label>
      <button
        className="delete-button"
        type="button"
        aria-label={`Видалити задачу «${todo.text}»`}
        onClick={() => onDelete(todo.id)}
      >
        Видалити
      </button>
    </li>
  );
}
