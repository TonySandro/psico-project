import React, { useState } from 'react';
import axios from 'axios';
import styles from './AnamnesisForm.module.scss';

interface Props {
  patientId: string;
  patientName: string;
  age: number;
  schoolYear: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const AnamnesisForm: React.FC<Props> = ({ patientId, patientName, age, schoolYear, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    patientId,
    patientName,
    age,
    schoolYear,
    reasonForReferral: '',
    developmentalHistory: '',
    schoolHistory: '',
    familyHistory: '',
    healthHistory: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    ...formData,
    reasonForReferral: formData.reasonForReferral || '',
    developmentalHistory: formData.developmentalHistory || '',
    schoolHistory: formData.schoolHistory || '',
    familyHistory: formData.familyHistory || '',
    healthHistory: formData.healthHistory || '',
  };

  try {
    await axios.post('http://localhost:3301/api/anamnesis', payload);
    onSuccess();
  } catch (error) {
    console.error('Erro ao criar anamnese:', error);
  }
};


  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Nova Anamnese para {patientName}</h2>

      <textarea name="reasonForReferral" placeholder="Motivo do Encaminhamento" value={formData.reasonForReferral} onChange={handleChange} />
      <textarea name="developmentalHistory" placeholder="Histórico de Desenvolvimento" value={formData.developmentalHistory} onChange={handleChange} />
      <textarea name="schoolHistory" placeholder="Histórico Escolar" value={formData.schoolHistory} onChange={handleChange} />
      <textarea name="familyHistory" placeholder="Histórico Familiar" value={formData.familyHistory} onChange={handleChange} />
      <textarea name="healthHistory" placeholder="Histórico de Saúde" value={formData.healthHistory} onChange={handleChange} />

      <div className={styles.actions}>
        <button type="submit">Salvar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default AnamnesisForm;
