import type { FormEvent } from "react";
import type { SortOrder } from "../types";

interface TaskFormProps {
  inputValue: string;
  sortOrder: SortOrder;
  onChange: (value: string) => void;
  onAdd: () => void;
  onSort: () => void;
}

const sortLabels: Record<SortOrder, string> = {
  none: "Сортувати",
  asc: "Сортувати А–Я",
  desc: "Сортувати Я–А",
};

export function TaskForm({ inputValue, sortOrder, onChange, onAdd, onSort }: TaskFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAdd();
  }

  return (
    <form className="controls" onSubmit={handleSubmit}>
      <input
        id="todo-input"
        type="text"
        aria-label="Нова задача"
        placeholder="Що потрібно зробити?"
        value={inputValue}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
        required
      />
      <button id="add-button" type="submit">
        <span className="btn-icon" aria-hidden="true">＋</span>
        Додати
      </button>
      <button id="sort-button" type="button" onClick={onSort}>
        <span className="btn-icon" aria-hidden="true">⇅</span>
        {sortLabels[sortOrder]}
      </button>
    </form>
  );
}
