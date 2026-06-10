import { Controller, type Control } from 'react-hook-form';
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  type SxProps,
} from '@mui/material';
import type { SchemaField } from '@/types/anamnesis';

interface FieldRendererProps {
  field: SchemaField;
  control: Control<Record<string, unknown>>;
  errors: Record<string, { message?: string } | undefined>;
  readOnly?: boolean;
}

const inputSx: SxProps = { bgcolor: 'background.paper' };

export default function FieldRenderer({ field, control, errors, readOnly }: FieldRendererProps) {
  const rules = {
    required: field.required ? 'Este campo é obrigatório' : false,
  };

  const error = errors[field.id];

  switch (field.type) {
    // ── Text ──────────────────────────────────────────────────────────────
    case 'text':
      return (
        <Controller
          name={field.id}
          control={control}
          defaultValue=""
          rules={rules}
          render={({ field: f, fieldState }) => (
            <TextField
              {...f}
              value={f.value as string ?? ''}
              fullWidth
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              disabled={readOnly}
              sx={inputSx}
            />
          )}
        />
      );

    // ── Textarea ───────────────────────────────────────────────────────────
    case 'textarea':
      return (
        <Controller
          name={field.id}
          control={control}
          defaultValue=""
          rules={rules}
          render={({ field: f, fieldState }) => (
            <TextField
              {...f}
              value={f.value as string ?? ''}
              fullWidth
              multiline
              rows={field.rows ?? 4}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              disabled={readOnly}
              sx={inputSx}
            />
          )}
        />
      );

    // ── Date ───────────────────────────────────────────────────────────────
    case 'date':
      return (
        <Controller
          name={field.id}
          control={control}
          defaultValue=""
          rules={rules}
          render={({ field: f, fieldState }) => (
            <TextField
              {...f}
              value={f.value as string ?? ''}
              fullWidth
              type="date"
              label={field.label}
              required={field.required}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              disabled={readOnly}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={inputSx}
            />
          )}
        />
      );

    // ── Radio ──────────────────────────────────────────────────────────────
    case 'radio':
    case 'single_choice':
      return (
        <FormControl component="fieldset" error={!!error} required={field.required} fullWidth>
          <FormLabel component="legend" sx={{ mb: 1, fontWeight: 500 }}>
            {field.label}
          </FormLabel>
          <Controller
            name={field.id}
            control={control}
            defaultValue=""
            rules={{ required: field.required ? 'Selecione uma opção' : false }}
            render={({ field: f }) => (
              <RadioGroup {...f} value={f.value as string ?? ''}>
                {(field.options ?? []).map((opt) => (
                  <FormControlLabel
                    key={opt}
                    value={opt}
                    disabled={readOnly}
                    control={<Radio size="small" />}
                    label={opt}
                  />
                ))}
              </RadioGroup>
            )}
          />
          {error && <FormHelperText>{String(error.message)}</FormHelperText>}
        </FormControl>
      );

    // ── Checkbox ───────────────────────────────────────────────────────────
    case 'checkbox':
    case 'multiple_choice':
      return (
        <FormControl component="fieldset" error={!!error} required={field.required} fullWidth>
          <FormLabel component="legend" sx={{ mb: 1, fontWeight: 500 }}>
            {field.label}
          </FormLabel>
          <FormGroup>
            {(field.options ?? []).map((opt) => (
              <Controller
                key={opt}
                name={field.id}
                control={control}
                defaultValue={[]}
                rules={{
                  validate: (value) => {
                    if (field.required && (!value || (value as string[]).length === 0))
                      return 'Selecione pelo menos uma opção';
                    return true;
                  },
                }}
                render={({ field: f }) => {
                  const arr: string[] = Array.isArray(f.value) ? (f.value as string[]) : [];
                  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.checked) {
                      f.onChange([...arr, opt]);
                    } else {
                      f.onChange(arr.filter((v) => v !== opt));
                    }
                  };
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={arr.includes(opt)}
                          onChange={handleChange}
                          disabled={readOnly}
                        />
                      }
                      label={opt}
                    />
                  );
                }}
              />
            ))}
          </FormGroup>
          {error && <FormHelperText>{String(error.message)}</FormHelperText>}
        </FormControl>
      );

    case 'multiple_choice_with_other':
      return (
        <FormControl component="fieldset" error={!!error} required={field.required} fullWidth>
          <FormLabel component="legend" sx={{ mb: 1, fontWeight: 500 }}>
            {field.label}
          </FormLabel>
          <Controller
            name={field.id}
            control={control}
            defaultValue={{ selected: [], other: '' }}
            rules={{
              validate: (value) => {
                const selected = Array.isArray((value as { selected?: unknown[] })?.selected)
                  ? (value as { selected: unknown[] }).selected
                  : Array.isArray(value)
                    ? value
                    : [];
                const other = String((value as { other?: unknown })?.other ?? '').trim();
                if (field.required && selected.length === 0 && !other) {
                  return 'Selecione pelo menos uma opção';
                }
                return true;
              },
            }}
            render={({ field: f, fieldState }) => {
              const selected = Array.isArray((f.value as { selected?: unknown[] })?.selected)
                ? (f.value as { selected: string[] }).selected
                : Array.isArray(f.value)
                  ? (f.value as string[])
                  : [];
              const other = String((f.value as { other?: unknown })?.other ?? '');
              const updateValue = (nextSelected: string[], nextOther = other) => {
                f.onChange({ selected: nextSelected, other: nextOther });
              };

              return (
                <>
                  <FormGroup>
                    {(field.options ?? []).map((opt) => (
                      <FormControlLabel
                        key={opt}
                        control={
                          <Checkbox
                            size="small"
                            checked={selected.includes(opt)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateValue([...selected, opt]);
                              } else {
                                updateValue(selected.filter((v) => v !== opt));
                              }
                            }}
                            disabled={readOnly}
                          />
                        }
                        label={opt}
                      />
                    ))}
                  </FormGroup>
                  <TextField
                    value={other}
                    onChange={(e) => updateValue(selected, e.target.value)}
                    fullWidth
                    size="small"
                    label="Outro"
                    placeholder="Informe outra opção"
                    disabled={readOnly}
                    error={!!fieldState.error}
                    sx={{ ...inputSx, mt: 1 }}
                  />
                  {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
                </>
              );
            }}
          />
        </FormControl>
      );

    case 'boolean':
      return (
        <FormControl component="fieldset" error={!!error} required={field.required} fullWidth>
          <FormLabel component="legend" sx={{ mb: 1, fontWeight: 500 }}>
            {field.label}
          </FormLabel>
          <Controller
            name={field.id}
            control={control}
            defaultValue={null}
            rules={{
              validate: (value) => {
                if (field.required && value !== true && value !== false) {
                  return 'Selecione uma opção';
                }
                return true;
              },
            }}
            render={({ field: f }) => (
              <RadioGroup
                value={f.value === true ? 'true' : f.value === false ? 'false' : ''}
                onChange={(e) => f.onChange(e.target.value === 'true')}
              >
                <FormControlLabel
                  value="true"
                  disabled={readOnly}
                  control={<Radio size="small" />}
                  label="Sim"
                />
                <FormControlLabel
                  value="false"
                  disabled={readOnly}
                  control={<Radio size="small" />}
                  label="Não"
                />
              </RadioGroup>
            )}
          />
          {error && <FormHelperText>{String(error.message)}</FormHelperText>}
        </FormControl>
      );

    // ── Select ─────────────────────────────────────────────────────────────
    case 'select':
      return (
        <FormControl fullWidth error={!!error} required={field.required}>
          <InputLabel id={`label-${field.id}`}>{field.label}</InputLabel>
          <Controller
            name={field.id}
            control={control}
            defaultValue=""
            rules={{ required: field.required ? 'Selecione uma opção' : false }}
            render={({ field: f }) => (
              <Select
                {...f}
                value={f.value as string ?? ''}
                labelId={`label-${field.id}`}
                label={field.label}
                disabled={readOnly}
                sx={inputSx}
              >
                {(field.options ?? []).map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {error && <FormHelperText>{String(error.message)}</FormHelperText>}
        </FormControl>
      );

    default:
      return null;
  }
}
