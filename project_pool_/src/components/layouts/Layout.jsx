import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./SideBar"

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="min-vh-100 bg-light d-flex">
      {/* Sidebar (responsif) */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Surface contenu principal */}
      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        {/* Header toujours visible */}
        <Header onToggleSidebar={toggleSidebar} />

        {/* Contenu principal */}
        <main className="py-4">
          <div className="container-xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
