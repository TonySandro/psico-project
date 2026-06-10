import type { AnamnesisSchema, SchemaField } from './anamnesis';
import type { Patient } from './schema';

export type TeacherReportQuestionType =
  | 'textarea'
  | 'single_choice'
  | 'multiple_choice'
  | 'multiple_choice_with_other'
  | 'boolean';

export interface TeacherReportQuestion {
  id: string;
  type: TeacherReportQuestionType;
  label: string;
  question?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  rows?: number;
}

export interface TeacherReportTemplate {
  id: string;
  name: string;
  description?: string;
  questions?: TeacherReportQuestion[];
  schema?: AnamnesisSchema;
  createdAt?: string;
}

export type TeacherReportResponseStatus = 'draft' | 'completed';

export interface TeacherReportResponse {
  id: string;
  templateId: string;
  patientId?: string;
  status: TeacherReportResponseStatus;
  answers: Record<string, unknown>;
  questions?: TeacherReportQuestion[];
  schema?: AnamnesisSchema;
  templateName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PublicTeacherReportLink {
  link?: string;
  token?: string;
  expiresAt?: string;
  status?: 'PENDING' | 'ANSWERED';
}

export interface PublicTeacherReportData {
  title?: string;
  templateName?: string;
  patient?: Partial<Patient>;
  patientName?: string;
  questions?: TeacherReportQuestion[];
  schema?: AnamnesisSchema;
}

export type TeacherReportTemplateForm = {
  name: string;
  description?: string;
  schema: {
    sections: Array<{
      title: string;
      fields: Array<SchemaField & { type: TeacherReportQuestionType }>;
    }>;
  };
};
