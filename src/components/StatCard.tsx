import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { StatCardProps } from '@/types/schema';

export default function StatCard({ title, value, icon, trend, color = 'primary' }: StatCardProps) {
  const colorMap = {
    primary: 'primary.main',
    secondary: 'secondary.main',
    success: 'success.main',
    warning: 'warning.main',
    error: 'error.main',
    info: 'info.main'
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {title}
            </Typography>
            {icon && (
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '8px',
                  bgcolor: `${colorMap[color]}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colorMap[color]
                }}
              >
                {icon}
              </Box>
            )}
          </Stack>

          <Typography variant="h3" fontWeight={700}>
            {value}
          </Typography>

          {trend && (
            <Stack direction="row" alignItems="center" spacing={0.5}>
              {trend.positive ? (
                <TrendingUp size={16} color="#10B981" />
              ) : (
                <TrendingDown size={16} color="#EF4444" />
              )}
              <Typography
                variant="caption"
                fontWeight={600}
                sx={{ color: trend.positive ? 'success.main' : 'error.main' }}
              >
                {trend.value}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                este mês
              </Typography>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}