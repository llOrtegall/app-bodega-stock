import { ThemeProvider } from './contexts/theme/ThemeProvider'
import { AuthProvider } from './contexts/auth/AuthProvider'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { RoutesApp } from '@/routes/Index'
import axios from 'axios'
import './index.css'

axios.defaults.withCredentials = true

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider key={'app_v1'} router={RoutesApp} />
    </AuthProvider>
  </ThemeProvider>
)
