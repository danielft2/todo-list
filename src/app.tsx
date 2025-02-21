import { useEffect, useState } from "react";
import { Task } from "./components/task";
import { ListTasks } from "./components/list-tasks";

type Todo = {
  id: number;
  name: string;
  completed: boolean;
};

export function App() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");

  const completedTasks = tasks.filter((todo) => todo.completed);
  const uncompletedTasks = tasks.filter((todo) => !todo.completed);
  const today = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  function handleNewTask() {
    const alredyExists = tasks.some((todo) => todo.name === newTask);
    if (alredyExists) {
      alert("Tarefa já existe");
      return;
    }

    const task = {
      id: Math.random(),
      name: newTask.trim(),
      completed: false,
    };

    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));  
    setTasks((prev) => [...prev, task]);
    setNewTask("");
  }

  function handleToggleTask(id: number) {
    setTasks((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleUpdateTask(id: number, name: string) {
    const tasksUpdated = tasks.map((todo) => (todo.id === id ? { ...todo, name } : todo))
    localStorage.setItem("tasks", JSON.stringify(tasksUpdated)); 
    setTasks(tasksUpdated)
  }

  function handleDeleteTask(id: number) {
    const tasksUpdated = tasks.filter((todo) => todo.id !== id)
    localStorage.setItem("tasks", JSON.stringify(tasksUpdated)); 
    setTasks(tasksUpdated)
  }

  function handleCompleteAllTasks() {
    setTasks((prev) => prev.map((todo) => ({ ...todo, completed: true })));
  }

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <main className="h-screen flex items-center justify-center bg-zinc-950">
      <div className="max-w-[500px] w-full space-y-9">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Alien%20Monster.png"
              alt="Alien Monster"
              width="25"
              height="25"
            />
            <h1 className="font-semibold text-zinc-50 text-2xl">Todo List</h1>
          </div>
          <span className="text-zinc-300 ml-1 text-sm">{today}</span>
        </div>
        <div className="space-x-2 flex items-start">
          <div className="flex-1 flex flex-col items-start space-y-2">
            <input
              type="text"
              className="w-full bg-zinc-950 px-4 min-h-9 rounded-md border border-zinc-800 
              text-zinc-300 text-sm focus:outline-zinc-800 focus:border-zinc-800"
              placeholder="Nova tarefa"
              value={newTask}
              maxLength={40}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button
              className="text-xs underline text-zinc-400 cursor-pointer hover:text-zinc-50 
              disabled:opacity-50 disabled:cursor-default disabled:hover:text-zinc-400"
              onClick={handleCompleteAllTasks}
              disabled={uncompletedTasks.length === 0}
            >
              Concluir todas as tarefas
            </button>
          </div>
          <button
            className="h-9 px-4 bg-blue-700 text-zinc-100 text-sm rounded-md 
           hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 transition-colors disabled:opacity-50"
            onClick={handleNewTask}
            disabled={!newTask}
          >
            Adicionar
          </button>
        </div>

        <div className="space-y-8">
          <ListTasks title="Pendentes">
            {uncompletedTasks.map((todo) => (
              <Task
                key={todo.id}
                data={todo}
                onToggle={handleToggleTask}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </ListTasks>
          <ListTasks title="Completas">
            {completedTasks.map((todo) => (
              <Task
                key={todo.id}
                data={todo}
                onToggle={handleToggleTask}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </ListTasks>
        </div>
      </div>
    </main>
  );
}
