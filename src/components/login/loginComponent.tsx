import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './loginComponent.module.scss';
import image from '../../image/svg-3.svg';
import * as yup from 'yup';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { login } from '../../features/user/userSlice';
import { fakeUsers } from '../../data/fakeUsers';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const LoginComponent: React.FC = () => {
  const loginSchema = yup.object({
    email: yup
      .string()
      .email('Email inválido')
      .required('O email é obrigatório'),
    password: yup
      .string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('A senha é obrigatória'),
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
    try {
      const response = await api.post('/login', {
        email: data.email,
        password: data.password,
      });

      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);

      // Integrando com Redux para persistir estado global (descomentado)
      dispatch(login({
        email: data.email,
        token: accessToken,
        name: 'Usuário', // Valor temporário até o backend retornar o nome
        role: 'client'   // Valor padrão
      }));

      navigate('/home');
    } catch (error) {
      // Melhora simples no tratamento de erro. 
      // Idealmente usaria um componente de Toast ou setError do hook-form.
      console.error("Erro no login:", error);
      alert('Credenciais inválidas ou erro no servidor');
    }
  };

  return (
    <section className={styles.loginSection}>
      <div className={styles.loginContainer}>
        <div className={styles.imageWrapper}>
          <img className={styles.loginImage} src={image} alt="Imagem de login" />
        </div>

        <div className={styles.formWrapper}>
          <h2 className={styles.formTitle}>Login</h2>
          <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input
                className={styles.input}
                id="email"
                placeholder="Digite seu email"
                {...register('email')}
              />
              {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="password">Senha</label>
              <input
                className={styles.input}
                id="password"
                placeholder="Digite sua senha"
                type="password"
                {...register('password')}
              />
              {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
            </div>

            <button className={styles.loginButton} type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginComponent;
