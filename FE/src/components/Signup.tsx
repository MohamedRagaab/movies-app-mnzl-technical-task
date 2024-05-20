import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import API from '../API';

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      await API.register({
        name,
        email,
        password
      });
      console.log({ name, email, password });
      navigate('/login');
    } catch (error) {
      setError('Error signing up. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        {error && <div className="error-message">{error}</div>} {/* Display error message */}
        <div className="form-group">
          <input
            type="name"
            id="name"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
        <div className="signup-link">
          <span>Have an account? </span>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
