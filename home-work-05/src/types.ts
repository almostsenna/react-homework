export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type SortOrder = "none" | "asc" | "desc";
