import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navBar.module.scss';

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        Dra. Ana Paula
      </div>
      <Link to="/logout" className={styles.logout}>
        Logout
      </Link>
    </nav>
  );
};

export default NavBar;
