import React, { useEffect, useState } from 'react';
import { useCallback } from "react";
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
import { signInWithGoogle } from '../Utils/AuthProvider';
// import logo from './.png'
require('dotenv').config();

function Login({setAuth: hasAuth, setAuthLoading: hasAuthLoading, Socket: socket, ...props}) {
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);

  useEffect(() => {
  
    return () => {
      
    }
  }, [])
  

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
    signInWithGoogle().then((user) => {
      if (!user.auth) {
        throw new Error("Something went wrong. Please try again later.");
      }
      delete user.auth;
    axios.post(`${process.env.REACT_APP_HOST}/login`, user ).then(response => {
      setLoading(false);
      setUserSession(response.data?.accessToken, response.data?.email, response.data?.name, response.data?.photo);
      isLogged(true)
      props.history.push('/');
    }).catch(error => {
      setLoading(false);
      console.log(error.response?.data)
      if (error.response?.status === 401) setError(error.response?.data.error);
      else setError("Something went wrong. Please try again later.");
    });}).catch(error => {
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


        <h3 className='brand-titl'>CodeSync</h3>

        {/* <div id="firebaseui"></div> */}
        <input type="button" value={loading ? 'Loading...' : 'LOGIN'} onClick={handleLogin} disabled={loading} />
        
    </div>
  );
}

export default Login;