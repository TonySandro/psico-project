import React, { lazy, Suspense } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Header from '../../components/ui/Header'

const MainGrid = lazy(() => import('../../components/ui/MainGrid'))

// import AppTheme from '../../shared-theme/AppTheme' // Removed to avoid theme conflict
// import { ... } from '../../theme/customizations' // Removed

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: 'background.default', // Using theme token
          overflow: 'auto',
        })}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >
          <Header />

          <Suspense fallback={<div>Carregando painel...</div>}>
            <MainGrid />
          </Suspense>
        </Stack>
      </Box>
    </Box>
  )
}
