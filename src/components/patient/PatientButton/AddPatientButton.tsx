import React from 'react';
import styles from './AddPatientButton.module.scss';

interface Props {
  onClick: () => void;
}

const AddPatientButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      + Adicionar Paciente
    </button>
  );
};

export default AddPatientButton;
