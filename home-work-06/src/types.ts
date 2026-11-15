export type Priority = "low" | "normal" | "high";

export const priorityLabels: Record<Priority, string> = {
  low: "Низький",
  normal: "Звичайний",
  high: "Високий",
};

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  date?: string;
}

export type SortOrder = "none" | "asc" | "desc";
export type StatusFilter = "all" | "active" | "completed";
