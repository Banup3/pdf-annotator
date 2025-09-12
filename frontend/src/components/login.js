// import React, { useState } from 'react';
// import { login } from '../api/api';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await login(email, password);
//             localStorage.setItem('token', res.data.token);
//             navigate('/dashboard');
//         } catch (err) {
//             alert('Invalid credentials');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
//             <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
//             <button type="submit">Login</button>
//         </form>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { login } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(email, password);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error("Login failed", error);
            alert("Invalid credentials");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '100px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#3498db',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default Login;
