import { useAuth } from '../../Auth/AuthContext'
import { RenderItems } from '../../components/Items/RenderItems'
import { useItems } from '../../hooks/useItems'

export function VerItems() {
  const { user } = useAuth()
  const company = user?.empresa || ''

  const { items } = useItems(company)

  return (
    <section className=''>
      { items && (<RenderItems items={items} rol={user?.rol} />)}
    </section>
  )
}
