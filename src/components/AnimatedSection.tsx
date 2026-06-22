import React from 'react';
import { Box } from '@mui/material';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export type AnimationType = 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scaleIn' | 'slideUp';

interface AnimatedSectionProps extends React.ComponentProps<typeof Box> {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export default function AnimatedSection({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  triggerOnce = true,
  sx = {},
  ...props
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce });

  // Map animation names to CSS transitions/transforms
  const getAnimationStyles = () => {
    // Basic transition settings
    const transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
    const transitionDelay = `${delay}ms`;

    const baseStyles = {
      transition,
      transitionDelay,
      willChange: 'transform, opacity',
    };

    if (!isVisible) {
      switch (animation) {
        case 'fadeUp':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateY(30px)',
          };
        case 'slideUp':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateY(50px)',
          };
        case 'fadeIn':
          return {
            ...baseStyles,
            opacity: 0,
          };
        case 'fadeLeft':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateX(30px)',
          };
        case 'fadeRight':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateX(-30px)',
          };
        case 'scaleIn':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'scale(0.95)',
          };
        default:
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateY(30px)',
          };
      }
    }

    // Visible state
    return {
      ...baseStyles,
      opacity: 1,
      transform: 'none',
    };
  };

  return (
    <Box
      ref={ref as any}
      sx={{
        ...getAnimationStyles(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
