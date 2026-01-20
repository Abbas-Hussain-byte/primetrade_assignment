import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useState, useEffect } from 'react';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route
                        path="/login"
                        element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/register"
                        element={!token ? <Register setToken={setToken} /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/"
                        element={token ? <Dashboard token={token} setToken={setToken} /> : <Navigate to="/login" />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
