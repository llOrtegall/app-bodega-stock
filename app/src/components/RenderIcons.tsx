import { Box, Keyboard, Monitor, Mouse, PcCase, Printer, Tv, Smartphone, Router, Phone } from 'lucide-react'

export function RenderIcon({ nameStr }: { nameStr: string }) {
  const icon = nameStr.split(' ')[0].toLowerCase()

  const icons: { [key: string]: JSX.Element } = {
    'monitor': <Monitor size={24} />,
    'torre': <PcCase size={24} />,
    'mouse': <Mouse size={24} />,
    'teclado': <Keyboard size={24} />,
    'impresora': <Printer size={24} />,
    'televisor': <Tv size={24} />,
    'pda': <Smartphone size={24} />,
    'modem': <Router size={24} />,
    'telefono': <Phone size={24} />,
  }

  return icons[icon] || <Box />
}