import { useState } from 'react';
import { Typography, Stack, Card, TextField, Button, MenuItem, Box, Fade, Avatar, Alert } from '@mui/material';
import { MessageSquare, Lightbulb, Bug, Send, Sparkles, CheckCircle, HelpCircle, ThumbsUp, MoreHorizontal } from 'lucide-react';
import { api } from '@/services/api';

type FeedbackType = 'bug' | 'sugestao' | 'duvida' | 'elogio' | 'outro';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState<FeedbackType>('sugestao');
  const [message, setMessage] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await api.post('/feedback', { name, email, type, message });
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setName('');
        setEmail('');
        setType('sugestao');
        setMessage('');
      }, 4000);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Stack spacing={5}>
        {/* Header */}
        <Stack spacing={2} textAlign="center" alignItems="center">
          <Avatar 
            sx={{ 
              width: 64, 
              height: 64, 
              bgcolor: 'rgba(59, 130, 246, 0.1)', 
              color: '#3B82F6',
              mb: 1
            }}
          >
            <MessageSquare size={32} />
          </Avatar>
          <Typography variant="h3" fontWeight={800} sx={{
            background: 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-1px'
          }}>
            Feedback
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, fontSize: '1.1rem' }}>
            Ajude-nos a melhorar o NeuroPPAvalia! Sua opinião é fundamental para moldar o futuro da plataforma.
          </Typography>
        </Stack>

        {/* Main Card */}
        <Card 
          elevation={0}
          sx={{ 
            borderRadius: 5, 
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' }
          }}
        >
          {/* Left Side - Visual/Info */}
          <Box
            sx={{
              flex: { xs: '0 0 auto', md: '0 0 40%' },
              background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
              color: 'white',
              p: { xs: 4, md: 5 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative background elements */}
            <Box sx={{ position: 'absolute', top: -40, right: -40, opacity: 0.1, transform: 'rotate(15deg)' }}>
              <MessageSquare size={240} />
            </Box>
            <Box sx={{ position: 'absolute', bottom: -20, left: -20, opacity: 0.15 }}>
              <Sparkles size={160} />
            </Box>

            <Stack spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.5px' }}>
                Como podemos melhorar?
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
                Estamos em fase de testes e valorizamos cada comentário. Seja uma nova funcionalidade que você gostaria de ver, ou um erro que encontrou, queremos saber!
              </Typography>
              
              <Stack spacing={3} sx={{ mt: 4 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 3, backdropFilter: 'blur(10px)' }}>
                    <Lightbulb size={24} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>Sugestões</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Ideias para novas funcionalidades</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 3, backdropFilter: 'blur(10px)' }}>
                    <Bug size={24} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>Reportar Erros</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Algo não funcionou como esperado?</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Box>

          {/* Right Side - Form */}
          <Box sx={{ flex: 1, p: { xs: 3, md: 6 }, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {status === 'success' ? (
              <Fade in={status === 'success'} timeout={800}>
                <Stack 
                  spacing={3} 
                  alignItems="center" 
                  justifyContent="center" 
                  sx={{ height: '100%', minHeight: 400, textAlign: 'center' }}
                >
                  <Box sx={{ 
                    p: 3, 
                    borderRadius: '50%', 
                    bgcolor: '#DCFCE7',
                    color: '#16A34A',
                    mb: 2,
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(22, 163, 74, 0.4)' },
                      '70%': { transform: 'scale(1.05)', boxShadow: '0 0 0 15px rgba(22, 163, 74, 0)' },
                      '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(22, 163, 74, 0)' }
                    }
                  }}>
                    <CheckCircle size={56} />
                  </Box>
                  <Typography variant="h4" fontWeight={800} color="#16A34A" sx={{ letterSpacing: '-0.5px' }}>
                    Feedback enviado com sucesso.
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 350, fontSize: '1.1rem' }}>
                    Muito obrigado pela sua contribuição. Nossa equipe vai analisar sua mensagem com carinho.
                  </Typography>
                </Stack>
              </Fade>
            ) : (
              <Fade in={true} timeout={800}>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    {status === 'error' && (
                      <Alert severity="error">Não foi possível enviar o feedback.</Alert>
                    )}
                    
                    <TextField
                      label="Nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      fullWidth
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />

                    <TextField
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      fullWidth
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />

                    <TextField
                      select
                      label="Tipo de Feedback"
                      value={type}
                      onChange={(e) => setType(e.target.value as FeedbackType)}
                      required
                      fullWidth
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    >
                      <MenuItem value="sugestao" sx={{ py: 1.5 }}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Lightbulb size={18} color="#3B82F6" />
                          <Typography fontWeight={500}>Sugestão</Typography>
                        </Stack>
                      </MenuItem>
                      <MenuItem value="bug" sx={{ py: 1.5 }}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Bug size={18} color="#EF4444" />
                          <Typography fontWeight={500}>Bug</Typography>
                        </Stack>
                      </MenuItem>
                      <MenuItem value="duvida" sx={{ py: 1.5 }}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <HelpCircle size={18} color="#F59E0B" />
                          <Typography fontWeight={500}>Dúvida</Typography>
                        </Stack>
                      </MenuItem>
                      <MenuItem value="elogio" sx={{ py: 1.5 }}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <ThumbsUp size={18} color="#10B981" />
                          <Typography fontWeight={500}>Elogio</Typography>
                        </Stack>
                      </MenuItem>
                      <MenuItem value="outro" sx={{ py: 1.5 }}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <MoreHorizontal size={18} color="#6B7280" />
                          <Typography fontWeight={500}>Outro</Typography>
                        </Stack>
                      </MenuItem>
                    </TextField>

                    <TextField
                      label="Mensagem"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      multiline
                      rows={4}
                      required
                      fullWidth
                      placeholder="Por favor, descreva com o máximo de detalhes possível..."
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={status === 'loading'}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      endIcon={
                        <Send 
                          size={20} 
                          style={{ 
                            transform: isHovered && status !== 'loading' ? 'translateX(4px) translateY(-4px)' : 'none', 
                            transition: 'transform 0.3s' 
                          }}
                        />
                      }
                      sx={{
                        py: 1.8,
                        borderRadius: 2.5,
                        fontWeight: 700,
                        textTransform: 'none',
                        fontSize: '1.05rem',
                        bgcolor: '#3B82F6',
                        boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
                        '&:hover': {
                          bgcolor: '#2563EB',
                          boxShadow: '0 15px 35px -5px rgba(59, 130, 246, 0.5)',
                          transform: status === 'loading' ? 'none' : 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {status === 'loading' ? 'Enviando...' : 'Enviar Feedback'}
                    </Button>
                  </Stack>
                </form>
              </Fade>
            )}
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}