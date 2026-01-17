import { useForm, Controller } from 'react-hook-form';
import { DialogContent, DialogActions, Button, TextField, Grid, MenuItem, Stack, Alert } from '@mui/material';
import { useCreatePatient, useUpdatePatient } from '@/hooks/usePatients';
import { useAuthStore } from '@/stores/authStore';
import type { Patient } from '@/types/schema';
import type { SchoolYear, Gender, PatientStatus } from '@/types/enums';

interface PatientFormProps {
  patient?: Patient;
  onClose: () => void;
}

interface FormData {
  name: string;
  age: number;
  dateOfBirth: string;
  gender: Gender;
  schoolYear: SchoolYear;
  address: string;
  phoneNumber: string;
  motherName: string;
  fatherName: string;
  status: PatientStatus;
}

const schoolYears: SchoolYear[] = [
  'Educação Infantil',
  '1º Ano',
  '2º Ano',
  '3º Ano',
  '4º Ano',
  '5º Ano',
  '6º Ano',
  '7º Ano',
  '8º Ano',
  '9º Ano',
  'Ensino Médio'
];

const genders: Gender[] = ['Masculino', 'Feminino', 'Outro'];
const statuses: PatientStatus[] = ['active', 'inactive'];

export default function PatientForm({ patient, onClose }: PatientFormProps) {
  const user = useAuthStore((state) => state.user);
  const createPatient = useCreatePatient();
  const updatePatient = useUpdatePatient();
  const isEditing = !!patient;

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: patient ? {
      ...patient,
      status: patient.status || 'active'
    } : {
      name: '',
      age: 0,
      dateOfBirth: '',
      gender: 'Outro',
      schoolYear: 'Educação Infantil',
      address: '',
      phoneNumber: '',
      motherName: '',
      fatherName: '',
      status: 'active'
    }
  });

  const onSubmit = (data: FormData) => {
    const patientData = {
      ...data,
      accountId: user?.id,
    };

    if (isEditing && patient) {
      updatePatient.mutate(
        { id: patient.id, data: patientData },
        { onSuccess: onClose }
      );
    } else {
      createPatient.mutate(patientData, { onSuccess: onClose });
    }
  };

  const isPending = createPatient.isPending || updatePatient.isPending;
  const error = createPatient.error || updatePatient.error;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <Stack spacing={3}>
          {error && (
            <Alert severity="error">
              Erro ao salvar paciente. Tente novamente.
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Nome é obrigatório' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome Completo"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="age"
                control={control}
                rules={{ required: 'Idade é obrigatória', min: 0 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Idade"
                    type="number"
                    error={!!errors.age}
                    helperText={errors.age?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{ required: 'Data de nascimento é obrigatória' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Data de Nascimento"
                    type="date"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'Status é obrigatório' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    select
                    label="Status"
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status === 'active' ? 'Ativo' : 'Inativo'}
                      </MenuItem >
                    ))
                    }
                  </TextField >
                )}
              />
            </Grid >

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    select
                    label="Gênero"
                  >
                    {genders.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name="schoolYear"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    select
                    label="Escolaridade"
                  >
                    {schoolYears.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Endereço"
                    multiline
                    rows={2}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Telefone"
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="motherName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome da Mãe"
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="fatherName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome do Pai"
                  />
                )}
              />
            </Grid>
          </Grid >
        </Stack >
      </DialogContent >

      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
        >
          {isPending ? 'Salvando...' : isEditing ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogActions>
    </form >
  );
}