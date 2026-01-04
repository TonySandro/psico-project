import React, { HTMLAttributes } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className, ...props }) => {
    return (
        <div className={`${styles.card} ${className || ''}`} {...props}>
            {title && (
                <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{title}</h3>
                </div>
            )}
            {children}
        </div>
    );
};
