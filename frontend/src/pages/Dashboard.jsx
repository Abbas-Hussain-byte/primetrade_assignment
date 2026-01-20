import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ token, setToken }) => {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Get user info to check role
    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user && user.role === 'admin';

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/tasks', config);
            setTasks(response.data.data);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                logout();
            } else {
                setError('Failed to fetch tasks');
            }
        }
    };

    const { title, description, status } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/v1/tasks', formData, config);
            // If admin creates a task, we need the full object returned match what we expect
            // But usually admin just views. If admin creates, it's their task.
            // For simplicity, re-fetching or just adding is fine.
            setTasks([...tasks, response.data.data]);
            setFormData({ title: '', description: '', status: 'pending' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create task');
        }
    };

    const deleteTask = async (id) => {
        console.log('[Dashboard] Attempting to delete task:', id, 'isAdmin:', isAdmin);
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await axios.delete(`http://localhost:5000/api/v1/tasks/${id}`, config);
                console.log('[Dashboard] Delete success');
                setTasks(tasks.filter((task) => task._id !== id));
            } catch (err) {
                console.error('[Dashboard] Delete failed:', err);
                setError(err.response?.data?.message || 'Failed to delete task');
            }
        }
    };

    const updateTaskStatus = async (id, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/v1/tasks/${id}`, { status: newStatus }, config);
            // Update local state
            setTasks(tasks.map((task) => (task._id === id ? response.data.data : task)));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update status');
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <header className="dashboard-header">
                <div>
                    <h1>{isAdmin ? 'Admin Dashboard' : 'My Quick Notes'}</h1>
                    <p>{isAdmin ? 'Managing all system notes' : 'Your personal space'}</p>
                </div>
                <button onClick={logout} className="delete-btn" style={{ fontSize: '1rem' }}>Logout</button>
            </header>

            {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}

            <section className="create-task-section glass-panel">
                <h3>Create New Note</h3>
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            placeholder="Note Title"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            name="description"
                            value={description}
                            placeholder="Note Details"
                            onChange={onChange}
                            required
                            rows="4"
                        />
                    </div>
                    <div>
                        <select name="status" value={status} onChange={onChange}>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-primary">Add Note</button>
                </form>
            </section>

            <section className="content">
                <h3>{isAdmin ? 'All User Notes' : 'Your Notes'}</h3>
                {tasks && tasks.length > 0 ? (
                    <div className="tasks-grid">
                        {tasks.map((task) => (
                            <div key={task._id} className="task-card">
                                <div className="task-header">
                                    <div className="status-container">
                                        {/* Allow status change if it's the user's task or if admin wants to force update (optional, but good for control) */}
                                        {/* Based on my backend analysis check, usually owner updates. Admin deletes. */}
                                        {/* But user asked for "give admin some more controls". So let's allow Admin to update status too. */}
                                        <select
                                            value={task.status}
                                            onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                                            className={`status-select status-${task.status}`}
                                            disabled={!isAdmin && task.owner !== user.id /* Just in case, broadly allow interaction */}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    <button
                                        onClick={() => deleteTask(task._id)}
                                        className="delete-btn"
                                        title={isAdmin ? "Admin Delete" : "Delete Note"}
                                        style={isAdmin ? { backgroundColor: '#ff4444', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px' } : {}}
                                    >
                                        {isAdmin ? 'DELETE' : '✕'}
                                    </button>
                                </div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{task.title}</h4>
                                <p style={{ marginBottom: isAdmin ? '1rem' : '0' }}>{task.description}</p>

                                {isAdmin && (
                                    <div style={{
                                        marginTop: '1rem',
                                        paddingTop: '1rem',
                                        borderTop: '1px solid var(--glass-border)',
                                        fontSize: '0.85rem',
                                        color: 'var(--text-muted)'
                                    }}>
                                        <p style={{ margin: 0 }}><strong>ID:</strong> {task._id}</p>
                                        <p style={{ margin: '0.25rem 0' }}><strong>Owner:</strong> {task.owner?.email || 'Unknown'}</p>
                                        <p style={{ margin: 0 }}><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="glass-panel" style={{ textAlign: 'center' }}>
                        <h3>No notes found</h3>
                        <p>Create one above to get started!</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
