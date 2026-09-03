import { forwardRef } from 'react';

export interface PrintField {
  id: string;
  label: string;
  type: string;
  options?: string[];
}

export interface PrintSection {
  title: string;
  fields: PrintField[];
}

export interface PrintSchema {
  sections: PrintSection[];
}

interface FormPrintViewProps {
  title: string;
  subtitle?: string;
  patientName?: string;
  schema: PrintSchema;
  answers: Record<string, unknown>;
  printedAt?: Date;
}

/** Formats a field value into a readable string for printing. */
function formatValue(value: unknown, field: PrintField): string {
  if (value === undefined || value === null || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  if (value === 'true') return 'Sim';
  if (value === 'false') return 'Não';
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(', ') : '—';
  }
  if (typeof value === 'object' && value !== null && 'selected' in value) {
    const v = value as { selected?: string[]; other?: string };
    const parts: string[] = [];
    if (Array.isArray(v.selected) && v.selected.length > 0) parts.push(...v.selected);
    if (v.other && String(v.other).trim()) parts.push(`Outro: ${v.other}`);
    return parts.length > 0 ? parts.join(', ') : '—';
  }
  if (field.type === 'date' && typeof value === 'string' && value.includes('-')) {
    const [y, m, d] = value.split('-');
    if (y && m && d) return `${d}/${m}/${y}`;
  }
  return String(value);
}

const FormPrintView = forwardRef<HTMLDivElement, FormPrintViewProps>(
  ({ title, subtitle, patientName, schema, answers, printedAt }, ref) => {
    const dateStr = (printedAt ?? new Date()).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    });

    return (
      <div ref={ref} style={styles.page}>
        <div style={styles.header}>
          <h1 style={styles.title}>{title}</h1>
          {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
          {patientName && (
            <p style={styles.meta}><strong>Paciente:</strong> {patientName}</p>
          )}
          <p style={styles.meta}><strong>Data de impressão:</strong> {dateStr}</p>
          <div style={styles.divider} />
        </div>

        {schema.sections.map((section, si) => (
          <div key={si} style={styles.section}>
            <h2 style={styles.sectionTitle}>{section.title}</h2>
            <div style={styles.sectionDivider} />
            {section.fields.map((field) => {
              const value = answers[field.id];
              const formatted = formatValue(value, field);
              const isLong = formatted.length > 80 || field.type === 'textarea';
              return (
                <div key={field.id} style={isLong ? styles.fieldBlockWide : styles.fieldBlock}>
                  <span style={styles.fieldLabel}>{field.label}:</span>
                  {isLong ? (
                    <div style={styles.fieldValueBlock}>{formatted}</div>
                  ) : (
                    <span style={styles.fieldValue}>{formatted}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        <div style={styles.footer}>
          <div style={styles.signatureLine} />
          <p style={styles.signatureText}>Assinatura do profissional</p>
        </div>
      </div>
    );
  },
);

FormPrintView.displayName = 'FormPrintView';
export default FormPrintView;

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "'Segoe UI', Arial, sans-serif",
    fontSize: '12pt',
    color: '#1a1a1a',
    background: '#fff',
    padding: '24mm 20mm 20mm 20mm',
    maxWidth: '210mm',
    margin: '0 auto',
    lineHeight: 1.55,
  },
  header: { marginBottom: '8mm' },
  title: { fontSize: '18pt', fontWeight: 700, margin: '0 0 4px 0', color: '#1a237e' },
  subtitle: { fontSize: '11pt', color: '#555', margin: '2px 0 6px 0' },
  meta: { fontSize: '10.5pt', color: '#333', margin: '2px 0' },
  divider: { borderBottom: '2px solid #1a237e', marginTop: '6mm', marginBottom: '6mm' },
  section: { marginBottom: '7mm', pageBreakInside: 'avoid' },
  sectionTitle: { fontSize: '13pt', fontWeight: 700, margin: '0 0 2px 0', color: '#1a237e' },
  sectionDivider: { borderBottom: '1px solid #aaa', marginBottom: '4mm' },
  fieldBlock: { display: 'flex', flexDirection: 'row', gap: '6px', marginBottom: '5px', flexWrap: 'wrap' },
  fieldBlockWide: { display: 'flex', flexDirection: 'column', marginBottom: '7px' },
  fieldLabel: { fontWeight: 600, color: '#333', minWidth: '140px', flexShrink: 0 },
  fieldValue: { color: '#1a1a1a', flex: 1 },
  fieldValueBlock: { color: '#1a1a1a', marginTop: '2px', paddingLeft: '4px', borderLeft: '3px solid #ddd', whiteSpace: 'pre-wrap' },
  footer: { marginTop: '14mm', textAlign: 'center' },
  signatureLine: { borderBottom: '1px solid #555', width: '60%', margin: '0 auto 6px auto' },
  signatureText: { fontSize: '9pt', color: '#777', margin: 0 },
};
