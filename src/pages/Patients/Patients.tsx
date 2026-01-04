import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash } from 'lucide-react';
import { Button } from '../../components/ui/Button/Button';
import { Input } from '../../components/ui/Input/Input';
import { Card } from '../../components/ui/Card/Card';
import { useAuthStore } from '../../store/authStore';
import { patientService, Patient } from '../../features/patients/patientService';
import { AddPatientModal } from './AddPatientModal';
import styles from './Patients.module.css';

export const Patients: React.FC = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPatients = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            console.log("usuario: ", user);
            const data = await patientService.getAllByAccount(user.accountId);
            // Ensure data is array (backend might return wrapped object, need verification.
            // Assuming array based on service implementation)
            setPatients(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching patients:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, [user]);

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Pacientes</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} />
                    Novo Paciente
                </Button>
            </div>

            <div className={styles.filters}>
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={20} />
                    <Input
                        placeholder="Buscar paciente..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </div>

            <Card className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={3} style={{ textAlign: 'center', padding: '2rem' }}>Carregando...</td></tr>
                        ) : filteredPatients.length === 0 ? (
                            <tr><td colSpan={3} style={{ textAlign: 'center', padding: '2rem' }}>Nenhum paciente encontrado.</td></tr>
                        ) : (
                            filteredPatients.map(patient => (
                                <tr key={patient.id}>
                                    <td className={styles.nameCell} onClick={() => navigate(`/patients/${patient.id}`)} style={{ cursor: 'pointer' }}>
                                        <div style={{ fontWeight: 'bold' }}>{patient.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{patient.schoolGrade} - {patient.school}</div>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles.Ativo}`}>
                                            Ativo
                                        </span>
                                    </td>
                                    <td className={styles.actionsCell}>
                                        <button className={styles.actionBtn}><Edit size={18} /></button>
                                        <button className={`${styles.actionBtn} ${styles.deleteBtn}`}><Trash size={18} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </Card>

            {isModalOpen && (
                <AddPatientModal
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={fetchPatients}
                />
            )}
        </div>
    );
};
