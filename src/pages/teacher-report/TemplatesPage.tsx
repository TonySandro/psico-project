import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ClipboardList, FileText, Play, Search, Settings2 } from 'lucide-react';
import { useCreateTeacherReportResponse, useTeacherReportTemplates } from '@/hooks/useTeacherReportV2';
import type { TeacherReportTemplate } from '@/types/teacherReport';
import { countTeacherReportFields } from '@/utils/teacherReportSchema';

export default function TeacherReportTemplatesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId');

  const { data: templates, isLoading, isError } = useTeacherReportTemplates();
  const { mutateAsync: createResponse, isPending: isCreating } = useCreateTeacherReportResponse();

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<TeacherReportTemplate | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const filtered = (templates ?? []).filter(
    (template: TeacherReportTemplate) =>
      template.name.toLowerCase().includes(search.toLowerCase()) ||
      (template.description ?? '').toLowerCase().includes(search.toLowerCase()),
  );

  const handleUse = (template: TeacherReportTemplate) => {
    if (!patientId) {
      alert("Para iniciar um relatório do professor, acesse o prontuário do paciente e clique em 'Novo relatório'.");
      return;
    }
    setSelected(template);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!selected) return;
    try {
      const response = await createResponse({
        templateId: selected.id,
        patientId: patientId || undefined,
      });
      setConfirmOpen(false);
      navigate(`/app/teacher-report/respond/${response.id}`);
    } catch {
      alert('Erro ao iniciar relatório do professor. Tente novamente.');
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        Erro ao carregar modelos de relatório do professor. Verifique sua conexão e tente novamente.
      </Alert>
    );
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="overline" color="primary" fontWeight={700}>
            Relatório do professor
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            Modelos disponíveis
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Play size={20} />}
          onClick={() => navigate('/app/teacher-report/templates/new')}
        >
          Novo modelo
        </Button>
      </Stack>

      <TextField
        placeholder="Buscar modelo..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        sx={{ maxWidth: 400 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} />
              </InputAdornment>
            ),
          },
        }}
      />

      {filtered.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10, color: 'text.secondary' }}>
          <ClipboardList size={48} style={{ opacity: 0.3, margin: '0 auto 16px' }} />
          <Typography variant="h6" gutterBottom>
            {search ? 'Nenhum modelo encontrado' : 'Nenhum modelo cadastrado'}
          </Typography>
          <Typography variant="body2">
            {search
              ? 'Tente uma busca diferente.'
              : 'Os modelos de relatório do professor serão exibidos aqui quando estiverem disponíveis.'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((template: TeacherReportTemplate) => {
            const { sectionCount, fieldCount } = countTeacherReportFields(template);

            return (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={template.id}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'box-shadow .2s',
                    '&:hover': { boxShadow: 4 },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 1.5 }}>
                      <Box
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                          borderRadius: 2,
                          p: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <FileText size={20} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={700} lineHeight={1.3}>
                          {template.name}
                        </Typography>
                        {template.createdAt && (
                          <Typography variant="caption" color="text.secondary">
                            {new Date(template.createdAt).toLocaleDateString('pt-BR')}
                          </Typography>
                        )}
                      </Box>
                    </Stack>

                    {template.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {template.description}
                      </Typography>
                    )}

                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      <Chip
                        label={`${sectionCount} ${sectionCount === 1 ? 'seção' : 'seções'}`}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                      <Chip
                        label={`${fieldCount} pergunta${fieldCount !== 1 ? 's' : ''}`}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
                    <Button variant="contained" startIcon={<Play size={16} />} onClick={() => handleUse(template)} fullWidth>
                      Usar modelo
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Settings2 size={16} />}
                      onClick={() => navigate(`/app/teacher-report/templates/${template.id}`)}
                    >
                      Ver
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>Iniciar relatório do professor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja iniciar o relatório <strong>&quot;{selected?.name}&quot;</strong>? Um rascunho será criado
            para este paciente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} disabled={isCreating}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={isCreating}
            startIcon={isCreating ? <CircularProgress size={16} color="inherit" /> : <Play size={16} />}
          >
            {isCreating ? 'Iniciando...' : 'Iniciar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
