import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css' 

export default function Login({ setLoggedIn }) {
    useEffect(() => {
        document.body.classList.add('loginPageBody');
        document.body.classList.add('loginPageCard');
    
        return () => {
          document.body.classList.remove('loginPageBody');
          document.body.classList.remove('loginPageCard');
        };
      }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:4000/users/login', { email, password });
  
        if (response.data.success) {
            sessionStorage.setItem('isLoggedIn', true);
            sessionStorage.setItem('userDetails', JSON.stringify(response.data.userDetails));
            sessionStorage.setItem('userSession', JSON.stringify({ user_id: response.data.session.user_id, userType: response.data.session.userType }));
  
            setLoggedIn(true, response.data.userDetails);
            navigate('/');
        } else {
            alert('Login failed!');
        }
    } catch (error) {
        console.error('Login error', error);
    }
  };
  

  return (
    <div className="container d-flex align-items-center justify-content-center m-down" style={{ minHeight: 100 }}>
      <div className="loginPageCard shadow" style={{ width: 400}}>
        <div className="card-body p-5">
          <h2 className="card-title text-center mb-4">Sign In</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input type="email" className="form-control" id="email" placeholder="Email address" required autoFocus onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" id="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="d-grid mb-2">
              <button className="btn btn-lg btn-outline-danger btn-block" type="submit">Sign In</button>
            </div>
          </form>
          <a href="#" className="text-muted text-center d-block">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
}
