import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { AuthProvider } from './Auth/AuthContext.tsx'
import {  RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import { router } from './routes'

import './index.css'

const rootElement = document.getElementById('root')!

createRoot(rootElement).render(
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ThemeProvider>
)
