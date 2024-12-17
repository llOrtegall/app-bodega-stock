import { AudioWaveform, GalleryVerticalEnd, Boxes, Building2, Smartphone } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, } from "@/components/ui/sidebar"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { useAuth } from "@/contexts/auth/AuthProvider"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Multired",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Servired",
      logo: AudioWaveform,
      plan: "Startup",
    }
  ],
  navMain: [
    {
      title: "Artículos",
      url: "#",
      icon: Boxes,
      items: [
        {
          title: "Items (Activos - Insumos)",
          url: "#",
        },
        {
          title: "Crear Items",
          url: "#",
        },
        {
          title: "Asignar Items",
          url: "#",
        },
      ],
    },
    {
      title: "Bodegas",
      url: "#",
      icon: Building2,
      items: [
        {
          title: "Bodegas ( Sucursales )",
          url: "#",
        },
        {
          title: "Crear Bodega ( Sucursal )",
          url: "#",
        },
        {
          title: "Crear Movimiento",
          url: "#",
        }
      ],
    },
    {
      title: "Simcards",
      url: "#",
      icon: Smartphone,
      items: [
        {
          title: "Simcards",
          url: "#",
        },
        {
          title: "Crear Simcard",
          url: "#",
        },
        {
          title: "Asignar Simcard",
          url: "#",
        },
        {
          title: "Crear Mov... Simcard",
          url: "#",
        },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
