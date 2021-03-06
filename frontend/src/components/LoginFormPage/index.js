import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, NavLink } from 'react-router-dom';

import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  

  const handleSubmit = (async (e) => {
    e.preventDefault();
    setErrors([]);
    await dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        else history.push("/");
      });
  })


  return (
    <>
      <form id="login-form" onSubmit={handleSubmit}>
        <img src="../../includes/blue-pink.svg" style={{height: "1.5rem", width: "1.5rem"}}></img>
        <h6>Log in to Flimg</h6>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Enter username"
            size="50"
            required
          />
        </label>
        <label>
          <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              size="50"
              required
            />
        </label>
        <button id="login-btn" type="submit">Log In</button>
    
        <span>Not a Flimg member? 
          <NavLink to='/signup'> Sign up here.</NavLink>
        </span>
      </form>
      <div id="cc-text">
      <p>033120190455 by Henry , CC BY</p>
      </div>
  </>
  );
}

export default LoginFormPage;