import { Typography, Stack, Grid, Card, CardContent, Box, CircularProgress, Alert, Chip } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Users, UserX, UserPlus } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { useStatistics } from '@/hooks/useStatistics';
import { useAuthStore } from '@/stores/authStore';

const COLORS = ['#3B82F6', '#14B8A6', '#F59E0B', '#EF4444', '#10B981', '#8B5CF6', '#EC4899'];

const RANK_COLORS = ['#F59E0B', '#9CA3AF', '#CD7F32'];

const cardStyle = {
  height: '100%',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0px 8px 24px rgba(0,0,0,0.10)',
  },
};

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const { data: stats, isLoading, error } = useStatistics(user?.id || '');

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Erro ao carregar estatísticas. Tente novamente.
      </Alert>
    );
  }

  const mostUsedTests = stats?.mostUsedTests || [];

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ color: 'text.primary' }}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Visão geral dos seus pacientes e atividades
          </Typography>
        </Box>
      </Stack>

      {/* Stat Cards */}
      <Grid container spacing={3} id="tour-dashboard-stats">
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Pacientes Ativos"
            value={stats?.totalActivePatients || 0}
            icon={<Users size={20} />}
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Inativos/Alta"
            value={stats?.totalInactivePatients || 0}
            icon={<UserX size={20} />}
            color="secondary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Novos no Mês"
            value={stats?.newPatientsThisMonth || 0}
            icon={<UserPlus size={20} />}
            color="success"
          />
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2.5 }}>
                Pacientes por Faixa Etária
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={Object.entries(stats?.patientsByAgeGroup || {})
                    .map(([ageRange, count]) => ({ ageRange, count }))
                    .sort((a, b) => {
                      const ageA = parseInt(a.ageRange.match(/\d+/)?.[0] || '0', 10);
                      const ageB = parseInt(b.ageRange.match(/\d+/)?.[0] || '0', 10);
                      return ageA - ageB;
                    })}
                  margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="barGradientAge" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="ageRange" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                      fontSize: 13,
                    }}
                    cursor={{ fill: 'rgba(59,130,246,0.06)' }}
                  />
                  <Bar dataKey="count" fill="url(#barGradientAge)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2.5 }}>
                Pacientes por Escolaridade
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Object.entries(stats?.patientsByEducationLevel || {}).map(
                      ([schoolYear, count]) => ({ schoolYear, count })
                    )}
                    dataKey="count"
                    nameKey="schoolYear"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={45}
                    paddingAngle={3}
                    label={({ percent }: any) =>
                      `${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {Object.entries(stats?.patientsByEducationLevel || {}).map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                      fontSize: 13,
                    }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span style={{ fontSize: 12, color: '#6B7280' }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2.5 }}>
                Protocolos por Tipo de Teste
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={Object.entries(stats?.protocolsByTestType || {}).map(([type, count]) => ({
                    type,
                    count,
                  }))}
                  layout="vertical"
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="barGradientProto" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#14B8A6" />
                      <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                  <XAxis type="number" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="type" stroke="#9CA3AF" width={110} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                      fontSize: 13,
                    }}
                    cursor={{ fill: 'rgba(20,184,166,0.06)' }}
                  />
                  <Bar dataKey="count" fill="url(#barGradientProto)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ ...cardStyle, height: '100%' }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2.5 }}>
                Testes Mais Utilizados
              </Typography>
              <Stack spacing={1.5} sx={{ flex: 1 }}>
                {mostUsedTests.length ? (
                  mostUsedTests.map((test, index) => {
                    const rankColor = RANK_COLORS[index] ?? '#6B7280';
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: index === 0
                            ? 'rgba(245,158,11,0.06)'
                            : index === 1
                            ? 'rgba(156,163,175,0.08)'
                            : index === 2
                            ? 'rgba(205,127,50,0.07)'
                            : 'grey.50',
                          border: '1px solid',
                          borderColor: index === 0
                            ? 'rgba(245,158,11,0.2)'
                            : index === 1
                            ? 'rgba(156,163,175,0.2)'
                            : index === 2
                            ? 'rgba(205,127,50,0.15)'
                            : 'grey.100',
                          transition: 'background 0.15s',
                        }}
                      >
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${rankColor}33, ${rankColor}66)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            fontWeight: 700,
                            fontSize: 13,
                            color: rankColor,
                          }}
                        >
                          {index + 1}
                        </Box>
                        <Typography variant="body2" fontWeight={500} sx={{ flex: 1 }}>
                          {test.name}
                        </Typography>
                        <Chip
                          label={`${test.count}`}
                          size="small"
                          sx={{
                            bgcolor: `${rankColor}18`,
                            color: rankColor,
                            fontWeight: 700,
                            fontSize: 12,
                            height: 22,
                            border: 'none',
                          }}
                        />
                      </Box>
                    );
                  })
                ) : (
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography color="text.secondary" variant="body2">
                      Nenhum dado disponível
                    </Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}