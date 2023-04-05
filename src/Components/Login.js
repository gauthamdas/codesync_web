import React, { useState } from 'react';
import { useCallback } from "react";
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
// import logo from './.png'
require('dotenv').config();

function Login({setAuth: hasAuth, setAuthLoading: hasAuthLoading, Socket: socket, ...props}) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  const isLogged = useCallback((val) => {
          hasAuthLoading(!val);
          hasAuth(val);
        },
        [hasAuth,hasAuthLoading],
      );

  // handle button click of login form
  const handleLogin = () => {   
    setError(null);
    setLoading(true);
    axios.post(`${process.env.REACT_APP_HOST}/login`, { username: username.value, password: password.value, privilege: "ADMIN" }).then(response => {
      setLoading(false);
      setUserSession(response.data?.token, response.data?.username, response.data?.name);
      isLogged(true)
      props.history.push('/');
    }).catch(error => {
      setLoading(false);
      console.log(error.response?.data)
      if (error.response?.status === 401) setError(error.response?.data.error);
      else setError("Something went wrong. Please try again later.");
    });
  }
  if (loading) {
// return <div className="loadclass"><span className="loader-11"></span></div>;
return <>
<div className="loadclass-new">
  <div className="spinner-box">
<div className="configure-border-1">  
  <div className="configure-core"></div>
</div>  
<div className="configure-border-2">
  <div className="configure-core"></div>
</div> 
</div>
</div>
</>;  }

  return (
    <div>
    
    <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>

    <form className='glass-container login'>
        <h3 className='brand-titl'>CodeSync</h3>

        <label className="inputLabel">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" {...username} autoComplete="new-password" />

        <label className="inputLabel">Password</label>
        <input type="password" placeholder="Password" id="password" {...password} autoComplete="new-password" />
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        <input type="button" value={loading ? 'Loading...' : 'LOGIN'} onClick={handleLogin} disabled={loading} />
        
    </form>


    {/* <div className="login">
      <div className="loginHead" >Login</div>
      <div>
        Username<br />
        <input type="text" className="loginInput" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" className="loginInput" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" className="loginBtn" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br /> <br />
      <div ><small>Need an account? </small><Link className="signUpBtn" to='/signup'>Sign up</Link></div>
    </div> 

    ###############
  <div className="loginC">
      <div className="containerL">
  <div className="brand-title">Metro AFC</div>
  <div className="inputs">
    <label className="inputLabel">Username</label>
    <input type="text" className="loginInput" {...username} autoComplete="new-password" />
    <label className="inputLabel">Password</label>
    <input type="password" className="loginInput" {...password} autoComplete="new-password" />
    {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
    <input type="button" className="loginBtn" value={loading ? 'Loading...' : 'LOGIN'} onClick={handleLogin} disabled={loading} />
  </div>
</div>
  
  */}
    </div>
  );
}
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
export default Login;