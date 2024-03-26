import { AuthProvider } from './Auth/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext.tsx'

const rootElement = document.getElementById('root')

if (rootElement == null) {
  throw new Error('No root element found')
}

createRoot(rootElement).render(
  <ThemeProvider>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
)
