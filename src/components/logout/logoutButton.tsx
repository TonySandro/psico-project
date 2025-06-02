import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import styles from './logoutButton.module.scss';
import { useTranslation } from 'react-i18next';

const LogoutButton: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className={styles.logoutButton}>
            <button className={styles.button} onClick={handleLogout}>
                {t('common:logout')}
            </button>
        </div>
    );
};

export default LogoutButton;
