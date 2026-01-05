import type { Gender, SchoolYear, TestType, PatientStatus } from './enums';

// API response types
export interface Account {
  id: string;
  name: string;
  email: string;
  accessToken?: string;
}

export interface Patient {
  id: string;
  accountId: string;
  name: string;
  age: number;
  schoolYear: SchoolYear;
  dateOfBirth: string;
  gender: Gender;
  address: string;
  phoneNumber: string;
  motherName: string;
  fatherName: string;
  status?: PatientStatus;
  createdAt?: string;
}

export interface Anamnesis {
  id: string;
  patientId: string;
  accountId: string;
  patientName: string;
  age: number;
  schoolYear: SchoolYear;
  reasonForReferral: string;
  developmentalHistory: string;
  schoolHistory: string;
  familyHistory: string;
  healthHistory: string;
  createdAt?: string;
}

export interface Protocol {
  id: string;
  patientId: string;
  accountId: string;
  name: string;
  type: TestType;
  data: Record<string, unknown>;
  createdAt?: string;
}

export interface Statistics {
  totalActivePatients: number;
  totalInactivePatients: number;
  newPatientsThisMonth: number;
  patientsByAgeGroup: Record<string, number>;
  patientsByEducationLevel: Record<string, number>;
  totalProtocols: number;
  protocolsByTestType: Record<string, number>;
  mostUsedTests: string[];
}

// Component props
export interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export interface PatientFormProps {
  patient?: Patient;
  onSubmit: (data: Partial<Patient>) => void;
  onCancel: () => void;
}

export interface TestFormProps {
  testType: TestType;
  onSubmit: (data: unknown) => void;
  onCancel: () => void;
}