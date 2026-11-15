import { useEffect, useState } from "react";
import { Counter } from "./components/Counter";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { TodoList } from "./components/TodoList";
import type { SortOrder, Todo } from "./types";

function isTodo(value: unknown): value is Todo {
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

function loadTodos(): Todo[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem("todos") ?? "[]");
    return Array.isArray(saved) ? saved.filter(isTodo) : [];
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
  const [inputValue, setInputValue] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const displayedTodos = sortOrder === "none"
    ? todos
    : [...todos].sort((a, b) =>
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

  function addTodo() {
    const text = inputValue.trim();
    if (!text) return;

    const timestamp = Date.now();
    setTodos((previous) => {
      const id = previous.reduce((next, todo) => Math.max(next, todo.id + 1), timestamp);
      return [...previous, { id, text, completed: false }];
    });
    setInputValue("");
  }

  function toggleTodo(id: number) {
    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function deleteTodo(id: number) {
    setTodos((previous) => previous.filter((todo) => todo.id !== id));
  }

  return (
    <main className="todo-app">
      <Header />
      <TaskForm
        inputValue={inputValue}
        sortOrder={sortOrder}
        onChange={setInputValue}
        onAdd={addTodo}
        onSort={() => setSortOrder((previous) => nextSortOrder[previous])}
      />
      <Counter total={total} completed={completed} />
      <TodoList todos={displayedTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </main>
  );
}
