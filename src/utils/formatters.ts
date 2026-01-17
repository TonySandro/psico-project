import type { PatientStatus, TestType } from '@/types/enums';

// Date formatters
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Number formatters
export const formatAge = (age: number): string => {
  return `${age} anos`;
};

export const formatScore = (score: number): string => {
  return score.toFixed(1);
};

// Status formatters
export const formatPatientStatus = (status: PatientStatus): string => {
  const statusMap: Record<PatientStatus, string> = {
    active: 'Ativo',
    inactive: 'Inativo'
  };
  return statusMap[status] || status;
};

export const formatTestType = (type: TestType): string => {
  const typeMap: Record<TestType, string> = {
    TDE: 'TDE - Teste de Desempenho Escolar',
    CARS: 'CARS - Escala de Avaliação de Autismo',
    Stroop: 'Stroop - Teste de Cores e Palavras',
    ATA: 'ATA - Avaliação de Atenção',
    SNAP: 'SNAP - Escala de TDAH',
    Token: 'Token - Teste de Compreensão'
  };
  return typeMap[type] || type;
};