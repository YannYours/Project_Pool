import { useState, useRef, useEffect } from "react"
import { Search, Bell, LogOut, User, Settings } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

const Header = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef()

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }
    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showUserMenu])

  return (
    <header className="bg-white shadow-sm border-bottom px-3 py-2">
      <div className="d-flex align-items-center justify-content-between">
        {/* Sidebar Toggle + Search */}
        <div className="d-flex align-items-center gap-3">
          {/* Le bouton burger est toujours visible */}
          <button
            onClick={onToggleSidebar}
            className="btn btn-light p-2 me-2"
            aria-label="Ouvrir la navigation"
            style={{ borderRadius: 8 }}
          >
            {/* Icône du style burger */}
            <div style={{ width: 24, height: 24, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{
                display: "block",
                width: 20, height: 3,
                background: "#495057",
                marginBottom: 4, borderRadius: 4
              }} />
              <span style={{
                display: "block",
                width: 20, height: 3,
                background: "#495057",
                marginBottom: 4, borderRadius: 4
              }} />
              <span style={{
                display: "block",
                width: 20, height: 3,
                background: "#495057",
                borderRadius: 4
              }} />
            </div>
          </button>

          <div className="position-relative">
            <Search
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#adb5bd",
                width: 18,
                height: 18
              }}
            />
            <input
              type="text"
              placeholder="Rechercher des projets..."
              className="form-control ps-5 pe-3"
              style={{ width: 260, borderRadius: 8 }}
            />
          </div>
        </div>

        {/* Notifications + Menu utilisateur */}
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-link position-relative p-2 text-secondary" style={{ fontSize: 20 }}>
            <Bell size={20} />
            <span
              className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
              style={{ fontSize: 8, minWidth: 8, minHeight: 8 }}
            ></span>
          </button>

          <div className="position-relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(v => !v)}
              className="btn btn-light d-flex align-items-center gap-2 py-1 px-2"
              style={{ borderRadius: 8 }}
            >
              <img
                src={user?.avatar}
                alt={`${user?.firstName} ${user?.lastName}`}
                className="rounded-circle"
                style={{ width: 32, height: 32, objectFit: "cover" }}
              />
              <div className="d-none d-md-block text-start lh-sm">
                <div className="fw-medium text-dark" style={{ fontSize: 14 }}>
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-secondary" style={{ fontSize: 11 }}>{user?.role}</div>
              </div>
            </button>

            {showUserMenu && (
              <div
                className="dropdown-menu dropdown-menu-end show mt-2"
                style={{
                  position: "absolute",
                  right: 0,
                  minWidth: 190,
                  borderRadius: 10,
                  boxShadow: "0 4px 32px rgba(0,0,0,.11)",
                  zIndex: 999
                }}
              >
                <button className="dropdown-item d-flex align-items-center gap-2" type="button">
                  <User size={16} />
                  Mon profil
                </button>
                <button className="dropdown-item d-flex align-items-center gap-2" type="button">
                  <Settings size={16} />
                  Paramètres
                </button>
                <div className="dropdown-divider"></div>
                <button
                  className="dropdown-item d-flex align-items-center gap-2 text-danger"
                  type="button"
                  onClick={logout}
                >
                  <LogOut size={16} />
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
