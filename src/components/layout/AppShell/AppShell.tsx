import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import styles from './AppShell.module.css';

export const AppShell: React.FC = () => {
    return (
        <div className={styles.shell}>
            <Sidebar />
            <main className={styles.main}>
                <Header />
                <div className={styles.content}>
                    <Outlet />{/* Renders the child route */}
                </div>
            </main>
        </div>
    );
};
