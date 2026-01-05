import { Typography, Stack, Grid, Card, CardContent, Box, CircularProgress, Alert } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, UserX, UserPlus, ClipboardList } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { useStatistics } from '@/hooks/useStatistics';
import { useAuthStore } from '@/stores/authStore';

const COLORS = ['#3B82F6', '#14B8A6', '#F59E0B', '#EF4444', '#10B981', '#8B5CF6'];

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const { data: stats, isLoading, error } = useStatistics(user?.id || '');

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center min-h-[400px]">
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

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Dashboard
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Pacientes Ativos"
            value={stats?.totalActivePatients || 0}
            icon={<Users size={20} />}
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Inativos/Alta"
            value={stats?.totalInactivePatients || 0}
            icon={<UserX size={20} />}
            color="secondary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Novos no Mês"
            value={stats?.newPatientsThisMonth || 0}
            icon={<UserPlus size={20} />}
            color="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total de Protocolos"
            value={stats?.totalProtocols || 0}
            icon={<ClipboardList size={20} />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} className="mb-4">
                Pacientes por Faixa Etária
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={Object.entries(stats?.patientsByAgeGroup || {}).map(([ageRange, count]) => ({ ageRange, count }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="ageRange" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} className="mb-4">
                Pacientes por Escolaridade
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Object.entries(stats?.patientsByEducationLevel || {}).map(([schoolYear, count]) => ({ schoolYear, count }))}
                    dataKey="count"
                    nameKey="schoolYear"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {Object.entries(stats?.patientsByEducationLevel || {}).map(([_, __], index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} className="mb-4">
                Protocolos por Tipo de Teste
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={Object.entries(stats?.protocolsByTestType || {}).map(([type, count]) => ({ type, count }))} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" stroke="#6B7280" />
                  <YAxis type="category" dataKey="type" stroke="#6B7280" width={100} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#14B8A6" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} className="mb-4">
                Testes Mais Utilizados
              </Typography>
              <Stack spacing={2}>
                {stats?.mostUsedTests?.length ? (
                  stats.mostUsedTests.map((test, index) => (
                    <Box key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <Typography variant="body1" fontWeight={500}>
                        {index + 1}. {test}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography color="text.secondary">Nenhum dado disponível</Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}