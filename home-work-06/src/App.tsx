import { useEffect, useState } from "react";
import { Counter } from "./components/Counter";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { TodoList } from "./components/TodoList";
import type { Priority, SortOrder, StatusFilter, Todo } from "./types";
import styles from "./App.module.css";

type SavedTodo = Pick<Todo, "id" | "text" | "completed"> & {
  priority?: unknown;
  date?: unknown;
};

function isSavedTodo(value: unknown): value is SavedTodo {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number" &&
    "text" in value &&
    typeof value.text === "string" &&
    "completed" in value &&
    typeof value.completed === "boolean"
  );
}

function isPriority(value: unknown): value is Priority {
  return value === "low" || value === "normal" || value === "high";
}

function loadTodos(): Todo[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem("todos") ?? "[]");
    if (!Array.isArray(saved)) return [];

    // Задачі з ДЗ №5 не мали пріоритету й дедлайну.
    return saved.filter(isSavedTodo).map((todo) => ({
      ...todo,
      priority: isPriority(todo.priority) ? todo.priority : "normal",
      date: typeof todo.date === "string" && Number.isFinite(Date.parse(todo.date))
        ? todo.date
        : undefined,
    }));
  } catch {
    return [];
  }
}

const nextSortOrder: Record<SortOrder, SortOrder> = {
  none: "asc",
  asc: "desc",
  desc: "none",
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [now, setNow] = useState(Date.now);

  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const visibleTodos = statusFilter === "all"
    ? todos
    : todos.filter((todo) => todo.completed === (statusFilter === "completed"));
  const displayedTodos = sortOrder === "none"
    ? visibleTodos
    : [...visibleTodos].sort((a, b) =>
        sortOrder === "asc"
          ? a.text.localeCompare(b.text, "uk")
          : b.text.localeCompare(a.text, "uk"),
      );

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.warn("Не вдалося зберегти задачі.", error);
    }
  }, [todos]);

  useEffect(() => {
    document.title = `Задач: ${total} | Todo App`;
  }, [total]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  function addTodo(text: string, priority: Priority, date?: string) {
    const timestamp = Date.now();
    setTodos((previous) => {
      const id = previous.reduce((next, todo) => Math.max(next, todo.id + 1), timestamp);
      return [...previous, { id, text, completed: false, priority, date }];
    });
    setNow(timestamp);
  }

  function toggleTodo(id: number) {
    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
    setNow(Date.now());
  }

  function deleteTodo(id: number) {
    setTodos((previous) => previous.filter((todo) => todo.id !== id));
  }

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <Header />
        <TaskForm onAdd={addTodo} />
        <Counter total={total} completed={completed} />
        <TodoList
          todos={displayedTodos}
          now={now}
          sortOrder={sortOrder}
          statusFilter={statusFilter}
          onSort={() => setSortOrder((previous) => nextSortOrder[previous])}
          onFilter={setStatusFilter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </main>
    </div>
  );
}
