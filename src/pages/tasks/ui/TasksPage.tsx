'use client';

interface TasksPageProps {
  className?: string;
}

function TasksPage({ className }: TasksPageProps) {
  return <div className={className}>Мои задачи</div>;
}

export { TasksPage };
