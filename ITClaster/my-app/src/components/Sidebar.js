import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faNewspaper, faUser, faCogs } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="menu-container">
        <NavLink to="/dashboard" className="menu-item">
          <FontAwesomeIcon icon={faTachometerAlt} className="menu-icon" />
          <span className="menu-text">Дашборд</span>
        </NavLink>
        <NavLink to="/news" className="menu-item">
          <FontAwesomeIcon icon={faNewspaper} className="menu-icon" />
          <span className="menu-text">Новини</span>
        </NavLink>
        <NavLink to="/account" className="menu-item">
          <FontAwesomeIcon icon={faUser} className="menu-icon" />
          <span className="menu-text">Акаунт</span>
        </NavLink>
        <NavLink to="/settings" className="menu-item">
          <FontAwesomeIcon icon={faCogs} className="menu-icon" />
          <span className="menu-text">Параметри</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
