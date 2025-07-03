import React from "react"
import { Calendar, Users, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useProjects } from "../../context/ProjectsContext"

const RecentProjects = () => {
    const { projects, getUsersByIds } = useProjects()

    const recentProjects = projects
        .filter(project => project.status === "active")
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 5)

    // Couleur du badge Bootstrap pour le statut
    const getStatusClass = status => {
        switch (status) {
            case "active":
                return "bg-success text-white"
            case "completed":
                return "bg-primary text-white"
            case "paused":
                return "bg-warning text-dark"
            case "cancelled":
                return "bg-danger text-white"
            default:
                return "bg-secondary text-white"
        }
    }

    // Couleur de base pour le point de priorité
    const getPriorityBg = priority => {
        switch (priority) {
            case "critical":
                return "bg-danger"
            case "high":
                return "bg-warning"
            case "medium":
                return "bg-info"
            case "low":
                return "bg-success"
            default:
                return "bg-secondary"
        }
    }

    return (
        <div className="card shadow-sm border mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="h6 fw-bold mb-0">Projets récents</h3>
                    <Link
                        to="/projects"
                        className="text-primary text-decoration-none d-flex align-items-center gap-1 small fw-medium"
                    >
                        <span>Voir tous</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="d-flex flex-column gap-3">
                    {recentProjects.map(project => {
                        const assignedUsers = getUsersByIds(project.assignedUsers)
                        return (
                            <div
                                key={project.id}
                                className="p-3 border rounded mb-1 hover-shadow"
                                style={{ transition: "box-shadow .2s" }}
                            >
                                <div className="d-flex align-items-start justify-content-between flex-wrap gap-2">
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <span
                                                className={`rounded-circle d-inline-block`}
                                                style={{
                                                    width: 12,
                                                    height: 12,
                                                    background: "var(--bs-" +
                                                        getPriorityBg(project.priority).replace("bg-", "") +
                                                        ")"
                                                }}
                                            ></span>
                                            <span className="fw-medium text-dark">{project.name}</span>
                                            <span
                                                className={`badge ${getStatusClass(project.status)} ms-2 text-capitalize`}
                                                style={{ fontSize: 12, padding: "4px 10px" }}
                                            >
                                                {project.status}
                                            </span>
                                        </div>

                                        <div className="text-muted small mb-2" style={{ WebkitLineClamp: 2, overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical" }}>
                                            {project.description}
                                        </div>

                                        <div className="d-flex align-items-center justify-content-between mt-2">
                                            <div className="d-flex align-items-center gap-3 small text-secondary">
                                                <div className="d-flex align-items-center gap-1">
                                                    <Calendar size={16} />
                                                    <span>
                                                        {new Date(project.endDate).toLocaleDateString("fr-FR")}
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center gap-1">
                                                    <Users size={16} />
                                                    <span>{project.assignedUsers.length} membres</span>
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-center ms-auto">
                                                <div className="d-flex" style={{ marginLeft: -8 }}>
                                                    {assignedUsers.slice(0, 3).map(user => (
                                                        <img
                                                            key={user.id}
                                                            src={user.avatar}
                                                            alt={`${user.firstName} ${user.lastName}`}
                                                            className="rounded-circle border border-white"
                                                            title={`${user.firstName} ${user.lastName}`}
                                                            style={{
                                                                width: 26,
                                                                height: 26,
                                                                objectFit: "cover",
                                                                marginLeft: -8
                                                            }}
                                                        />
                                                    ))}
                                                    {assignedUsers.length > 3 && (
                                                        <div className="rounded-circle bg-light border border-white d-flex align-items-center justify-content-center"
                                                            style={{
                                                                width: 26, height: 26, marginLeft: -8, fontSize: 12
                                                            }}>
                                                            +{assignedUsers.length - 3}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <div className="d-flex justify-content-between align-items-center small text-secondary mb-1">
                                        <span>Progression</span>
                                        <span>{project.progress}%</span>
                                    </div>
                                    <div className="progress" style={{ height: 7 }}>
                                        <div
                                            className="progress-bar bg-primary"
                                            role="progressbar"
                                            style={{ width: `${project.progress}%` }}
                                            aria-valuenow={project.progress}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default RecentProjects
