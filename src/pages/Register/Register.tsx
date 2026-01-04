import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card/Card';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import styles from './Register.module.css';

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        crp: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("As senhas não coincidem");
            return;
        }

        setIsLoading(true);
        // Mock registration
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate('/login');
        } catch (error) {
            console.error('Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className={styles.container}>
            <Card className={styles.registerCard}>
                <h1 className={styles.title}>Crie sua conta</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        label="Nome Completo"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="CRP (Opcional)"
                        name="crp"
                        value={formData.crp}
                        onChange={handleChange}
                        placeholder="00/00000"
                    />
                    <div className={styles.row}>
                        <Input
                            label="Senha"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Confirmar Senha"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button type="submit" fullWidth disabled={isLoading}>
                        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                    </Button>
                </form>
                <div className={styles.footer}>
                    Já tem uma conta? <Link to="/login" className={styles.link}>Faça login</Link>
                </div>
            </Card>
        </div>
    );
};
