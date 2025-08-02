import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        // Prevent default behavior of form submission
        e.preventDefault();

        const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password }),
        });

        const data = await res.json();

        if(res.ok) {
            localStorage.setItem('token', data.token);
            setUser(data.user);
            navigate('/');
        }
        else alert(data.message || 'Login failed');
    }

    return(
        <div>
            <h3>Log In Form</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Username" 
                    required
                />
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}