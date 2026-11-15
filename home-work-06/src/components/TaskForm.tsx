import { useState } from "react";
import type { FormEvent } from "react";
import { priorityLabels } from "../types";
import type { Priority } from "../types";
import styles from "./TaskForm.module.css";

interface TaskFormProps {
  onAdd: (text: string, priority: Priority, date?: string) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState<Priority>("normal");
  const [date, setDate] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    onAdd(text, priority, date || undefined);
    setInputValue("");
    setPriority("normal");
    setDate("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="task-text">Нова задача</label>
        <input
          id="task-text"
          className={styles.input}
          type="text"
          placeholder="Що потрібно зробити?"
          autoComplete="off"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          required
        />
      </div>
      <div className={styles.controls}>
        <div className={styles.field}>
          <label htmlFor="task-priority">Пріоритет</label>
          <select
            id="task-priority"
            className={styles.input}
            value={priority}
            onChange={(event) => setPriority(event.target.value as Priority)}
          >
            <option value="low">{priorityLabels.low}</option>
            <option value="normal">{priorityLabels.normal}</option>
            <option value="high">{priorityLabels.high}</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="task-deadline">Дедлайн</label>
          <input
            id="task-deadline"
            className={styles.input}
            type="datetime-local"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <button className={styles.add} type="submit">
          <span aria-hidden="true">＋</span> Додати
        </button>
      </div>
    </form>
  );
}
