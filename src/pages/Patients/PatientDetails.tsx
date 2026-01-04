import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { patientService, Patient } from '../../features/patients/patientService';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
import { ArrowLeft, FileText } from 'lucide-react';
import styles from './PatientDetails.module.css';

export const PatientDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPatient = async () => {
            if (!id) return;
            try {
                const data = await patientService.getById(id);
                setPatient(data);
            } catch (error) {
                console.error('Error fetching patient:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPatient();
    }, [id]);

    if (isLoading) return <div>Carregando...</div>;
    if (!patient) return <div>Paciente não encontrado.</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button variant="ghost" onClick={() => navigate('/patients')}>
                    <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} />
                    Voltar
                </Button>
                <h1 className={styles.title}>{patient.name}</h1>
                <Button onClick={() => window.print()}>
                    <FileText size={18} style={{ marginRight: '0.5rem' }} />
                    Imprimir Ficha
                </Button>
            </div>

            <Card title="Informações Pessoais">
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Idade/Nascimento</span>
                        <span className={styles.value}>{patient.birthDate || 'N/A'}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Escolaridade</span>
                        <span className={styles.value}>{patient.schoolGrade}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Escola</span>
                        <span className={styles.value}>{patient.school}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Email/Contato</span>
                        <span className={styles.value}>{patient.email || 'N/A'}</span>
                    </div>
                </div>
            </Card>

            <div>
                <h2 className={styles.sectionTitle}>Histórico de Avaliações</h2>
                <Card>
                    <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                        Nenhuma avaliação registrada no sistema.
                    </p>
                </Card>
            </div>
        </div>
    );
};
