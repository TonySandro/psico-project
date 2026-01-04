import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '../../components/ui/Card/Card';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../features/auth/authService';
import styles from './Login.module.css';

const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, 'Senha é obrigatória'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const setLogin = useAuthStore((state) => state.login);
    const [loginError, setLoginError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoginError(null);
        try {
            const response = await authService.login(data.email, data.password);

            // Adaptation: Check if response has user object, if not create a temporary one or decode token in future
            const token = response.accessToken;
            // Fallback user if not provided by backend
            const user = response.user || {
                id: 'tmp-id',
                name: 'Usuário',
                email: data.email,
                role: 'professional',
                accountId: 'tmp-account'
            };

            setLogin(user, token);
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Login failed', error);
            // Try to extract message from response
            const msg = error.response?.data?.error || 'Falha no login. Verifique suas credenciais.';
            setLoginError(msg);
        }
    };

    return (
        <div className={styles.container}>
            <Card className={styles.loginCard}>
                <h1 className={styles.title}>NeuroPPAvalia</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="seu@email.com"
                        {...register('email')}
                        error={errors.email?.message}
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Sua senha"
                        {...register('password')}
                        error={errors.password?.message}
                    />

                    {loginError && <div className={styles.errorMessage} style={{ color: 'red', fontSize: '0.875rem', marginBottom: '1rem' }}>{loginError}</div>}

                    <Button type="submit" fullWidth disabled={isSubmitting}>
                        {isSubmitting ? 'Entrando...' : 'Entrar'}
                    </Button>
                </form>
                <div className={styles.footer}>
                    Não tem uma conta? <Link to="/register" className={styles.link}>Cadastre-se</Link>
                </div>
            </Card>
        </div>
    );
};
