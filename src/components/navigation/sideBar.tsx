import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import styles from './sideBar.module.scss';

const NavBar: React.FC = () => {
  const location = useLocation();
  // const user = useAppSelector((state) => state.user.user);

  const navItems: {
    path: string;
    label: string;
  }[] = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/tests', label: 'Available Tests' },
    { path: '/patients', label: 'My Patients' },
    { path: '/results', label: 'Results' },
    { path: '/subscription', label: 'Subscription Plan' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoBox}>NPA</div>
        <span className={styles.logoText}>NeuroPPAvalia</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`${styles.link} ${
              location.pathname === path ? styles.active : ''
            }`}
          >
            <span className={styles.label}>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default NavBar;
