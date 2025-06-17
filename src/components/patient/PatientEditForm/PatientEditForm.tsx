import React, { useState } from 'react';
import axios from 'axios';
import styles from './PatientEditForm.module.scss';

interface Patient {
  id: string;
  name: string;
  age: number;
  schoolYear: string;
  dateOfBirth?: string;
  gender: string;
  address?: string;
  phoneNumber?: string;
  motherName?: string;
  fatherName?: string;
}

interface Props {
  patient: Patient;
  onSuccess: () => void;
  onCancel: () => void;
}

const PatientEditForm: React.FC<Props> = ({ patient, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: patient.name,
    age: patient.age,
    schoolYear: patient.schoolYear,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    address: patient.address || '',
    phoneNumber: patient.phoneNumber || '',
    motherName: patient.motherName || '',
    fatherName: patient.fatherName || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3301/api/patients/${patient.id}`, formData);
      onSuccess();
    } catch (error) {
      console.error('Erro ao editar paciente:', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Editando Paciente: {patient.name}</h2>

      <input name="name" placeholder="Nome" value={formData.name} onChange={handleChange} required />
      <input name="age" type="number" placeholder="Idade" value={formData.age} onChange={handleChange} required />
      <input name="schoolYear" placeholder="Ano Escolar" value={formData.schoolYear} onChange={handleChange} required />
      <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
      <input name="gender" placeholder="Gênero" value={formData.gender} onChange={handleChange} required />
      <input name="address" placeholder="Endereço" value={formData.address} onChange={handleChange} />
      <input name="phoneNumber" placeholder="Telefone" value={formData.phoneNumber} onChange={handleChange} />
      <input name="motherName" placeholder="Nome da Mãe" value={formData.motherName} onChange={handleChange} />
      <input name="fatherName" placeholder="Nome do Pai" value={formData.fatherName} onChange={handleChange} />

      <div className={styles.actions}>
        <button type="submit">Salvar Alterações</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default PatientEditForm;
