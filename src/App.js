
// eslint-disable-next-line
import { BrowserRouter, Switch, Route } from "react-router-dom";
import  { useState, useEffect } from "react";
// import axios from "axios";

import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
// import { getToken, removeUserSession, setUserSession } from "./Utils/Common";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import CodeEditor from "./Components/CodeEditor";
import "./App.css";
import Sidebar from "./Components/Sidebar";

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    console.log(!isDrawerOpen)
    setIsDrawerOpen(!isDrawerOpen);
  };
  
//   useEffect(() => {
//     const token = getToken();
//     if (!token) {
//       return;
//     }

//     axios
//       .get(`${process.env.REACT_APP_HOST}/verifyToken?token=${token}`)
//       .then((response) => {
//         setUserSession(response.data.token, response.data.username, response.data.name);
//         setAuthLoading(false);
//         setAuth(true);
//         // socket.emit("test","hi");
//         // setTimeout(()=>{socket.emit("test","1");setTimeout(()=>{socket.emit("test","2");setTimeout(()=>{socket.emit("test","3");setTimeout(()=>{socket.emit("test","4");setTimeout(()=>{socket.emit("test","5");},500);},500);},500);},500);},500);
//       })
//       .catch((error) => {
//         if (error?.response?.status === 401 ) removeUserSession();
//         setAuthLoading(false);
//         setAuth(false);
//       });
//       return () => {
//         // socket.disconnect({token: getToken()});
//       }
//   }, []);

//   if (authLoading && getToken()) {
// // return <div className="loadclass"><span className="loader-11"></span></div>;
// return <>
// <div className="loadclass-new">
//   <div className="spinner-box">
// <div className="configure-border-1">  
//   <div className="configure-core"></div>
// </div>  
// <div className="configure-border-2">
//   <div className="configure-core"></div>
// </div> 
// </div>
// </div>
// </>;  }

  return (
    <div className="App">
      <BrowserRouter >
        <div>
          <Navbar  
          auth={auth} 
          setAuth={setAuth}
          setAuthLoading={setAuthLoading}
          toggleDrawer={toggleDrawer}
          //  soc={socket}
           />
          <Sidebar
          isDrawerOpen={isDrawerOpen}
          />
          <div className="content">
            <Switch>
              <PrivateRoute
                exact path="/"
                component={Home}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
                // socket={socket}
              />
         
              <PublicRoute
                exact path="/"
                component={Login}
              />
              <PublicRoute
                path="/login"
                component={Login}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
                // socket={socket}
              />

              <PrivateRoute
                path="/editor"
                component={CodeEditor}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
                isDrawerOpen={isDrawerOpen}
                // socket={socket}
              />
              
              {/* <PrivateRoute
                path="/admin"
                component={Admin}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
                // socket={socket}
              /> */}

            </Switch>
          </div>
        </div>
      </BrowserRouter>     
    </div>
  );
}

export default App;
