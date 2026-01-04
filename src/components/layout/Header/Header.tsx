import React from 'react';
import styles from './Header.module.css';

export const Header: React.FC = () => {
    // Mock user data for now
    const user = {
        name: 'Dr. Tony Duarte',
        role: 'Psicopedagogo'
    };

    const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2);

    return (
        <header className={styles.header}>
            <div className={styles.userProfile}>
                <div className={styles.userInfo}>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.userRole}>{user.role}</span>
                </div>
                <div className={styles.avatar}>
                    {initials}
                </div>
            </div>
        </header>
    );
};
