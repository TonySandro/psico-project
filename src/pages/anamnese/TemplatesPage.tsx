import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Stack,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  ClipboardList,
  Play,
  Search,
  FileText,
  Settings2,
} from 'lucide-react';
import { useAnamnesisTemplates, useCreateAnamnesisResponse } from '@/hooks/useAnamnesisV2';
import type { AnamnesisTemplate } from '@/types/anamnesis';

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId');
  
  const { data: templates, isLoading, isError } = useAnamnesisTemplates();
  const { mutateAsync: createResponse, isPending: isCreating } = useCreateAnamnesisResponse();

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<AnamnesisTemplate | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const filtered = (templates ?? []).filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      (t.description ?? '').toLowerCase().includes(search.toLowerCase()),
  );

  const handleUse = (template: AnamnesisTemplate) => {
    if (!patientId) {
      alert("Para iniciar uma nova anamnese a partir deste modelo, acesse o prontuário do paciente e clique em 'Nova Anamnese'.");
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
          patientId: patientId || undefined 
      });
      setConfirmOpen(false);
      navigate(`/app/anamneses/respond/${response.id}`);
    } catch {
      alert('Erro ao iniciar anamnese. Tente novamente.');
    }
  };

  // ── Loading ──────────────────────────────────────────────────────────────
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
        Erro ao carregar modelos de anamnese. Verifique sua conexão e tente novamente.
      </Alert>
    );
  }

  return (
    <Stack spacing={3}>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="overline" color="primary" fontWeight={700}>
            Anamneses
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            Modelos Disponíveis
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Play size={20} />}
          onClick={() => navigate('/app/anamneses/templates/new')}
        >
          Novo Modelo
        </Button>
      </Stack>

      {/* ── Search ────────────────────────────────────────────────────────── */}
      <TextField
        placeholder="Buscar modelo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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

      {/* ── Empty State ───────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 10,
            color: 'text.secondary',
          }}
        >
          <ClipboardList size={48} style={{ opacity: 0.3, margin: '0 auto 16px' }} />
          <Typography variant="h6" gutterBottom>
            {search ? 'Nenhum modelo encontrado' : 'Nenhum modelo cadastrado'}
          </Typography>
          <Typography variant="body2">
            {search
              ? 'Tente uma busca diferente.'
              : 'Os modelos de anamnese serão exibidos aqui quando estiverem disponíveis.'}
          </Typography>
        </Box>
      ) : (
        /* ── Template Cards ──────────────────────────────────────────────── */
        <Grid container spacing={3}>
          {filtered.map((template, index) => {
            const sectionCount = template.schema?.sections?.length ?? 0;
            const fieldCount =
              template.schema?.sections?.reduce(
                (acc, s) => acc + (s.fields?.length ?? 0),
                0,
              ) ?? 0;

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
                    {/* Icon + name */}
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
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="subtitle1" fontWeight={700} lineHeight={1.3}>
                            {template.name}
                          </Typography>
                          {index === 0 && (
                            <Chip 
                                label="Ativo no Link Externo" 
                                size="small" 
                                color="success" 
                                sx={{ height: 20, fontSize: '0.65rem' }} 
                            />
                          )}
                        </Stack>
                        {template.createdAt && (
                          <Typography variant="caption" color="text.secondary">
                            {new Date(template.createdAt).toLocaleDateString('pt-BR')}
                          </Typography>
                        )}
                      </Box>
                    </Stack>

                    {/* Description */}
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

                    {/* Metadata chips */}
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      <Chip
                        label={`${sectionCount} ${sectionCount === 1 ? 'seção' : 'seções'}`}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                      <Chip
                        label={`${fieldCount} campo${fieldCount !== 1 ? 's' : ''}`}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<Play size={16} />}
                      onClick={() => handleUse(template)}
                      fullWidth
                    >
                      Usar modelo
                    </Button>
                    <Button 
                      variant="outlined" 
                      startIcon={<Settings2 size={16} />}
                      onClick={() => navigate(`/app/anamneses/templates/edit/${template.id}`)}
                    >
                      Editar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* ── Confirm Dialog ────────────────────────────────────────────────── */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>Iniciar anamnese</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja iniciar a anamnese <strong>&quot;{selected?.name}&quot;</strong>? Um rascunho
            será criado e você poderá preenchê-la agora.
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
