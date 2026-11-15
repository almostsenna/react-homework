import styled from "styled-components";

interface CounterProps {
  total: number;
  completed: number;
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

const StatCard = styled.div<{ $tone: keyof typeof statColors }>`
  display: grid;
  gap: 3px;
  padding: 10px clamp(8px, 2.5vw, 13px);
  border: 1px solid ${({ $tone }) => statColors[$tone].border};
  border-radius: 10px;
  color: ${({ $tone }) => statColors[$tone].text};
  background: ${({ $tone }) => statColors[$tone].background};
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

export function Counter({ total, completed }: CounterProps) {
  const active = Math.max(0, total - completed);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Statistics aria-label="Статистика завдань" aria-live="polite">
      <StatGrid>
        <StatCard $tone="total">
          <StatLabel>Всього</StatLabel>
          <StatValue>{total}</StatValue>
        </StatCard>
        <StatCard $tone="active">
          <StatLabel>В процесі</StatLabel>
          <StatValue>{active}</StatValue>
        </StatCard>
        <StatCard $tone="completed">
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
