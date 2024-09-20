import React, {useState} from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTodos([...todos, task]);
      setTask('');
    }
  }

  const deleteTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input 
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder='Enter task...'
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index} className='todo'>
            {todo}
            <button onClick={() => deleteTask(index)} className='delete-btn'>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
