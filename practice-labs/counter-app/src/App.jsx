import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete React useState practice', completed: true },
    { id: 2, text: 'Build interactive counter UI', completed: false },
  ]);
  const [taskInput, setTaskInput] = useState('');

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));
  const handleReset = () => setCount(0);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    const newTask = {
      id: Date.now(),
      text: taskInput.trim(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setTaskInput('');
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <h1>Practice Lab 1: Counter & Tasks</h1>

      {/* Counter Component */}
      <div className="counter-card">
        <div className="count-display">{count}</div>
        <div className="btn-group">
          <button className="btn-secondary" onClick={handleDecrement}>- Decrement</button>
          <button className="btn-secondary" onClick={handleReset}>Reset</button>
          <button className="btn-primary" onClick={handleIncrement}>+ Increment</button>
        </div>
      </div>

      {/* Task Manager Component */}
      <div className="task-section">
        <h3>Task Manager</h3>
        <form className="input-row" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button type="submit" className="btn-primary">Add Task</button>
        </form>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span
                style={{ cursor: 'pointer' }}
                className={task.completed ? 'task-done' : ''}
                onClick={() => handleToggleTask(task.id)}
              >
                {task.completed ? '✓ ' : '○ '} {task.text}
              </span>
              <button
                className="btn-danger"
                style={{ padding: '4px 8px', fontSize: '12px' }}
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
