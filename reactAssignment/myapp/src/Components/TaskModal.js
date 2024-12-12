import React, { useState, useEffect, useRef } from 'react';
import './TaskModal.css';

const TaskModal = ({ isOpen, onClose, addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('New');
    const [priority, setPriority] = useState('Medium');
    const [creationTime, setCreationTime] = useState(new Date().toISOString().split('T')[0]);

    const modalRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: Date.now(),
            title,
            description,
            status,
            priority,
            creationTime,
            completionTime: null,
            statusId: status === 'New' ? 1 : status === 'In Progress' ? 2 : 3,
        };


        addTask(newTask);

        setTitle('');
        setDescription('');
        setPriority('Medium');
        setStatus('New');
        setCreationTime(new Date().toISOString().split('T')[0]);


        onClose();
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {

            setTitle('');
            setDescription('');
            setStatus('New');
            setPriority('Medium');
            setCreationTime(new Date().toISOString().split('T')[0]);
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" ref={modalRef}>
                <h2>Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label>
                        Description:
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </label>
                    <label>
                        Status:
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </label>
                    <label>
                        Priority:
                        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </label>
                    <label>
                        Creation Time:
                        <input type="date" value={creationTime} onChange={(e) => setCreationTime(e.target.value)} />
                    </label>
                    <button type="submit">Add Task</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
