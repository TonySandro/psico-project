import { useNavigate } from 'react-router-dom';
import { Typography, Stack, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import { Brain, Palette, Target, Activity, MessageCircle } from 'lucide-react';

const tests = [
  {
    id: 'cars',
    name: 'CARS',
    fullName: 'Escala de Avaliação de Autismo Infantil',
    description: 'Avalia comportamentos relacionados ao autismo',
    icon: Brain,
    color: '#14B8A6'
  },
  {
    id: 'stroop',
    name: 'Stroop',
    fullName: 'Teste de Cores e Palavras',
    description: 'Avalia atenção seletiva e controle inibitório',
    icon: Palette,
    color: '#F59E0B'
  },
  {
    id: 'ata',
    name: 'ATA',
    fullName: 'Avaliação de Atenção',
    description: 'Avalia atenção focada, sustentada e alternada',
    icon: Target,
    color: '#EF4444'
  },
  {
    id: 'snap',
    name: 'SNAP-IV',
    fullName: 'Escala de Avaliação de TDAH',
    description: 'Identifica sintomas de desatenção e hiperatividade',
    icon: Activity,
    color: '#10B981'
  },
  {
    id: 'token',
    name: 'Token Test',
    fullName: 'Teste de Compreensão de Linguagem',
    description: 'Avalia compreensão de comandos verbais',
    icon: MessageCircle,
    color: '#8B5CF6'
  }
];

export default function TestsPage() {
  const navigate = useNavigate();

  const handleStartTest = (testId: string) => {
    navigate(`/app/tests/${testId}/run`);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Testes Disponíveis
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Selecione um teste para aplicar ao paciente
      </Typography>

      <Grid container spacing={3}>
        {tests.map((test) => {
          const Icon = test.icon;

          return (
            <Grid key={test.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '12px',
                        bgcolor: `${test.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: test.color
                      }}
                    >
                      <Icon size={28} />
                    </Box>

                    <Stack spacing={0.5}>
                      <Typography variant="h6" fontWeight={600}>
                        {test.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        {test.fullName}
                      </Typography>
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                      {test.description}
                    </Typography>
                  </Stack>
                </CardContent>

                <CardActions>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleStartTest(test.id)}
                  >
                    Iniciar Teste
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}