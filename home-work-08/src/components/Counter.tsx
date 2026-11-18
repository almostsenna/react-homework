import styled from "styled-components";
import type { FilterStatus } from "../types";

interface CounterProps {
  total: number;
  completed: number;
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

const Statistics = styled.section`
  display: grid;
  gap: 14px;
  margin: 22px 0;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(6px, 2vw, 10px);
`;

const statColors = {
  total: { border: "#e2e8f4", text: "#31476c", background: "#f0f4fb" },
  active: { border: "#e7e2f9", text: "#4a3978", background: "#f2effb" },
  completed: { border: "#dcece3", text: "#265e47", background: "#edf7f1" },
};

const StatCard = styled.button<{ $tone: keyof typeof statColors; $selected: boolean }>`
  display: grid;
  gap: 3px;
  padding: 10px clamp(8px, 2.5vw, 13px);
  border: 1px solid ${({ $tone, $selected }) => $selected ? "var(--accent)" : statColors[$tone].border};
  border-radius: 10px;
  color: ${({ $tone }) => statColors[$tone].text};
  background: ${({ $tone }) => statColors[$tone].background};
  text-align: left;
  cursor: pointer;
  box-shadow: ${({ $selected }) => $selected ? "0 0 0 2px #ded9fa" : "none"};
  transform: ${({ $selected }) => $selected ? "translateY(-2px)" : "none"};
  transition: transform 150ms ease, box-shadow 150ms ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--focus);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const StatLabel = styled.span`
  font-size: 0.78rem;
  font-weight: 680;
`;

const StatValue = styled.strong`
  font-size: clamp(1.25rem, 4vw, 1.55rem);
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
`;

const Progress = styled.div`
  display: grid;
  gap: 6px;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 620;

  & strong {
    color: var(--accent-dark);
    font-variant-numeric: tabular-nums;
  }
`;

const ProgressTrack = styled.div`
  overflow: hidden;
  height: 8px;
  border-radius: 999px;
  background: #eeedf6;
`;

const ProgressFill = styled.div<{ $percentage: number }>`
  width: ${({ $percentage }) => $percentage}%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #5449bb, #8983d8);
  transition: width 280ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export function Counter({ total, completed, currentFilter, onFilterChange }: CounterProps) {
  const active = Math.max(0, total - completed);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Statistics aria-label="Статистика та фільтри">
      <StatGrid>
        <StatCard
          type="button"
          $tone="total"
          $selected={currentFilter === "all"}
          aria-pressed={currentFilter === "all"}
          title="Показати всі завдання"
          onClick={() => onFilterChange("all")}
        >
          <StatLabel>Всього</StatLabel>
          <StatValue>{total}</StatValue>
        </StatCard>
        <StatCard
          type="button"
          $tone="active"
          $selected={currentFilter === "active"}
          aria-pressed={currentFilter === "active"}
          title="Показати тільки активні"
          onClick={() => onFilterChange("active")}
        >
          <StatLabel>В процесі</StatLabel>
          <StatValue>{active}</StatValue>
        </StatCard>
        <StatCard
          type="button"
          $tone="completed"
          $selected={currentFilter === "completed"}
          aria-pressed={currentFilter === "completed"}
          title="Показати тільки виконані"
          onClick={() => onFilterChange("completed")}
        >
          <StatLabel>Виконано</StatLabel>
          <StatValue>{completed}</StatValue>
        </StatCard>
      </StatGrid>

      <Progress>
        <ProgressInfo>
          <span id="task-progress-label">Прогрес виконання</span>
          <strong>{percentage}%</strong>
        </ProgressInfo>
        <ProgressTrack
          role="progressbar"
          aria-labelledby="task-progress-label"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
        >
          <ProgressFill $percentage={percentage} />
        </ProgressTrack>
      </Progress>
    </Statistics>
  );
}
