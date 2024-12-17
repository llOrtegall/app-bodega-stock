import { ThemeProvider } from './contexts/theme/ThemeProvider'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { RoutesApp } from '@/routes/Index'
import { StrictMode } from 'react'
import axios from 'axios'
import './index.css'

axios.defaults.withCredentials = true

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider key={'app_v1'} router={RoutesApp} />
    </ThemeProvider>
  </StrictMode>
)
