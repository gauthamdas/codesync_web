import React from 'react';
import '../Styles/main.css';

function Sidebar({isDrawerOpen, users, ...props}) {
  return (
    <div className={`drawer ${ isDrawerOpen? "open" : ""}`}>
      <h2>Active Users</h2>
      <ul>
        {users.map((user, index) => {
          return <li key={index}>{user.email} - {user.lineNumber}:{user.column}</li>
        })}
      </ul>
    </div>
  );
}

export default Sidebar;