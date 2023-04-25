import React from 'react';
import '../Styles/main.css';
import { Avatar } from '@mui/material';
import { getPhotoURL } from '../Utils/Common';

function Sidebar({isDrawerOpen, users, ...props}) {
  return (
    <div className={`drawer ${ isDrawerOpen? "open" : ""}`}>
      <h2>Active Users</h2>
      <ul>
        {users.map((user, index) => {
          // console.log(user);
          // return <li key={index}>{user.email} - {user.lineNumber}:{user.column}</li>
          return <div key={index} className='user-list'>
            <Avatar
              alt={user.name}
              src={user.photo}
              sx={{ width: 34, height: 34 , margin: "0"}}
              />
            <span>{user.name}</span>
            </div>
        })}
      </ul>
    </div>
  );
}

export default Sidebar;