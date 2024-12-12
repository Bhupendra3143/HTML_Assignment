import React from 'react';
import './NavBar.css';

const NavBar = ({ onNewTaskClick }) => {
  return (
    <div className='Nav-bar'>
        <div className='Nav-element'>
            <p className='heading'>
                My Task Manager
            </p>
            <button className='task-btn' onClick={onNewTaskClick}>New Task</button>
        </div>
    </div>
  );
};

export default NavBar;
