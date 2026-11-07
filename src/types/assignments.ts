export type TaskId =
  | 'city'
  | 'book'
  | 'movie'
  | 'profile'
  | 'clock'
  | 'pet'
  | 'restaurant'
  | 'credentials'
  | 'restaurant-editor';

export interface Assignment {
  id: TaskId;
  number: string;
  title: string;
}

export interface Homework {
  id: string;
  title: string;
  topic: string;
  tasks: Assignment[];
}
