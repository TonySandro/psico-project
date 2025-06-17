import React, { useEffect, useState } from 'react';
import styles from './patients.module.scss';
import axios from 'axios';

interface Patient {
  id: string;
  name: string;
  age: number;
  schoolYear: string;
  gender: string;
}

const PatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get<Patient[]>('http://localhost:3301/api/all-patients');
        setPatients(response.data);
      } catch (err) {
        setError('Erro ao carregar pacientes.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Meus Pacientes</h1>
      <div className={styles.cardGrid}>
        {patients.map((patient) => (
          <div key={patient.id} className={styles.card}>
            <h2 className={styles.name}>{patient.name}</h2>
            <p className={styles.info}>Idade: {patient.age} anos</p>
            <p className={styles.info}>Escolaridade: {patient.schoolYear}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsPage;
