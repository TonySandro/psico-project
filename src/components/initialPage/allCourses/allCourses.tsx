import React, { useRef } from 'react';
import styles from './allCourses.module.scss';
import { useTranslation } from 'react-i18next';
import { Course } from '../../../interfaces/course';

interface AllCoursesProps {
  courses?: Course[];
}

const AllCourses: React.FC<AllCoursesProps> = ({ courses = [] }) => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.allCoursesSec}>
      <div className={styles.allCoursesContainer}>
        <h2 className={styles.coursesTitle}>{t('common:availableCourses')}</h2>

        {courses.length === 0 ? (
          <p className={styles.noCoursesMessage}>{t('addCourse:noCourses')}</p>
        ) : (
          <div className={styles.carouselControls}>
            <button
              className={styles.carouselButton}
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              &#8249;
            </button>

            <div className={styles.coursesRow} ref={scrollRef}>
              {courses.map((course) => (
                <div key={course.id} className={styles.courseCard}>
                  <img
                    className={styles.courseImage}
                    src={course.imageUrl}
                    alt={course.title}
                  />
                  <div className={styles.cardBody}>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <p className={styles.courseDescription}>{course.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              className={styles.carouselButton}
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              &#8250;
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllCourses;
