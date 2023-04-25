import React from 'react';
import '../Styles/main.css';

function Sidebar({isDrawerOpen, users, ...props}) {
  return (
    <div className={`drawer ${ isDrawerOpen? "open" : ""}`}>
      <h2>Active Users</h2>
      <ul>
        {users.map((user, index) => {
          // console.log(user);
          // return <li key={index}>{user.email} - {user.lineNumber}:{user.column}</li>
          return <div key={index} className='user-list'>
            {/* <Avatar
              alt={user.name}
              src={user.photo}
              referrerPolicy="no-referrer"
              sx={{ width: 34, height: 34 , margin: "0"}}
              />
            <span>{user.name}</span> */}
            <div><img src={user.photo} alt={user.name} referrerPolicy='no-referrer' /></div>
            <div><span className='user-name'>{user.name}</span></div>
            </div>
        })}
      </ul>
    </div>
  );
}

export default Sidebar;