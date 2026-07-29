import React from 'react';
import { Card, Typography, Stack, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { StatCardProps } from '@/types/schema';

export default function StatCard({ title, value, icon, trend, color = 'primary' }: StatCardProps) {
  const colorTheme = {
    primary: {
      bg: '#EBF3FE',
      iconBg: '#FFFFFF',
      iconColor: '#2563EB',
      watermarkColor: '#3B82F6',
      titleColor: '#1E40AF',
      valueColor: '#1E293B',
    },
    secondary: {
      bg: '#E6F7F5',
      iconBg: '#FFFFFF',
      iconColor: '#0D9488',
      watermarkColor: '#14B8A6',
      titleColor: '#115E59',
      valueColor: '#1E293B',
    },
    success: {
      bg: '#EAF8F0',
      iconBg: '#FFFFFF',
      iconColor: '#15803D',
      watermarkColor: '#10B981',
      titleColor: '#166534',
      valueColor: '#1E293B',
    },
    warning: {
      bg: '#FEF6E6',
      iconBg: '#FFFFFF',
      iconColor: '#D97706',
      watermarkColor: '#F59E0B',
      titleColor: '#92400E',
      valueColor: '#1E293B',
    },
    error: {
      bg: '#FEE2E2',
      iconBg: '#FFFFFF',
      iconColor: '#DC2626',
      watermarkColor: '#EF4444',
      titleColor: '#991B1B',
      valueColor: '#1E293B',
    },
    info: {
      bg: '#EEF2FF',
      iconBg: '#FFFFFF',
      iconColor: '#4F46E5',
      watermarkColor: '#6366F1',
      titleColor: '#3730A3',
      valueColor: '#1E293B',
    },
  };

  const theme = colorTheme[color] ?? colorTheme.primary;

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        bgcolor: theme.bg,
        border: '1px solid',
        borderColor: 'rgba(0,0,0,0.03)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0px 10px 25px rgba(0,0,0,0.06)',
        },
      }}
    >
      <Box sx={{ p: 2.5, position: 'relative', zIndex: 1 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* White Circular Icon Container */}
          {icon && (
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                bgcolor: theme.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.iconColor,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                flexShrink: 0,
              }}
            >
              {React.cloneElement(icon as React.ReactElement, { size: 24 })}
            </Box>
          )}

          {/* Title and Big Value */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ color: theme.titleColor, fontSize: '0.875rem', mb: 0.25 }}
              noWrap
            >
              {title}
            </Typography>

            <Stack direction="row" alignItems="baseline" spacing={1}>
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{ color: theme.valueColor, fontSize: '1.85rem', lineHeight: 1.1 }}
              >
                {value}
              </Typography>

              {trend && (
                <Stack direction="row" alignItems="center" spacing={0.3}>
                  {trend.positive ? (
                    <TrendingUp size={14} color="#10B981" />
                  ) : (
                    <TrendingDown size={14} color="#EF4444" />
                  )}
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    sx={{ color: trend.positive ? 'success.main' : 'error.main', fontSize: '0.75rem' }}
                  >
                    {trend.value}%
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Background Watermark Icon on the Right */}
      {icon && (
        <Box
          sx={{
            position: 'absolute',
            right: -12,
            bottom: -16,
            color: theme.watermarkColor,
            opacity: 0.16,
            pointerEvents: 'none',
            zIndex: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {React.cloneElement(icon as React.ReactElement, { size: 100, strokeWidth: 1.5 })}
        </Box>
      )}
    </Card>
  );
}