import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './loginComponent.module.scss';
import image from '../../image/svg-3.svg';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { login } from '../../features/user/userSlice';
import { fakeUsers } from '../../data/fakeUsers';
import { useNavigate } from 'react-router-dom';


const LoginComponent: React.FC = () => {
  const { t } = useTranslation();

  const loginSchema = yup.object({
    email: yup
      .string()
      .email(t('login:errors.invalidEmail'))
      .required(t('login:errors.emailRequired')),
    password: yup
      .string()
      .min(6, t('login:errors.passwordMin'))
      .required(t('login:errors.passwordRequired')),
  });

  type LoginFormData = yup.InferType<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    const matchedUser = fakeUsers.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (!matchedUser) {
      alert('Credenciais inválidas');
      return;
    }

    dispatch(
      login({
        name: matchedUser.name,
        email: matchedUser.email,
        role: matchedUser.role,
      })
    );

    navigate('/catalog');
  };

  return (
    <section className={styles.loginSection}>
      <div className={styles.loginContainer}>
        <div className={styles.imageWrapper}>
          <img className={styles.loginImage} src={image} alt={t('login:imageAlt')} />
        </div>

        <div className={styles.formWrapper}>
          <h2 className={styles.formTitle}>{t('login:title')}</h2>
          <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">{t('login:email')}</label>
              <input
                className={styles.input}
                id="email"
                placeholder={t('login:emailPlaceholder')}
                {...register('email')}
              />
              {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="password">{t('login:password')}</label>
              <input
                className={styles.input}
                id="password"
                placeholder={t('login:passwordPlaceholder')}
                type="password"
                {...register('password')}
              />
              {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
            </div>

            <button className={styles.loginButton} type="submit">{t('login:submit')}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginComponent;