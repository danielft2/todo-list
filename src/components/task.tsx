import { useRef, useState, useEffect } from "react";
import { Task as TaskType } from "../types/task";
import { Trash2 } from "lucide-react";

type TaskProps = {
  data: TaskType;
  onToggle: (id: number) => void;
  onUpdate: (id: number, name: string) => void;
  onDelete: (id: number) => void;
};

export function Task({
  data: todo,
  onToggle: handleToggleTask,
  onUpdate,
  onDelete,
}: TaskProps) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [newTask, setNewTask] = useState(todo.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isUpdated && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(newTask.length, newTask.length);
    }
  }, [isUpdated, newTask]);

  function handleUpdateTask() {
    setIsUpdated((prev) => !prev);
    setNewTask(todo.name);
  }

  function handleBlur() {
    setIsUpdated(false);
    onUpdate(todo.id, newTask);
  }

  return (
    <div className="w-full bg-zinc-900 rounded-md px-5 py-3 space-y-4 flex items-center justify-between">
      {!isUpdated && (
        <div className="flex items-center space-x-2 mb-0">
          <button className="cursor-pointer" onClick={() => onDelete(todo.id)}>
            <Trash2 className="text-red-600" size={14} />
          </button>
          <h1
            className="text-zinc-300 text-sm font-medium mb-0 
            data-[completed=true]:line-through data-[completed=true]:text-zinc-500 cursor-pointer"
            data-completed={todo.completed}
            onDoubleClick={handleUpdateTask}
          >
            {todo.name}
          </h1>
        </div>
      )}

      {isUpdated && (
        <input
          type="text"
          className="text-sm text-zinc-50 focus:border-none focus:outline-none mb-0"
          ref={inputRef}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onBlur={handleBlur}
        />
      )}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleToggleTask(todo.id)}
      />
    </div>
  );
}
