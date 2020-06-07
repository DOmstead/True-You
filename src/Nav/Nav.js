import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

//This component is a simple one. It provides a home button that at the top of the page and
//can be clicked on to go home at anytime the user wishes to do so.
export default function Nav(props) {
  return (
    <nav className='navContainer'>
      <Link className="nav" to={'/'}>
        Home
      </Link>
    </nav>
  );
}
