import React from 'react'
import CreateTask from '../Modals/createTask';

const TodoList = () => {
  return (
    <>
    <div className='header text-center'>
        <h3>Todo List</h3>
        <button className='btn btn-primary mt-2' onClick={() => setModal(true)}>Create Task</button>
    </div>
    <div className='task-container'>
    </div>
    <CreateTask toggle={toggle} modal={modal} />
</>
  )
}

export default TodoList
