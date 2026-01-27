import { useState } from 'react';
import { Typography, Stack, Card, CardContent, TextField, Button, MenuItem, Alert } from '@mui/material';
import { MessageSquare } from 'lucide-react';
import type { FeedbackType } from '@/types/enums';

export default function FeedbackPage() {
  const [type, setType] = useState<FeedbackType>('Suggestion');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setType('Suggestion');
      setSubject('');
      setDescription('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4" fontWeight={700}>
          Feedback
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ajude-nos a melhorar! Envie sugestões ou reporte problemas.
        </Typography>
      </Stack>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <MessageSquare size={48} color="#3B82F6" />
              <Typography variant="h6">
                Sua opinião é importante
              </Typography>
            </Stack>

            {submitted && (
              <Alert severity="success">
                Feedback enviado com sucesso! Obrigado pela contribuição.
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  select
                  label="Tipo"
                  value={type}
                  onChange={(e) => setType(e.target.value as FeedbackType)}
                  required
                >
                  <MenuItem value="Suggestion">Sugestão</MenuItem>
                  <MenuItem value="Bug Report">Reportar Erro</MenuItem>
                </TextField>

                <TextField
                  label="Assunto"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />

                <TextField
                  label="Descrição"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={6}
                  required
                  placeholder="Descreva sua sugestão ou problema em detalhes..."
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={submitted}
                >
                  {submitted ? 'Enviado!' : 'Enviar Feedback'}
                </Button>
              </Stack>
            </form>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}