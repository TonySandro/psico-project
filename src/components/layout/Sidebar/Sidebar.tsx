import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, LogOut, CreditCard } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <span className={styles.logo}>NeuroPPAvalia</span>
            </div>

            <nav className={styles.nav}>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
                >
                    <LayoutDashboard size={20} />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/patients"
                    className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
                >
                    <Users size={20} />
                    Pacientes
                </NavLink>

                <NavLink
                    to="/protocols"
                    className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
                >
                    <FileText size={20} />
                    Protocolos
                </NavLink>

                <NavLink
                    to="/subscription"
                    className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
                >
                    <CreditCard size={20} />
                    Assinatura
                </NavLink>

                <NavLink
                    to="/settings"
                    className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
                >
                    <Settings size={20} />
                    Configurações
                </NavLink>
            </nav>

            <div className={styles.footer}>
                <button
                    className={styles.navItem}
                    style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer' }}
                    onClick={handleLogout}
                >
                    <LogOut size={20} />
                    Sair
                </button>
            </div>
        </aside>
    );
};
