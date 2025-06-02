import React from 'react';
import ReactDOM from 'react-dom';
import EditCourse from '../editCourse';
import styles from './editCourseModal.module.scss';
import { Course } from '../../../../interfaces/course';

interface Props {
  course: Course;
  onClose: () => void;
}

const EditCourseModal: React.FC<Props> = ({ course, onClose }) => {
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <EditCourse course={course} onClose={onClose} />
      </div>
    </div>,
    document.body
  );
};

export default EditCourseModal;
