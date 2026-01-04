import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '../../components/ui/Card/Card';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { useAuthStore } from '../../store/authStore';
// import { api } from '../../services/api';
// import styles from './Profile.module.css'; // Use Card styles or generic for now

const profileSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    profession: z.string().optional(),
    currentPassword: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').optional().or(z.literal('')),
    newPassword: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').optional().or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
}).refine((data) => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
    }
    return true;
}, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const Profile: React.FC = () => {
    const { user } = useAuthStore(); // login used here to update user state if needed
    const [successMsg, setSuccessMsg] = React.useState<string | null>(null);
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || '',
            profession: '', // Add profession to User type if needed
        }
    });

    const onSubmit = async (/* data: ProfileFormData */) => {
        setSuccessMsg(null);
        setErrorMsg(null);
        try {
            // Simulate API call or real one
            // Simulate API call (Endpoint /profile not implemented in backend yet)
            /*
            await api.patch('/profile', {
                name: data.name,
                profession: data.profession,
                // Only send password if changed
                ...(data.newPassword ? {
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword
                } : {})
            });
            */
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Update local state (assuming API returns updated user)
            // login({ ...user!, name: data.name }, useAuthStore.getState().token!);

            setSuccessMsg('Perfil atualizado com sucesso! (Simulação - API pendente)');
        } catch (error: any) {
            console.error(error);
            setErrorMsg('Erro ao atualizar perfil.');
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '2rem', color: 'var(--primary-color)' }}>Configurações do Perfil</h1>

            <Card>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Dados Pessoais</h2>

                    <Input
                        label="Nome"
                        {...register('name')}
                        error={errors.name?.message}
                    />

                    <Input
                        label="Email"
                        value={user?.email || ''}
                        disabled
                        readOnly
                        style={{ backgroundColor: '#f5f5f5' }}
                    />

                    <Input
                        label="Profissão"
                        placeholder="Ex: Neuropsicopedagogo"
                        {...register('profession')}
                        error={errors.profession?.message}
                    />

                    <div style={{ borderTop: '1px solid #eee', margin: '1rem 0' }}></div>

                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Alterar Senha</h2>

                    <Input
                        label="Senha Atual"
                        type="password"
                        {...register('currentPassword')}
                        error={errors.currentPassword?.message}
                    />

                    <Input
                        label="Nova Senha"
                        type="password"
                        {...register('newPassword')}
                        error={errors.newPassword?.message}
                    />

                    <Input
                        label="Confirmar Nova Senha"
                        type="password"
                        {...register('confirmPassword')}
                        error={errors.confirmPassword?.message}
                    />

                    {successMsg && <div style={{ color: 'green', padding: '10px', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>{successMsg}</div>}
                    {errorMsg && <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>{errorMsg}</div>}

                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit" disabled={isSubmitting} style={{ width: 'auto', padding: '0.75rem 2rem' }}>
                            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};
