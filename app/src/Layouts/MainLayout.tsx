import { Outlet } from "react-router"

export default function MainLayout() {
  return (
    <section className="w-full h-screen">
      <h1>React App</h1>
      <Outlet />
    </section>
  )
}