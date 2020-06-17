import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

export default function NavbarProfile() {
  return (
    <nav className="navbar-profile">
        <Link className="navbar-button" to="/home/profile">
          <FaUserCircle size={"2vh"} color="grey"/>
          Profile
        </Link>
    </nav>
  );
}