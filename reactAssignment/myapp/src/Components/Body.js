import React from 'react';
import './Body.css';
import TaskType from './TaskType';

const Body = ({ tasks, deleteTask, onNewTaskClick }) => {
    return (
        <div className='container'>
            <div className='task-container'>
                <div className='task-types'>
                    <p className='heading'>New</p>
                    <TaskType tasks={tasks.filter(task => task.status === 'New')} deleteTask={deleteTask} onUpdateTaskClick={onNewTaskClick}/>
                </div>
                <div className='task-types'>
                    <p className='heading'>In Progress</p>
                    <TaskType tasks={tasks.filter(task => task.status === 'In Progress')} deleteTask={deleteTask} onUpdateTaskClick={onNewTaskClick}/>
                </div>
                <div className='task-types'>
                    <p className='heading'>Completed</p>
                    <TaskType tasks={tasks.filter(task => task.status === 'Completed')} deleteTask={deleteTask} onUpdateTaskClick={onNewTaskClick}/>
                </div>
            </div>
        </div>
    );
};

export default Body;
