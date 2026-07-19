import { useState } from "react";

export default function AuthForm({ mode, onSubmit, switchMode, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
        <p>{mode === "login" ? "Access your chemistry lab" : "Create your chemistry account"}</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(email.trim(), password);
          }}
        >
          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
            />
          </label>
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="auth-button">
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>
        <button type="button" className="auth-switch" onClick={switchMode}>
          {mode === "login" ? "Need an account? Sign up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
