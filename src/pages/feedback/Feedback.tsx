import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Stack,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function FeedbackPage() {
  const [feedbackText, setFeedbackText] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) {
      setErrorMessage('Por favor, escreva um feedback antes de enviar.');
      return;
    }

    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      setSuccessMessage('Feedback enviado com sucesso! Obrigado pela sua opinião.');
      setFeedbackText('');
    } catch {
      setErrorMessage('Erro ao enviar o feedback. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Enviar Feedback
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Sua opinião é muito importante para continuarmos melhorando a plataforma.
      </Typography>

      <Typography variant="body1" color="text.secondary" mt={2}>
        Estamos constantemente trabalhando para melhorar a sua experiência.
        Se você encontrou algum problema, tem sugestões de funcionalidades ou
        quer nos contar como a plataforma tem te ajudado, deixe seu feedback abaixo!
      </Typography>

      <Stack spacing={1} mt={2}>
        <Typography variant="subtitle2">Sugestões de tópicos:</Typography>
        <Typography variant="body2">• Melhorias na usabilidade</Typography>
        <Typography variant="body2">• Novos testes que você gostaria de ver</Typography>
        <Typography variant="body2">• Relato de erros ou problemas</Typography>
        <Typography variant="body2">• Sugestões gerais de conteúdo</Typography>
      </Stack>

      <Box
        component="img"
        src="/images/feedback-illustration.svg"
        alt="Feedback"
        sx={{ width: '100%', maxHeight: 200, objectFit: 'contain', mt: 3 }}
      />

      <Box component="form" onSubmit={handleSubmit} mt={3}>
        <Stack spacing={2}>
          <TextField
            label="Seu feedback"
            multiline
            rows={6}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            variant="outlined"
            fullWidth
          />

          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <Box textAlign="right">
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : 'Enviar'}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
