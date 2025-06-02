import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addCourse } from '../../../features/course/courseSlice';
import { v4 as uuidv4 } from 'uuid';
import styles from './addCourse.module.scss';
import { useTranslation } from 'react-i18next';

type CourseFormData = {
  title: string;
  description: string;
  imageUrl: string;
};

const AddCourse: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const courseSchema = yup.object({
    title: yup.string().required(t('addCourse:errors.title')),
    description: yup.string().required(t('addCourse:errors.description')),
    imageUrl: yup
      .string()
      .url(t('addCourse:errors.image_url'))
      .required(t('addCourse:errors.image_required')),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: yupResolver(courseSchema),
  });

  const onSubmit = (data: CourseFormData) => {
    const courseWithId = { ...data, id: uuidv4() };
    dispatch(addCourse(courseWithId));
    reset();
  };

  return (
    <section className={styles.loginSection}>
      <div className={styles.loginContainer}>
        <div className={styles.formWrapper}>
          <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="title">
                {t('addCourse:title')}
              </label>
              <input className={styles.input} id="title" {...register('title')} />
              {errors.title && <p className={styles.errorText}>{errors.title.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="description">
                {t('addCourse:description')}
              </label>
              <textarea className={styles.input} id="description" {...register('description')} />
              {errors.description && <p className={styles.errorText}>{errors.description.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="imageUrl">
                {t('addCourse:imageUrl')}
              </label>
              <input className={styles.input} id="imageUrl" {...register('imageUrl')} />
              {errors.imageUrl && <p className={styles.errorText}>{errors.imageUrl.message}</p>}
            </div>

            <button className={styles.loginButton} type="submit">
              {t('addCourse:submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddCourse;
