import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './courseForm.module.scss';
import { useTranslation } from 'react-i18next';

export const courseSchema = (t: (key: string) => string) =>
  yup.object({
    title: yup.string().required(t('addCourse:errors.title')),
    description: yup.string().required(t('addCourse:errors.description')),
    imageUrl: yup
      .string()
      .url(t('addCourse:errors.image_url'))
      .required(t('addCourse:errors.image_required')),
  });

export type CourseFormData = {
  title: string;
  description: string;
  imageUrl: string;
};

interface Props {
  onSubmit: (data: CourseFormData) => void;
  initialValues?: CourseFormData;
  submitLabel: string;
}

const CourseForm: React.FC<Props> = ({ onSubmit, initialValues, submitLabel }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: yupResolver(courseSchema(t)),
    defaultValues: initialValues || {
      title: '',
      description: '',
      imageUrl: '',
    },
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <label>{t('addCourse:title')}</label>
        <input {...register('title')} />
        {errors.title && <p className={styles.errorText}>{errors.title.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label>{t('addCourse:description')}</label>
        <textarea {...register('description')} />
        {errors.description && <p className={styles.errorText}>{errors.description.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label>{t('addCourse:imageUrl')}</label>
        <input {...register('imageUrl')} />
        {errors.imageUrl && <p className={styles.errorText}>{errors.imageUrl.message}</p>}
      </div>

      <button type="submit" className={styles.submitButton}>
        {submitLabel}
      </button>
    </form>
  );
};

export default CourseForm;
