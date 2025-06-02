import React from 'react';
import styles from './navBar.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import LogoutButton from '../logout/logoutButton';

const NavBar: React.FC = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.user);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link to="/">{t('common:appName')}</Link>
        </div>


        <div className={styles.actions}>
        <ul className={styles.navLinks}>
          <li><Link to="/">{t('common:home')}</Link></li>
          <li><Link to="/courses">{t('common:courses')}</Link></li>
          {user?.role === 'admin' && <li><Link to="/admin">{t('common:dashboard')}</Link></li>}
          <li><Link to="/profile">{t('common:profile')}</Link></li>
        </ul>
          <LanguageSwitcher />
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
