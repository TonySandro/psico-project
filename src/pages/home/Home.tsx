import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link,
  ListItemButton,
  Box,
} from '@mui/material';

export default function DashboardOverview() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Visão Geral do Painel
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Bem-vindo de volta! Aqui está um resumo da sua atividade recente e informações importantes.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2, boxShadow: 1, borderRadius: 2 }}>
            <CardHeader title="Estatísticas Principais" />
            <CardContent>
              <List disablePadding>
                {[
                  ['Pacientes Ativos', '12'],
                  ['Testes Aplicados (Este Mês)', '45'],
                  ['Próximas Consultas', '3'],
                ].map(([label, value], i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography>{label}</Typography>
                    <Typography color="primary">{value}</Typography>
                    {i < 2 && <Divider flexItem />}
                  </Box>
                ))}
              </List>
              <Box textAlign="right" mt={1}>
                <Link href="#" underline="none" variant="body2">
                  Ver todas as estatísticas
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2, boxShadow: 1, borderRadius: 2 }}>
            <CardHeader title="Atividades Recentes" />
            <CardContent>
              <List dense disablePadding>
                {[
                  'Resultados do teste de João Silva processados.',
                  'Nova paciente Maria Oliveira adicionada à sua lista.',
                  'Plano de assinatura renovado com sucesso.',
                  'Lembrete: Acompanhamento com Carlos Lima agendado para amanhã.',
                ].map((text, i) => (
                  <React.Fragment key={i}>
                    <ListItem disableGutters>
                      <ListItemText primary={text} />
                    </ListItem>
                    {i < 3 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Box textAlign="right" mt={1}>
                <Link href="#" underline="none" variant="body2">
                  Ver todas as atividades
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2, boxShadow: 1, borderRadius: 2 }}>
            <CardHeader title="Acesso Rápido" />
            <CardContent>
              <List disablePadding>
                {[
                  ['Aplicar Novo Teste', '/tests/new'],
                  ['Criar Perfil de Paciente', '/patients/new'],
                  ['Ver Biblioteca de Testes', '/tests'],
                  ['Gerenciar Configurações da Conta', '/settings'],
                ].map(([label, href]) => (
                  <ListItemButton key={label} component={Link} href={href} sx={{ py: 1 }}>
                    <ListItemText primary={label} />
                  </ListItemButton>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
