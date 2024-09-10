import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { AuthProvider } from './Auth/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')!

createRoot(rootElement).render(
  <ThemeProvider>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
)
