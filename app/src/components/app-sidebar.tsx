import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar, } from '@/components/ui/sidebar'
import { AudioWaveform, GalleryVerticalEnd, Boxes, Building2, Moon, Sun, Smartphone } from 'lucide-react'
import * as React from 'react'

import { TeamSwitcher } from '@/components/team-switcher'
import { useTheme } from '@/contexts/theme/ThemeProvider'
import { useAuth } from '@/contexts/auth/AuthProvider'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { Button } from './ui/button'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Multired',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Servired',
      logo: AudioWaveform,
      plan: 'Startup',
    }
  ],
  navMain: [
    {
      title: 'Artículos',
      url: '#',
      icon: Boxes,
      items: [
        {
          title: 'Items (Activos - Insumos)',
          url: 'showItems',
        },
        {
          title: 'Crear Items',
          url: 'newItem',
        },
        {
          title: 'Asignar Items',
          url: 'asignarItems',
        },
      ],
    },
    {
      title: 'Bodegas',
      url: '#',
      icon: Building2,
      items: [
        {
          title: 'Bodegas ( Sucursales )',
          url: 'bodegas',
        },
        {
          title: 'Crear Bodega ( Sucursal )',
          url: 'newBodega',
        },
        {
          title: 'Crear Movimiento',
          url: 'newMovimiento',
        }
      ],
    },
    {
      title: 'Simcards',
      url: '#',
      icon: Smartphone,
      items: [
        {
          title: 'Simcards',
          url: 'simcards',
        },
        {
          title: 'Crear Simcard',
          url: 'newsimcard',
        },
        {
          title: 'Asignar Simcard',
          url: '#',
        },
        /*
        {
          title: 'Crear Mov... Simcard',
          url: '#',
        }*/
      ],
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme, setTheme } = useTheme()
  const { open } = useSidebar()
  const { user } = useAuth()

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <Button className='mx-2' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        <span className={`${open ? '' : 'sr-only'}`}>Cambiar Theme</span>
        {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
      </Button>
      <SidebarFooter>
        <NavUser user={user!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
