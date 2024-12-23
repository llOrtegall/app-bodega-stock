import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Toaster } from '@/components/ui/sonner'
import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <section className='w-full h-screen'>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </section>
  )
}