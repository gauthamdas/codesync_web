import React from 'react';
import '../Styles/main.css';

function Sidebar({isDrawerOpen, ...props}) {
  return (
    <div className={`drawer ${ isDrawerOpen? "open" : ""}`}>
      <h2>Active Users</h2>
      <ul>
        <li>User 1</li>
        <li>User 2</li>
        <li>User 3</li>
      </ul>
    </div>
  );
}

export default Sidebar;