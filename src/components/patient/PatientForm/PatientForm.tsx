import React, { useState } from 'react';
import axios from 'axios';
import styles from './PatientForm.module.scss';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const PatientForm: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    schoolYear: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    phoneNumber: '',
    motherName: '',
    fatherName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3301/api/patients', formData);
      onSuccess();
    } catch (error) {
      console.error('Erro ao criar paciente:', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Novo Paciente</h2>

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
        <button type="submit">Salvar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default PatientForm;
