import React from 'react';
import { useSelector } from 'react-redux';
import styles from './courseList.module.scss';
import { RootState } from '../../../app/store';
import CourseItem from './courseItem/courseItem';
import { useTranslation } from 'react-i18next';

const CourseList: React.FC = () => {
  const courses = useSelector((state: RootState) => state.course.list);
  const { t } = useTranslation();

  if (courses.length === 0) {
    return <p className={styles.emptyMessage}>{t('addCourse:noCourses')}</p>;
  }

  return (
    <section className={styles.courseListSection}>
      <div className={`${styles.courseGrid} ${courses.length === 1 ? styles.single : ''}`}>
        {courses.map(course => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default CourseList;
