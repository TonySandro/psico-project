import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { patientService } from '../../features/patients/patientService';
import { Button } from '../../components/ui/Button/Button';
import { Input } from '../../components/ui/Input/Input';
import styles from './AddPatientModal.module.css';

interface AddPatientModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({ onClose, onSuccess }) => {
    const user = useAuthStore((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        birthDate: '',
        school: '',
        schoolGrade: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.accountId) return;

        setIsLoading(true);
        try {
            await patientService.create({
                ...formData,
                accountId: user.accountId,
                status: 'Ativo'
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error creating patient:', error);
            alert('Erro ao criar paciente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Novo Paciente</h2>
                    <button onClick={onClose} className={styles.closeButton}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        label="Nome Completo"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Email/Contato"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        label="Data de Nascimento"
                        name="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Escola"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                    />
                    <Input
                        label="Série/Ano Escolar"
                        name="schoolGrade"
                        value={formData.schoolGrade}
                        onChange={handleChange}
                    />

                    <div className={styles.footer}>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Salvando...' : 'Salvar Paciente'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
