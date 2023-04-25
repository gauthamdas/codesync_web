import React from 'react';
import '../Styles/main.css';
import { Link } from 'react-router-dom';
import { Badge } from '@mui/material';
import { GroupOutlined } from '@mui/icons-material';

function Navbar({toggleDrawer, auth, setAuth, users,...props}) {
  return (<>
  { auth &&
    <nav className="navbar">
      <div className="logo">CODESYNC</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">About</Link></li>
        <li><Link to="/editor">Editor</Link></li>
      {window.location.pathname.toLowerCase().startsWith('/editor') && <div className="menu-toggle" onClick={toggleDrawer}>
      {/* <i className="fa-solid fa-users-line"></i> */}
      <Badge color="secondary" badgeContent={users.length}>
  <GroupOutlined />
</Badge>
      </div>}
      </ul>
    </nav>
}
    </>
  );
}

export default Navbar;