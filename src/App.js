import logo from './logo.svg'
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, {text: task, completed: false}]);
  }

  const editTask = (index, event) => {
    const newTaskText = event.target.value;
    const newTasks = [...tasks];
    newTasks[index].text = newTaskText;
    setTasks(newTasks);
  }

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks);
  }

  const toggleCompleted = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  }
  return (
    <div className="App">
      <img src={logo} className='App-logo' alt='' />
      <h1>Todo List</h1>
      <form>
        <input type="text" placeholder="Add a task" />
        <button type="submit" onClick={(e) => {
          e.preventDefault();
          const taskText = e.target.previousSibling.value;
          addTask(taskText);
        }}>Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => {
          return (
            <li key={index}>
              <input type="text" value={task.text} onChange={(e) => editTask(index, e.target.value)} />
              <button onClick={() => removeTask(index)}>Delete</button>
              <button onClick={() => toggleCompleted(index)}>{task.completed ? 'Incomplete':'Complete'}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
