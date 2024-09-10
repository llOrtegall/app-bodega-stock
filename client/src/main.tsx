import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { AuthProvider } from './Auth/AuthContext.tsx'
import {  RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import './index.css'
import { router } from './routes'

const rootElement = document.getElementById('root')!

createRoot(rootElement).render(
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ThemeProvider>
)
