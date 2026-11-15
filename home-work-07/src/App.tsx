import styled from "styled-components";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { Counter } from "./components/Counter";
import { TodoList } from "./components/TodoList";
import type { Priority, Task } from "./types";

const Page = styled.div`
  --ink: #20263d;
  --muted: #515c76;
  --line: #dce2ed;
  --accent: #4c47ad;
  --accent-dark: #3c3591;
  --focus: #6159ca;

  min-height: 100vh;
  padding: clamp(14px, 5vw, 56px) clamp(12px, 4vw, 32px);
  color: var(--ink);
  background: linear-gradient(150deg, #e3e9f9, #f4f6fc 58%, #ebeff8);
  line-height: 1.5;
`;

const Container = styled.main`
  width: 100%;
  max-width: 670px;
  margin-inline: auto;
  padding: clamp(16px, 4.5vw, 38px);
  border: 1px solid #e2e7f2;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 18px 55px rgba(49, 61, 107, 0.12);
`;

const STORAGE_KEY = "task-list-pv511:tasks";

function dateForInput(date: Date) {
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function sampleDeadline(daysFromToday: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  return dateForInput(date);
}

function createSampleTasks(): Task[] {
  return [
    {
      id: 1,
      text: "Підготувати практичне завдання зі стилізації компонентів",
      completed: false,
      priority: "high",
      date: sampleDeadline(-3),
    },
    {
      id: 2,
      text: "Розробити структуру компонентів Header, TaskForm, Counter і TodoList",
      completed: true,
      priority: "normal",
      date: sampleDeadline(-1),
    },
    {
      id: 3,
      text: "Оформити завдання за допомогою styled-components",
      completed: false,
      priority: "low",
      date: sampleDeadline(5),
    },
  ];
}

function isTask(value: unknown): value is Task {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    (typeof value.id === "string" || typeof value.id === "number") &&
    "text" in value &&
    typeof value.text === "string" &&
    "completed" in value &&
    typeof value.completed === "boolean" &&
    "priority" in value &&
    (value.priority === "low" || value.priority === "normal" || value.priority === "high") &&
    (!("date" in value) || (typeof value.date === "string" && /^\d{4,}-\d{2}-\d{2}$/.test(value.date)))
  );
}

function loadTasks(): Task[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const parsed: unknown = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed.filter(isTask);
    }
  } catch {
    // У разі недоступного сховища можна працювати з демозадачами.
  }
  return createSampleTasks();
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [today, setToday] = useState(() => dateForInput(new Date()));

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.warn("Не вдалося зберегти завдання.", error);
    }
  }, [tasks]);

  useEffect(() => {
    const timer = window.setInterval(() => setToday(dateForInput(new Date())), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  function addTask(text: string, priority: Priority, date?: string) {
    const timestamp = Date.now();
    setTasks((previous) => {
      const id = previous.reduce((next, task) => {
        return typeof task.id === "number" ? Math.max(next, task.id + 1) : next;
      }, timestamp);
      return [...previous, { id, text, priority, date, completed: false }];
    });
    setToday(dateForInput(new Date()));
  }

  function toggleTask(id: Task["id"]) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
    setToday(dateForInput(new Date()));
  }

  function deleteTask(id: Task["id"]) {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  return (
    <Page>
      <Container>
        <Header />
        <TaskForm onAdd={addTask} />
        <Counter total={total} completed={completed} />
        <TodoList tasks={tasks} today={today} onToggle={toggleTask} onDelete={deleteTask} />
      </Container>
    </Page>
  );
}

export default App;
