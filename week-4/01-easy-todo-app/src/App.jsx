import { useState , useEffect } from 'react';
import './App.css';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

function App() {
  const [todos, setTodos] = useState([]);
  const [varRender, setVarRender] = useState(0);
    // fetch all todos from server 
  useEffect(() => {
    async function fetchTodos() {
      try {
        let response = await fetch("http://localhost:3000/todos");
        response = await response.json();
        setTodos(response);
      }
      catch(error) {
        console.log(error);
      }
    }
    fetchTodos();
    console.log(todos);
  } , [varRender]);

  const updateTodo = (updatedTodo) => {
    setTodos(todos => 
      todos.map(todo => 
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
  };

  const renderAgain = () => {
    setVarRender(varRender^1);
  }

  const addTodo = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title : "",
          completed : false
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      renderAgain();
    } 
    catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  return (
    <>
      <div className="card">
        <center><h1>Easy Todo App</h1></center>
        {todos.map(todo => (
          <div key={todo.id} className="group">
          <Todo key={todo.id} todo={todo} onUpdate={updateTodo} renderAgain={renderAgain}/>
          </div>
        ))}
        <IconButton aria-label="delete" onClick={addTodo} color="primary">
        <AddCircleOutlinedIcon size="large"/>
        </IconButton>
      </div>

    </>
  )
}

function Todo({todo , onUpdate , renderAgain}) {
    // Add a delete button here so user can delete a TODO.
    const [title, setTitle] = useState(todo.title);

    const handleChange = async (e) => {
      const newText = e.target.value;
      setTitle(newText);
  
      try {
        const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...todo, title: newText }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update todo');
        }
  
        const updatedTodo = await response.json();
        onUpdate(updatedTodo);
      } 
      catch (error) {
        console.error('Error updating todo:', error);
      }
    };

    const handleDelete = async () => {
      try {
        const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete todo');
        }
        renderAgain();
      } 
      catch (error) {
        console.error('Error updating todo:', error);
      }
    };

    const handleCheck = async (e) => {
      const completedStatus = e.target.checked;
      console.log(e.target.checked);
      try {
        const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...todo, completed: completedStatus }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete todo');
        }
      } 
      catch (error) {
        console.error('Error updating todo:', error);
      }
    };

    return <>
      <input className="input" type="text" placeholder={title} onChange={handleChange}></input>
      <Checkbox onClick={handleCheck}/>
      <IconButton aria-label="delete" onClick={handleDelete} color="primary">
        <DeleteIcon />
      </IconButton>
    </>
}

export default App
