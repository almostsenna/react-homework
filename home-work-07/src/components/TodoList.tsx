import styled from "styled-components";
import type { Task } from "../types";
import { TodoItem } from "./TodoItem";

const List = styled.ul`
  display: grid;
  gap: 10px;
  list-style: none;
`;

const EmptyList = styled.div`
  padding: 25px 14px;
  border: 1px dashed #cdd5e8;
  border-radius: 12px;
  background: #f8f9fd;
  text-align: center;
`;

const EmptyTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
`;

const EmptyHint = styled.p`
  margin-top: 4px;
  color: var(--muted);
  font-size: 0.85rem;
`;

interface TodoListProps {
  tasks: Task[];
  today: string;
  onToggle: (id: Task["id"]) => void;
  onDelete: (id: Task["id"]) => void;
}

export function TodoList({ tasks, today, onToggle, onDelete }: TodoListProps) {
  if (tasks.length === 0) {
    return (
      <EmptyList role="status">
        <EmptyTitle>Список завдань порожній</EmptyTitle>
        <EmptyHint>Додайте завдання у формі вище.</EmptyHint>
      </EmptyList>
    );
  }

  return (
    <List aria-label="Завдання">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          today={today}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
}
