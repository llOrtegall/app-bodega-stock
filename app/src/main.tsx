import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { RoutesApp } from '@/routes/Index'
import { StrictMode } from 'react'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider key={'app_v1'} router={RoutesApp} />
  </StrictMode>
)
