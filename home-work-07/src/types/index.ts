export type Priority = "low" | "normal" | "high";

export interface Task {
  id: number | string;
  text: string;
  completed: boolean;
  priority: Priority;
  date?: string;
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Низький",
  normal: "Звичайний",
  high: "Високий",
};
