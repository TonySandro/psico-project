import React from 'react';
import styles from './initialBar.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/useAppSelector';

const InitialBar: React.FC = () => {
    const { t } = useTranslation();
    const user = useAppSelector((state) => state.user.user);

    return (
        <section className={styles.initialSectionSec}>
            <div className={styles.initialSectionContainer}>
                <div className={styles.textWrapper}>
                    <h1 className={styles.welcomeText}>
                        {user?.role === 'client'
                            ?
                            <><h1 className={styles.welcomeText}>
                                {t('common:welcomeBack')} {user?.name}
                            </h1><p className={styles.roleText}>{t('common:goodStudies')}</p></>
                            :
                            <><h1 className={styles.welcomeText}>{t('adminPage:welcome')}</h1><p className={styles.roleText}>{t('adminPage:manageTests')}</p></>
                        }
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default InitialBar;
