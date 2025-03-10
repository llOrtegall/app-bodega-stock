import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/auth/AuthProvider'
import { ChevronsUpDown, LogOut } from 'lucide-react'
import { VITE_LOGIN_URL } from '@/config/enviroments'
import { User } from '@/types/interfaces'
import axios from 'axios'

export function NavUser({ user, }: { user: User | null }) {
  const { isMobile } = useSidebar()
  const { setUser, setIsAuthenticated } = useAuth()

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${VITE_LOGIN_URL}/logout`)
      if (res.status === 200) {
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarFallback className='rounded-lg'>
                  {user?.names[0]}{user?.lastnames[0]}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user?.names} {user?.lastnames}</span>
                <span className='truncate text-xs'>{user?.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >

            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
