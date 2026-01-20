import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = ({ setToken }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user', // Default to user
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { name, email, password, role } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/register', formData);
            setSuccess('Registration successful! Redirecting...');
            setToken(response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="glass-panel">
                <h1>Create Account</h1>
                <p>Join us to start managing your notes</p>
                {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
                {success && <p style={{ color: 'var(--success)' }}>{success}</p>}
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Enter your name"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <select
                            name="role"
                            value={role}
                            onChange={onChange}
                            style={{ marginBottom: '1rem' }}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" style={{ width: '100%' }}>Register</button>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
