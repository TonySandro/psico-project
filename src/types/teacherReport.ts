// ─── Field Types ────────────────────────────────────────────────────────────

export type FieldType =
  | 'text'
  | 'textarea'
  | 'radio'
  | 'checkbox'
  | 'select'
  | 'date'
  | 'single_choice'
  | 'multiple_choice'
  | 'multiple_choice_with_other'
  | 'boolean';

export interface SchemaField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // for radio, checkbox, select
  rows?: number;      // for textarea
}

// ─── Section ────────────────────────────────────────────────────────────────

export interface SchemaSection {
  title: string;
  fields: SchemaField[];
}

// ─── Template Schema ─────────────────────────────────────────────────────────

export interface TeacherReportSchema {
  sections: SchemaSection[];
}

// ─── Template (from API) ─────────────────────────────────────────────────────

export interface TeacherReportTemplate {
  id: string;
  name: string;
  description?: string;
  schema: TeacherReportSchema;
  createdAt?: string;
}

// ─── Response (from API) ─────────────────────────────────────────────────────

export type TeacherReportResponseStatus = 'draft' | 'completed';

export interface TeacherReportResponse {
  id: string;
  templateId: string;
  patientId?: string;
  status: TeacherReportResponseStatus;
  answers: Record<string, unknown>;
  schema: TeacherReportSchema; // embedded schema at creation time
  templateName?: string;
  createdAt?: string;
  updatedAt?: string;
}
