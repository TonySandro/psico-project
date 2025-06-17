import React from 'react';
import styles from './PatientCard.module.scss';

interface Patient {
  id: string;
  name: string;
  age: number;
  schoolYear: string;
  gender: string;
  address?: string;
  phoneNumber?: string;
  motherName?: string;
  fatherName?: string;
}

interface Props {
  patient: Patient;
  isExpanded: boolean;
  isListView: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onAddAnamnesis: () => void;
  onDelete: () => void;
}

const PatientCard: React.FC<Props> = ({
  patient,
  isExpanded,
  isListView,
  onSelect,
  onEdit,
  onAddAnamnesis,
  onDelete,
}) => {
  return (
    <div
      className={`${styles.card} ${isListView ? styles.listView : styles.gridView} ${isExpanded ? styles.expanded : ''}`}
      onClick={onSelect}
    >
      <div className={styles.basicInfo}>
        <h2>{patient.name}</h2>
        <p>{patient.age} anos | {patient.schoolYear}</p>
      </div>

      {isExpanded && (
        <div className={styles.details}>
          <p>Gênero: {patient.gender}</p>
          {patient.address && <p>Endereço: {patient.address}</p>}
          {patient.phoneNumber && <p>Telefone: {patient.phoneNumber}</p>}
          {patient.motherName && <p>Mãe: {patient.motherName}</p>}
          {patient.fatherName && <p>Pai: {patient.fatherName}</p>}

          <div className={styles.actions}>
            <button className={styles.editButton} onClick={(e) => { e.stopPropagation(); onEdit(); }}>Editar</button>
            <button className={styles.anamnesisButton} onClick={(e) => { e.stopPropagation(); onAddAnamnesis(); }}>Adicionar Anamnese</button>
            <button className={styles.deleteButton} onClick={(e) => { e.stopPropagation(); onDelete(); }}>Excluir</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientCard;
