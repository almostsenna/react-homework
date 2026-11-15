import styled from "styled-components";
import { PRIORITY_LABELS } from "../types";
import type { Priority, Task } from "../types";

const priorityColors: Record<Priority, { border: string; background: string; text: string }> = {
  low: { border: "#1ca675", background: "#e7f7ed", text: "#166047" },
  normal: { border: "#edac3f", background: "#fff3db", text: "#755009" },
  high: { border: "#e65460", background: "#fce9eb", text: "#982e3b" },
};

interface CardProps {
  $priority: Priority;
  $isCompleted: boolean;
  $isOverdue: boolean;
}

const Card = styled.li<CardProps>`
  --priority: ${({ $priority }) => priorityColors[$priority].border};
  --badge-bg: ${({ $priority }) => priorityColors[$priority].background};
  --badge-ink: ${({ $priority }) => priorityColors[$priority].text};
  --overdue-ring: ${({ $isOverdue }) => $isOverdue ? "0 0 0 1px #d9505e" : "0 0 0 transparent"};

  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 5px 8px;
  padding: 12px 10px 12px 13px;
  border: 1px solid var(--line);
  border-left: 5px solid var(--priority);
  border-radius: 11px;
  background: ${({ $isCompleted }) => $isCompleted ? "#f7f8fc" : "#fff"};
  opacity: ${({ $isCompleted }) => $isCompleted ? 0.65 : 1};
  box-shadow: var(--overdue-ring), 0 2px 5px rgba(37, 46, 78, 0.05);
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--overdue-ring), 0 4px 13px rgba(37, 46, 78, 0.13);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const TaskLabel = styled.label`
  grid-column: 1;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  flex: none;
  width: 18px;
  height: 18px;
  margin-top: 2px;
  accent-color: var(--accent);
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--focus);
    outline-offset: 2px;
  }
`;

const TaskText = styled.span<{ $isCompleted: boolean }>`
  min-width: 0;
  font-size: 0.94rem;
  font-weight: 660;
  line-height: 1.4;
  overflow-wrap: anywhere;
  color: ${({ $isCompleted }) => $isCompleted ? "#3e4860" : "inherit"};
  text-decoration: ${({ $isCompleted }) => $isCompleted ? "line-through" : "none"};
`;

const Meta = styled.div`
  grid-column: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px 8px;
  margin-left: 28px;
  color: var(--muted);
  font-size: 0.75rem;
`;

const Badge = styled.span`
  padding: 2px 7px;
  border-radius: 5px;
  font-weight: 700;
`;

const PriorityBadge = styled(Badge)`
  color: var(--badge-ink);
  background: var(--badge-bg);
`;

const OverdueBadge = styled(Badge)`
  color: #97242e;
  background: #fce5e7;
`;

const DeleteButton = styled.button`
  grid-column: 2;
  grid-row: 1 / span 2;
  min-width: 38px;
  min-height: 38px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: #f4f6fb;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 150ms ease, border-color 150ms ease;

  &:hover {
    border-color: #f5bbc3;
    background: #fce4e8;
  }

  &:focus-visible {
    outline: 2px solid var(--focus);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

interface TodoItemProps {
  task: Task;
  today: string;
  onToggle: (id: Task["id"]) => void;
  onDelete: (id: Task["id"]) => void;
}

export function TodoItem({ task, today, onToggle, onDelete }: TodoItemProps) {
  const isOverdue = !task.completed && task.date !== undefined && Date.parse(task.date) < Date.parse(today);

  return (
    <Card
      $priority={task.priority}
      $isCompleted={task.completed}
      $isOverdue={isOverdue}
    >
      <TaskLabel>
        <Checkbox
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <TaskText $isCompleted={task.completed}>{task.text}</TaskText>
      </TaskLabel>

      <Meta>
        <PriorityBadge>{PRIORITY_LABELS[task.priority]}</PriorityBadge>
        {task.date && (
          <time dateTime={task.date}>
            До {task.date.split("-").reverse().join(".")}
          </time>
        )}
        {isOverdue && <OverdueBadge>Прострочено</OverdueBadge>}
      </Meta>

      <DeleteButton
        type="button"
        title="Видалити завдання"
        aria-label={`Видалити завдання «${task.text}»`}
        onClick={() => onDelete(task.id)}
      >
        <span aria-hidden="true">🗑️</span>
      </DeleteButton>
    </Card>
  );
}
