import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCourse } from '../../../features/course/courseSlice';
import CourseForm, { CourseFormData } from '../courseForm/courseForm';
import styles from './editCourse.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  course: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  };
  onClose: () => void;
}

const EditCourse: React.FC<Props> = ({ course, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleUpdate = (data: CourseFormData) => {
    dispatch(updateCourse({ ...data, id: course.id }));
    onClose();
  };

  return (
    <div>
      <h2>{t('addCourse:editTitle')}</h2>
      <CourseForm
        onSubmit={handleUpdate}
        initialValues={course}
        submitLabel={t('addCourse:saveChanges')}
      />
      <button onClick={onClose} className={styles.cancel_button}>
        {t('addCourse:cancel')}
      </button>
    </div>
  );
};

export default EditCourse;
