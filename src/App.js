import React, {useState} from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

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

  const editTask = (index) => {
    setIsEditing(true);
    setCurrentTask({index, text: todos[index] })
  }

  const updateTask = () => {
    const updatedTodos = todos.map((todo, i) => 
    i === currentTask.index ? currentTask.text : todo
  );
    setTodos(updatedTodos);
    setIsEditing(false);
    setCurrentTask({});
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input 
        type="text"
        value={isEditing ? currentTask.text : task}
        onChange={(e) => 
          isEditing 
            ? setCurrentTask({...currentTask, text: e.target.value})
            : setTask(e.target.value)
        }
        placeholder='Enter task...'
      />
      {isEditing ? (
        <button onClick={updateTask}>Update Task</button>
      ) : (
        <button onClick={addTask}>Add Task</button>
      )}

      <ul>
        {todos.map((todo, index) => (
          <li key={index} className='todo'>
            {todo}
            <button onClick={() => deleteTask(index)} className='delete-btn'>Delete</button>
            <button onClick={() => editTask(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
