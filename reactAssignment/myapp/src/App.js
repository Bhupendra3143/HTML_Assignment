import React, { useState } from 'react';
import './App.css';
import Body from './Components/Body';
import NavBar from './Components/NavBar';
import TaskModal from './Components/TaskModal';
import UpdateModal from './Components/UpdateModal';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const [updatedTask, setUpdatedTask] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updateTask) => {
    const task = tasks.filter((tasks) => tasks.id === updateTask);
    setUpdatedTask(task);
    console.log(updatedTask);
  };

  const modifyTask = (updatedTask) => {
    console.log(updatedTask);
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? { ...updatedTask } : task
    ));
  };

  return (
    <div className="App">
      <NavBar onNewTaskClick={() => setIsModalOpen(true)} />
      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} addTask={addTask} />
      <UpdateModal isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} updateTask={updateTask} loadTask={updatedTask} modifyTask={modifyTask} />
      <Body tasks={tasks} deleteTask={deleteTask} onNewTaskClick={(task) => { updateTask(task); setIsUpdateOpen(true); }} />
    </div>
  );
}

export default App;
