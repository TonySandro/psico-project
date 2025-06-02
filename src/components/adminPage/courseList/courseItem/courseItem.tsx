import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCourse } from '../../../../features/course/courseSlice';
import styles from './courseItem.module.scss';
import EditCourseModal from '../../editCourse/modal/editCourseModal';
import { Course } from '../../../../interfaces/course';

interface Props {
  course: Course;
}

const CourseItem: React.FC<Props> = ({ course }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      dispatch(deleteCourse(course.id));
    }
  };

  return (
    <>
      <div className={styles.courseCard}>
        <img src={course.imageUrl} alt={course.title} className={styles.courseImage} />
        <div className={styles.courseContent}>
          <h3 className={styles.courseTitle}>{course.title}</h3>
          <p className={styles.courseDescription}>{course.description}</p>

          <div className={styles.actionButtons}>
            <button className={styles.editButton} onClick={() => setIsEditing(true)}>Editar</button>
            <button className={styles.deleteButton} onClick={handleDelete}>Excluir</button>
          </div>
        </div>
      </div>

      {isEditing && (
        <EditCourseModal course={course} onClose={() => setIsEditing(false)} />
      )}
    </>
  );
};

export default CourseItem;
