import React, { lazy, Suspense } from 'react'
import type { } from '@mui/x-date-pickers/themeAugmentation'
import type { } from '@mui/x-charts/themeAugmentation'
import type { } from '@mui/x-tree-view/themeAugmentation'
import { alpha } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack' 
import Header from '../../components/ui/Header'
import AppTheme from '../../shared-theme/AppTheme'
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../../theme/customizations'

const MainGrid = lazy(() => import('../../components/ui/MainGrid'))

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
}

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
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
    </AppTheme>
  )
}
