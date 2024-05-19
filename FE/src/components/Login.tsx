import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    console.log({ email, password });
    navigate('/home');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group password-group">
        <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? '👁️' : '🙈'}
          </span>
        </div>
        <button type="submit" className="login-button">Login</button>
        <div className="signup-link">
          <span>Don't have an account? </span>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
