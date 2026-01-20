import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = ({ setToken }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { email, password } = formData;

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
            const response = await axios.post('http://localhost:5000/api/v1/auth/login', formData);
            setSuccess('Login successful!');
            setToken(response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="glass-panel">
                <h1>Welcome Back</h1>
                <p>Login to manage your notes</p>
                {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
                {success && <p style={{ color: 'var(--success)' }}>{success}</p>}
                <form onSubmit={onSubmit}>
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
                    <button type="submit" style={{ width: '100%' }}>Login</button>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
