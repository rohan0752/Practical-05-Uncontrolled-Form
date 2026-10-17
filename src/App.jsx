import { useRef, useState } from 'react';
import './App.css';

function App() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const rememberRef = useRef(null);

  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = (username, password) => {
    const errs = {};
    if (!username.trim()) errs.username = 'Username is required';
    else if (username.trim().length < 3) errs.username = 'Username must be at least 3 characters';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve values using refs (uncontrolled approach)
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const remember = rememberRef.current.checked;

    const errs = validate(username, password);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmittedData({
      username,
      passwordLength: password.length,
      maskedPassword: '•'.repeat(password.length),
      remember,
    });
    setSubmitted(true);
  };

  const handleReset = () => {
    usernameRef.current.value = '';
    passwordRef.current.value = '';
    rememberRef.current.checked = false;
    setSubmitted(false);
    setSubmittedData(null);
    setErrors({});
  };

  return (
    <div className="app">
      <header className="app-header">
        <span className="brand-icon">🔐</span>
        <h1>Login Form — Uncontrolled Components</h1>
        <p className="header-subtitle">Using useRef to access form values — BCA Practical 5</p>
      </header>

      <main className="main-content">
        <div className="login-layout">
          <div className="login-card">
            <div className="login-header">
              <div className="login-avatar">👤</div>
              <h2>Sign In</h2>
              <p>Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input type="text" id="username" ref={usernameRef} placeholder="Enter username" className={errors.username ? 'error' : ''} />
                </div>
                {errors.username && <span className="error-msg">{errors.username}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input type="password" id="password" ref={passwordRef} placeholder="Enter password" className={errors.password ? 'error' : ''} />
                </div>
                {errors.password && <span className="error-msg">{errors.password}</span>}
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" ref={rememberRef} />
                  <span className="checkbox-custom"></span>
                  Remember me
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary btn-full">Sign In</button>
                <button type="button" className="btn btn-outline btn-full" onClick={handleReset}>Reset</button>
              </div>
            </form>

            <div className="demo-credentials">
              <p><strong>Demo credentials:</strong> Use any username (3+ chars) and password (6+ chars)</p>
              <p className="security-note">🔒 For security: passwords are never stored or displayed in plain text</p>
            </div>
          </div>

          <div className="info-panel">
            {submitted && submittedData && (
              <div className="result-section">
                <h3>✅ Login Submitted</h3>
                <div className="result-card">
                  <div className="result-row">
                    <span className="result-label">Username:</span>
                    <span className="result-value">{submittedData.username}</span>
                  </div>
                  <div className="result-row">
                    <span className="result-label">Password:</span>
                    <span className="result-value">{submittedData.maskedPassword} ({submittedData.passwordLength} chars)</span>
                  </div>
                  <div className="result-row">
                    <span className="result-label">Remember:</span>
                    <span className="result-value">{submittedData.remember ? 'Yes ✓' : 'No ✗'}</span>
                  </div>
                </div>
                <p className="result-note">Values were retrieved using <code>useRef</code> at the time of submission.</p>
              </div>
            )}

            <div className="concept-box">
              <h4>💡 What are Uncontrolled Components?</h4>
              <p>In <strong>uncontrolled components</strong>, form data is handled by the DOM itself, not by React state. Instead of using <code>onChange</code> + <code>useState</code>, you use <code>useRef</code> to access the input's current value when needed (e.g., on form submit).</p>
            </div>

            <div className="concept-box">
              <h4>🔄 Controlled vs Uncontrolled</h4>
              <table className="comparison-mini">
                <thead>
                  <tr><th>Aspect</th><th>Controlled</th><th>Uncontrolled</th></tr>
                </thead>
                <tbody>
                  <tr><td>Value source</td><td>React state</td><td>DOM</td></tr>
                  <tr><td>Updates</td><td>onChange + setState</td><td>useRef.current.value</td></tr>
                  <tr><td>Re-renders</td><td>On every keystroke</td><td>Only on submit</td></tr>
                  <tr><td>Validation</td><td>Real-time</td><td>On submit</td></tr>
                  <tr><td>Best for</td><td>Complex forms</td><td>Simple forms</td></tr>
                </tbody>
              </table>
            </div>

            <div className="concept-box">
              <h4>📝 Code Pattern Used</h4>
              <pre className="code-block">{`// Create ref
const usernameRef = useRef(null);

// Attach to input
<input ref={usernameRef} />

// Read value on submit
const value = usernameRef.current.value;`}</pre>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Login Form — BCA Practical 5</p>
      </footer>
    </div>
  );
}

export default App;
