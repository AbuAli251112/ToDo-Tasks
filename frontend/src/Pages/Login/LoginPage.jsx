import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useInserData } from '../../Hooks/UseInsertData';
import "./LoginPage.css";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const HandleLogin = async (event) => {
        event.preventDefault();
        try {
            // const response = await axios.post('/api/login', { email, password });
            const response = await useInserData('/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/todo-list');
        } catch (error) {
            console.log(error);
            setError('Invalid email or password.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={HandleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
            <p className="register-link">Don't have an account? <a href="/register">Register</a></p>
        </div>
    );
};

export default LoginPage;