import { Calendar, Users, MoreHorizontal } from "lucide-react"
import { useProjects } from "../../context/ProjectsContext"

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const { getUsersByIds } = useProjects()
  const assignedUsers = getUsersByIds(project.assignedUsers)

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

  // Couleur bg de Bootstrap pour le point de priorité
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

  const getStatusText = status => {
    switch (status) {
      case "active":
        return "Actif"
      case "completed":
        return "Terminé"
      case "paused":
        return "En pause"
      case "cancelled":
        return "Annulé"
      default:
        return status
    }
  }

  const getPriorityText = priority => {
    switch (priority) {
      case "critical":
        return "Critique"
      case "high":
        return "Haute"
      case "medium":
        return "Moyenne"
      case "low":
        return "Basse"
      default:
        return priority
    }
  }

  return (
    <div className="card border shadow-sm mb-3" style={{ borderRadius: 18 }}>
      <div className="card-body">
        <div className="d-flex align-items-start justify-content-between mb-3">
          <div className="d-flex align-items-center gap-2">
            <span
              className={`rounded-circle d-inline-block ${getPriorityBg(project.priority)}`}
              style={{ width: 13, height: 13 }}
            ></span>
            <h3 className="fw-semibold text-dark fs-6 mb-0">
              {project.name}
            </h3>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span
              className={`badge rounded-pill ${getStatusClass(project.status)}`}
              style={{ fontSize: 13, padding: "6px 12px" }}
            >
              {getStatusText(project.status)}
            </span>
            <button className="btn btn-light btn-sm p-1" title="Options">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        <p className="text-secondary small mb-3" style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          {project.description}
        </p>

        <div className="mb-3">
          <div className="d-flex align-items-center justify-content-between small mb-1">
            <div className="d-flex align-items-center gap-1 text-secondary">
              <Calendar size={16} />
              <span>
                Échéance: {new Date(project.endDate).toLocaleDateString("fr-FR")}
              </span>
            </div>
            <span className="badge bg-light text-secondary px-2 py-1 rounded">
              Priorité {getPriorityText(project.priority)}
            </span>
          </div>
          <div className="d-flex align-items-center justify-content-between small">
            <div className="d-flex align-items-center gap-1 text-secondary">
              <Users size={16} />
              <span>{project.assignedUsers.length} membres</span>
            </div>
            <div className="d-flex align-items-center gap-1 text-secondary">
              <span>{project.budget.toLocaleString("fr-FR")} XOF</span>
            </div>
          </div>
        </div>

        {/* Progression */}
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center small text-secondary mb-1">
            <span>Progression</span>
            <span className="fw-medium">{project.progress}%</span>
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

        {/* Membres + Actions */}
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex" style={{ marginLeft: -8 }}>
            {assignedUsers.slice(0, 4).map(user => (
              <img
                key={user.id}
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                className="rounded-circle border border-white"
                title={`${user.firstName} ${user.lastName}`}
                style={{
                  width: 32,
                  height: 32,
                  objectFit: "cover",
                  marginLeft: -8
                }}
              />
            ))}
            {assignedUsers.length > 4 && (
              <div
                className="rounded-circle bg-light border border-white d-flex align-items-center justify-content-center"
                style={{
                  width: 32,
                  height: 32,
                  marginLeft: -8,
                  fontSize: 12,
                  color: "#495057"
                }}
              >
                +{assignedUsers.length - 4}
              </div>
            )}
          </div>

          <div className="d-flex gap-2">
            <button
              onClick={() => onEdit(project)}
              className="btn btn-outline-primary btn-sm fw-medium"
            >
              Modifier
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="btn btn-outline-danger btn-sm fw-medium"
            >
              Supprimer
            </button>
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-3 pt-3 border-top">
          <div className="d-flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map(tech => (
              <span
                key={tech}
                className="badge bg-light text-secondary fw-medium"
                style={{ fontSize: 11 }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="badge bg-light text-secondary fw-medium" style={{ fontSize: 11 }}>
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
