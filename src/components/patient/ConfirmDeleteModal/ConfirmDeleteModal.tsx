import React from 'react';
import styles from './ConfirmDeleteModal.module.scss';

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<Props> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>Tem certeza que deseja excluir este paciente?</p>
        <button onClick={onConfirm}>Sim</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
