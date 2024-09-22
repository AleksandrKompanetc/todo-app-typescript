import React, {useState, useEffect, ChangeEvent} from 'react';
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

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

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
        todo.index === currentTask.index ? {...todo, text: currentTask.text} : todo
      )
      setTodos(updatedTodos)
      setIsEditing(false)
      setCurrentTask(null)
    }
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>): void => {
    if (isEditing && currentTask) {
      setCurrentTask({...currentTask, text: e.target.value})
    } else {
      setTask(e.target.value)
    }
  }

  return (
    <div className='App'>
      <h1>Todo List</h1>
      <input 
        type="text"
        value={isEditing && currentTask ? currentTask.text : task}
        onChange={handleChange}
        placeholder='Enter task...' 
      />

      {isEditing ? (
        <button onClick={updateTask}>Update Task</button>
      ) : (
        <button onClick={addTask}>Add Task</button>
      )}

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

            <button onClick={() => editTask(index)}>Edit Task</button>
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
