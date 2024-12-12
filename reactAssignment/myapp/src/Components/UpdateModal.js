import React, { useState, useEffect, useRef } from 'react';
import './TaskModal.css';

const UpdateModal = ({ isOpen, onClose, loadTask, modifyTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('New');
    const [priority, setPriority] = useState('Medium');
    const [creationTime, setCreationTime] = useState('');

    const modalRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTask = {
            id: loadTask[0]?loadTask[0].id:Date.now(),
            title,
            description,
            status,
            priority,
            creationTime,
            completionTime: null,
            statusId: status === 'New' ? 1 : status === 'In Progress' ? 2 : 3,
        };
        modifyTask(updatedTask);
        onClose();
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen && loadTask) {
            console.log(loadTask[0].title);
            setTitle(loadTask[0]?.title);
            setDescription(loadTask[0]?.description);
            setStatus(loadTask[0]?.status);
            setPriority(loadTask[0]?.priority);
            setCreationTime(loadTask[0]?.creationTime?.split('T')[0]);
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, loadTask]);

    if (!isOpen || !loadTask) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" ref={modalRef}>
                <h2>Edit Task</h2>
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
                    <button type="submit">Update Task</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;
