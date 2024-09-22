import React, {useState} from 'react';
import './App.css';

interface Task {
  index: number
  text: string
  completed: boolean
}

function App() {
  const [task, setTask] = useState<string>('')
  const [todos, setTodos] = useState<Task[]>([])
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)

  const addTask = (): void => {
    if (task.trim()) {
    const newTask = {index: todos.length, text: task, completed: false}
    setTodos([...todos, newTask])
    setTask('')
    }
  }

  const deleteTask = (index: number): void => {
    const newTodos = todos.filter((_,i) => i !== index)
    setTodos(newTodos)
  }

  const toggleTaskCompletion = (index: number): void => {
    const updatedTodos = todos.map((todo) => 
      todo.index === index ? {...todo, completed: !todo.completed} : todo
    )
    setTodos(updatedTodos)
  }

  const editTask = (index: number): void => {
    setIsEditing(true)
    setCurrentTask(todos[index])
  }

  const updateTask = (): void => {
    if (currentTask) {
      const updatedTodos = todos.map((todo) => 
        todo.
      )
    }
  }

  return (
    <div className='App'>
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
          <li key={index} className='todo-li'>
            <input 
              type="checkbox" 
              checked={todo.completed}
              onChange={() => toggleTaskCompletion(index)}
            />

            <span style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
              {todo.text}
            </span>

            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <p>Total Tasks: {todos.length}</p>
        <p>Completed Tasks: {todos.filter((todo) => todo.completed).length}</p>
      </div>
    </div>
  )
}

export default App;
