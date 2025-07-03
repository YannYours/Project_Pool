import { Link, useLocation } from "react-router-dom"
import { Home, FolderOpen, Users, BarChart3, Settings, X } from "lucide-react"

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation()

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: Home },
        { name: "Projets", href: "/projects", icon: FolderOpen },
        { name: "Équipe", href: "/team", icon: Users },
        { name: "Statistiques", href: "/stats", icon: BarChart3 },
        { name: "Paramètres", href: "/settings", icon: Settings }
    ]

    const isActive = path => location.pathname === path

    return (
        <>
            {/* Overlay sur toute la page, toutes tailles, si sidebar ouverte */}
            {isOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 sidebar-overlay"
                    onClick={onClose}
                />
            )}


            {/* Sidebar unique, slide-in/out selon isOpen */}
            <div
                className={`
    position-fixed top-0 start-0 h-100 bg-white shadow-lg border-end d-flex flex-column sidebar-content
    ${isOpen ? "sidebar-slide-in" : "sidebar-slide-out"}
  `}
                style={{
                    width: "min(85vw, 260px)",
                    zIndex: 2050,
                    transition: "transform .3s cubic-bezier(.4,0,.2,1)",
                    transform: isOpen ? "translateX(0)" : "translateX(-100%)"
                }}
            >

                {/* Header */}
                <div className="d-flex align-items-center justify-content-between border-bottom px-4" style={{ height: 60 }}>
                    <div className="d-flex align-items-center gap-2">
                        <div className="bg-primary rounded d-flex align-items-center justify-content-center" style={{ width: 34, height: 34 }}>
                            <FolderOpen className="text-white" size={18} />
                        </div>
                        <span className="fw-bold fs-5 text-dark ms-1">ProjectPool</span>
                    </div>
                    {/* Bouton fermeture toujours visible */}
                    <button
                        onClick={onClose}
                        className="btn btn-light p-1 ms-2"
                        aria-label="Fermer la navigation"
                    >
                        <X size={20} className="text-secondary" />
                    </button>
                </div>
                {/* Navigation */}
                <nav className="mt-4 px-2 flex-grow-1">
                    <div className="d-flex flex-column gap-1">
                        {navigation.map(item => {
                            const Icon = item.icon
                            const active = isActive(item.href)
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`d-flex align-items-center gap-2 px-3 py-2 rounded fw-medium
                                        ${active
                                            ? "bg-primary bg-opacity-10 text-primary border-start border-3 border-primary"
                                            : "text-secondary"
                                        }`}
                                    style={{
                                        textDecoration: "none",
                                        fontSize: 15,
                                        transition: "background .15s"
                                    }}
                                    onClick={onClose}
                                >
                                    <Icon
                                        size={18}
                                        className={`${active ? "text-primary" : "text-secondary"}`}
                                    />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </div>
                </nav>
                {/* Bas de Sidebar */}
                <div style={{ position: "absolute", left: 16, right: 16, bottom: 24 }}>
                    <div className="p-3 rounded bg-gradient" style={{
                        background: "linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)",
                        color: "#fff"
                    }}>
                        <div className="fw-semibold">Besoin d'aide ?</div>
                        <div className="small" style={{ color: "#dbeafe" }}>
                            Consultez notre documentation
                        </div>
                        <button
                            className="btn btn-light btn-sm mt-2 fw-medium"
                            style={{ color: "#2563eb" }}
                        >
                            En savoir plus
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
