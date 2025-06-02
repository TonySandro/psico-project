import React, { useState } from 'react';
import AddCourse from '../addCourse/addCourse';
import CourseList from '../courseList/courseList';
import styles from './adminTabs.module.scss';
import { useTranslation } from 'react-i18next';

const AdminTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'add' | 'list'>('list');
  const { t } = useTranslation();

  return (
    <div className={styles.adminTabs}>
      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabButton} ${activeTab === 'add' ? styles.active : ''}`}
          onClick={() => setActiveTab('add')}
        >
          {t('adminPage:tabs.addCourse')}
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'list' ? styles.active : ''}`}
          onClick={() => setActiveTab('list')}
        >
          {t('adminPage:tabs.allCourses')}
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'add' && <AddCourse />}
        {activeTab === 'list' && <CourseList />}
      </div>
    </div>
  );
};

export default AdminTabs;
