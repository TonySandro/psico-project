import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  TextField,
  Button,
  Stack,
  LinearProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText
} from '@mui/material';
import { CheckCircle2, ClipboardList } from 'lucide-react';
import { useGetPublicAnamnesis, useSubmitPublicAnamnesis } from '@/hooks/useAnamnesis';

export default function PublicAnamnesisPage() {
  const { token } = useParams<{ token: string }>();
  
  const { data, isLoading, isError, error } = useGetPublicAnamnesis(token || '');
  const { mutateAsync: submitAnswers, isPending: isSubmitting } = useSubmitPublicAnamnesis();
  
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { control, handleSubmit, watch, formState: { errors } } = useForm();

  // Calculate progress
  const formValues = watch();
  const getProgress = () => {
    if (!data?.questions || data.questions.length === 0) return 0;
    const answeredCount = data.questions.filter(q => {
      const val = formValues[q.id];
      if (Array.isArray(val)) return val.length > 0;
      return val !== undefined && val !== '' && val !== null;
    }).length;
    return Math.round((answeredCount / data.questions.length) * 100);
  };

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography color="text.secondary">Carregando formulário...</Typography>
        </Stack>
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="error" variant="filled">
           {/* @ts-ignore */}
          {error?.response?.data?.message || "Link inválido ou expirado. Por favor, solicite um novo link ao profissional."}
        </Alert>
      </Container>
    );
  }

  if (isSuccess) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Card sx={{ textAlign: 'center', py: 6, px: 3 }}>
          <Stack alignItems="center" spacing={2}>
            <CheckCircle2 size={64} color="#2e7d32" />
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Anamnese enviada com sucesso!
            </Typography>
            <Typography color="text.secondary">
              Agradecemos pelo preenchimento. As informações já foram enviadas para o profissional responsável.
            </Typography>
          </Stack>
        </Card>
      </Container>
    );
  }

  const onSubmitForm = async (formData: any) => {
    if (!token) return;
    
    if (window.confirm('Deseja enviar as respostas? Após o envio não será possível alterar.')) {
      try {
        await submitAnswers({ token, answers: formData });
        setIsSuccess(true);
      } catch (err) {
        alert('Erro ao enviar as respostas. Tente novamente mais tarde.');
      }
    }
  };

  const progress = getProgress();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md">
        <Typography variant="overline" color="primary" fontWeight={700}>
          FORMULÁRIO DE AVALIAÇÃO
        </Typography>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
          {data.title || "Anamnese"}
        </Typography>
        {data.patientName && (
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Paciente: <strong>{data.patientName}</strong>
          </Typography>
        )}

        <Card sx={{ mb: 4, overflow: 'visible' }}>
            <Box sx={{ width: '100%', position: 'relative' }}>
                <LinearProgress 
                    variant="determinate" 
                    value={progress} 
                    sx={{ height: 6, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} 
                />
            </Box>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Progresso: {progress}% concluído
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmitForm)}>
              <Stack spacing={4}>
                {data.questions.map((q) => (
                  <Box key={q.id}>
                    {q.type === 'text' && (
                        <Controller
                            name={q.id}
                            control={control}
                            rules={{ required: q.required ? "Este campo é obrigatório" : false }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label={q.label}
                                    required={q.required}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    )}

                    {q.type === 'textarea' && (
                        <Controller
                            name={q.id}
                            control={control}
                            rules={{ required: q.required ? "Este campo é obrigatório" : false }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label={q.label}
                                    required={q.required}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    )}

                    {q.type === 'radio' && q.options && (
                        <FormControl component="fieldset" error={!!errors[q.id]} required={q.required}>
                            <FormLabel component="legend">{q.label}</FormLabel>
                            <Controller
                                name={q.id}
                                control={control}
                                rules={{ required: q.required ? "Por favor, selecione uma opção" : false }}
                                render={({ field }) => (
                                    <RadioGroup {...field} row>
                                        {q.options?.map((opt) => (
                                            <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                        ))}
                                    </RadioGroup>
                                )}
                            />
                            {errors[q.id] && <FormHelperText>{String(errors[q.id]?.message)}</FormHelperText>}
                        </FormControl>
                    )}

                    {q.type === 'select' && q.options && (
                        <FormControl fullWidth error={!!errors[q.id]} required={q.required}>
                            <InputLabel id={`label-${q.id}`}>{q.label}</InputLabel>
                            <Controller
                                name={q.id}
                                control={control}
                                rules={{ required: q.required ? "Por favor, selecione uma opção" : false }}
                                render={({ field }) => (
                                    <Select {...field} labelId={`label-${q.id}`} label={q.label}>
                                        {q.options?.map((opt) => (
                                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors[q.id] && <FormHelperText>{String(errors[q.id]?.message)}</FormHelperText>}
                        </FormControl>
                    )}

                    {q.type === 'checkbox' && q.options && (
                        <FormControl component="fieldset" error={!!errors[q.id]} required={q.required}>
                            <FormLabel component="legend">{q.label}</FormLabel>
                            <FormGroup row>
                                {q.options.map((opt) => (
                                    <Controller
                                        key={opt}
                                        name={q.id}
                                        control={control}
                                        defaultValue={[]}
                                        rules={{ 
                                            validate: (value) => {
                                                if (q.required && (!value || value.length === 0)) return "Selecione pelo menos uma opção";
                                                return true;
                                            }
                                        }}
                                        render={({ field }) => {
                                            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                                const checked = e.target.checked;
                                                const valueArray = Array.isArray(field.value) ? field.value : [];
                                                if (checked) {
                                                    field.onChange([...valueArray, opt]);
                                                } else {
                                                    field.onChange(valueArray.filter((v: string) => v !== opt));
                                                }
                                            };
                                            return (
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox 
                                                            checked={Array.isArray(field.value) && field.value.includes(opt)}
                                                            onChange={handleChange}
                                                        />
                                                    }
                                                    label={opt}
                                                />
                                            );
                                        }}
                                    />
                                ))}
                            </FormGroup>
                            {errors[q.id] && <FormHelperText>{String(errors[q.id]?.message)}</FormHelperText>}
                        </FormControl>
                    )}
                  </Box>
                ))}

                <Box sx={{ pt: 2, borderTop: 1, borderColor: 'divider', mt: { xs: 4, md: 6 } }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <ClipboardList size={20} />}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar respostas'}
                  </Button>
                </Box>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
