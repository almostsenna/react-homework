import type { Homework, TaskId } from '../types/assignments';

interface TaskNavigationProps {
  homeworks: Homework[];
  activeTask: TaskId;
}

export default function TaskNavigation({ homeworks, activeTask }: TaskNavigationProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-symbol" aria-hidden="true">R.</span>
        <div>
          <p className="brand-title">React Homework</p>
          <p className="brand-subtitle">Навчальні проєкти</p>
        </div>
      </div>

      <nav className="task-navigation" aria-label="Домашні завдання">
        {homeworks.map((homework) => (
          <section className="navigation-group" key={homework.id}>
            <h2>{homework.title}</h2>
            <p className="navigation-topic">{homework.topic}</p>
            <ul className="task-links">
              {homework.tasks.map((task) => (
                <li key={task.id}>
                  <a
                    href={`#${task.id}`}
                    className={activeTask === task.id ? 'task-link active' : 'task-link'}
                    aria-current={activeTask === task.id ? 'page' : undefined}
                  >
                    <span className="task-number">{task.number.padStart(2, '0')}</span>
                    <span>{task.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>

      <p className="sidebar-footer">Домашніх робіт: {homeworks.length}.<br />Один React-проєкт.</p>
    </aside>
  );
}
