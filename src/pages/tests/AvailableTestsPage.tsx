import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import { getAvailableTests } from '../../services/patientService';

interface Test {
  id: string;
  name: string;
  description: string;
}

export default function AvailableTestsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAvailableTests();
      setTests(response.data);
    } catch {
      setError('Erro ao carregar os testes disponíveis.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTests();
  }, []);

  const handleGoToTest = (testId: string) => {
    console.log('Ir para correção do teste:', testId);
    // navigate(`/tests/${testId}/correction`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Testes Disponíveis
      </Typography>

      {loading && <CircularProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && tests.length === 0 && (
        <Alert severity="info">Nenhum teste disponível no momento.</Alert>
      )}

      {!loading && !error && tests.length > 0 && (
        <Grid container spacing={2} justifyContent="center">
          {tests.map((test) => (
            <Grid item xs={12} sm={6} md={4} key={test.id}>
              <Card
                sx={{
                  height: '250px',
                  width: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  margin: '0 auto',
                  boxShadow: 1,
                  borderRadius: 2,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{test.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {test.description}
                  </Typography>
                </CardContent>
                <Stack direction="row" justifyContent="flex-end" p={2}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleGoToTest(test.id)}
                  >
                    Corrigir Teste
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
