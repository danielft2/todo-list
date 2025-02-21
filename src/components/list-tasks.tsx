type ListTasksProps = {
  children: React.ReactNode;
  title: string;
}

export function ListTasks({ children, title }: ListTasksProps) {
  return (
    <div className="space-y-4">
      <span className="text-zinc-500 text-xs block font-semibold">
        {title.toLocaleUpperCase()}
      </span>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}
