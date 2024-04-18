import React, { useState } from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Todo.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleAddTodo = () => {
    if (!name || !description) {
      alert('Please fill in both todo name and description');
      return;
    }
    const newTodo = {
      name: name,
      description: description,
      completed: false 
    };
    setTodos([...todos, newTodo]);
    setName('');
    setDescription('');
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    const editedName = prompt('Enter the new todo name:');
    const editedDescription = prompt('Enter the new todo description:');
    
    if (editedName !== null && editedDescription !== null) {
      const updatedTodos = [...todos];
      updatedTodos[index] = {
        ...updatedTodos[index],
        name: editedName,
        description: editedDescription
      };
      setTodos(updatedTodos);
    }
  };

  const handleStatusChange = (index, completed) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = completed;
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (statusFilter === 'completed') {
      return todo.completed;
    } else if (statusFilter === 'notCompleted') {
      return !todo.completed;
    } else {
      return true; // 'all' filter
    }
  });

  return (
    <div className="todo-container">
      <h2 style={{ textAlign: 'center' }}>My Todo</h2>
      <div className="input-group">
        <div style={{ width: '600px', margin: '10px' }}>
          <label htmlFor="todoname">Todo Name</label>
          <input type="text" id="todoname" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className='description' style={{ width: '600px', margin: '10px' }}>
          <label htmlFor="tododescription">Todo Description</label>
          <input type="text" id="tododescription" value={description} onChange={(e)=>setDescription(e.target.value)} />
        </div>
        <button onClick={handleAddTodo} style={{ backgroundColor: 'blue', color: 'white', marginLeft: 15 }}>Add Todo</button>
      </div>
      <h3 style={{ textAlign: 'center' }}>Todo List:</h3>
      <div style={{ textAlign: 'center' }}>
        <label htmlFor="status-filter">Status Filter:</label>
        <select id="status-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="notCompleted">Not Completed</option>
          <option value="completed">Completed</option>
          <option value="all">All</option>
        </select>
      </div>
      {filteredTodos.length > 0 ? (
        <ul>
          {filteredTodos.map((todo, index) => (
            <li key={index} className="todo-item">
              <div className="todo-box">
                <p>Todo Task - {todo.name}</p>
                <p>Description - {todo.description}</p>
                <div>
                  <label htmlFor={`status-filter-${index}`}>Status</label>
                  <select
                    id={`status-filter-${index}`}
                    value={todo.completed}
                    onChange={(e) => handleStatusChange(index, e.target.value === 'true')}
                  >
                    <option value={false}>Not Completed</option>
                    <option value={true}>Completed</option>
                  </select>
                </div><br />
                <div className="todo-buttons">
                  <button onClick={() => handleEditTodo(index)} style={{ backgroundColor: 'green' }}><FontAwesomeIcon icon={faEdit} /></button>
                  <button onClick={() => handleDeleteTodo(index)} style={{ backgroundColor: 'red' }}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center' }}>No todos match the selected filter</p>
      )}
    </div>
  );
}

export default App;
