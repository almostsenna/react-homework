import type { ComponentType } from 'react';
import type { TaskId } from './types/assignments';

import { useEffect, useState } from 'react';
import TaskNavigation from './components/TaskNavigation';
import { homeworks } from './data/assignments';
import CityPage from './homework-01/task-01-city/CityPage';
import BookPage from './homework-01/task-03-book/BookPage';
import MoviePage from './homework-02/task-01-movie/MoviePage';
import ProfilePage from './homework-02/task-02-profile/ProfilePage';
import ClockPage from './homework-02/task-03-clock/ClockPage';
import PetPage from './homework-02/task-04-pet/PetPage';
import RestaurantPage from './homework-03/task-01-restaurant/RestaurantPage';
import CredentialsPage from './homework-03/task-03-credentials/CredentialsPage';
import EditableRestaurantPage from './homework-04/task-02-editable-restaurant/EditableRestaurantPage';

// Ключі збігаються з id завдань у файлі assignments.js.
const pages: Record<TaskId, ComponentType> = {
  city: CityPage,
  book: BookPage,
  movie: MoviePage,
  profile: ProfilePage,
  clock: ClockPage,
  pet: PetPage,
  restaurant: RestaurantPage,
  credentials: CredentialsPage,
  'restaurant-editor': EditableRestaurantPage,
};

function isTaskId(value: string): value is TaskId {
  return Object.hasOwn(pages, value);
}

function getTaskFromHash(): TaskId {
  if (typeof window === 'undefined') return 'city';
  const taskId = window.location.hash.slice(1);
  return isTaskId(taskId) ? taskId : 'city';
}

export default function App() {
  const [activeTask, setActiveTask] = useState<TaskId>(getTaskFromHash);

  useEffect(() => {
    function handleHashChange() {
      setActiveTask(getTaskFromHash());
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const homework = homeworks.find((item) => item.tasks.some((task) => task.id === activeTask));
  const task = homework?.tasks.find((item) => item.id === activeTask);
  const ActivePage = pages[activeTask];
  const taskCount = homeworks.reduce((total, item) => total + item.tasks.length, 0);

  useEffect(() => {
    document.title = `${task?.title ?? 'React Homework'} | React Homework`;
    window.scrollTo(0, 0);
  }, [task?.title]);

  if (!homework || !task) return <p>Завдання не знайдено.</p>;

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content" onClick={(event) => {
        event.preventDefault();
        document.getElementById('main-content')?.focus();
      }}>
        Перейти до вмісту
      </a>

      <TaskNavigation homeworks={homeworks} activeTask={activeTask} />

      <main className="main-content" id="main-content" tabIndex={-1}>
        <div className="page-toolbar">
          <p>{homework.title}<span aria-hidden="true"> / </span>Завдання {task.number}</p>
          <span className="task-total">{taskCount} завдань</span>
        </div>
        <ActivePage />
      </main>
    </div>
  );
}
