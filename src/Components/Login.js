import React, { useState } from 'react';
import { useCallback } from "react";
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
// import logo from './.png'
require('dotenv').config();

function Login({setAuth: hasAuth, setAuthLoading: hasAuthLoading, Socket: socket, ...props}) {
  const [loading, setLoading] = useState(false);
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
    axios.post(`${process.env.REACT_APP_HOST}/login`, {  }).then(response => {
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

    <form className='login'>
        <h3 className='brand-titl'>CodeSync</h3>

        <label className="inputLabel">Username</label>
        <input type="text" placeholder="Email or Phone" id="username"  autoComplete="new-password" />

        <label className="inputLabel">Password</label>
        <input type="password" placeholder="Password" id="password"  autoComplete="new-password" />
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        <input type="button" value={loading ? 'Loading...' : 'LOGIN'} onClick={handleLogin} disabled={loading} />
        
    </form>
    </div>
  );
}

export default Login;