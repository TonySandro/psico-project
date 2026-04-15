// ─── Field Types ────────────────────────────────────────────────────────────

export type FieldType = 'text' | 'textarea' | 'radio' | 'checkbox' | 'select' | 'date';

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

export interface AnamnesisSchema {
  sections: SchemaSection[];
}

// ─── Template (from API) ─────────────────────────────────────────────────────

export interface AnamnesisTemplate {
  id: string;
  name: string;
  description?: string;
  schema: AnamnesisSchema;
  createdAt?: string;
}

// ─── Response (from API) ─────────────────────────────────────────────────────

export type AnamnesisResponseStatus = 'draft' | 'completed';

export interface AnamnesisResponse {
  id: string;
  templateId: string;
  patientId?: string;
  status: AnamnesisResponseStatus;
  answers: Record<string, unknown>;
  schema: AnamnesisSchema; // embedded schema at creation time
  templateName?: string;
  createdAt?: string;
  updatedAt?: string;
}
