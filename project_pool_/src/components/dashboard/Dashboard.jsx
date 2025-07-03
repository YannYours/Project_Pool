import {
  FolderOpen,
  CheckCircle,
  Clock,
  Users,
  DollarSign
} from "lucide-react"
import StatCard from "./StatCard"
import RecentProjects from "./RecentProjects"
import ProjectChart from "./ProjectChart"
import { useProjects } from "../../context/ProjectsContext"
import Modal from "../ui/Modal"
import ProjectForm from "../projects/ProjectForm"
import { dashboardStats } from "../../data/mockData"
import { useState } from "react"
import Swal from "sweetalert2"


const Dashboard = () => {
  const {
    projects,
    addProject,
    updateProject,
  } = useProjects()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [editingProject, setEditingProject] = useState(undefined)

  const handleCreateProject = () => {
    setEditingProject(undefined)
    setIsModalOpen(true)
  }

  const handleSubmitProject = async projectData => {
    setIsLoading(true)

    // Simuler le retard de l'API
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      if (editingProject) {
        updateProject(editingProject.id, projectData)
        await Swal.fire({
          icon: "success",
          title: "Projet mis à jour",
          text: "Le projet a été mis à jour avec succès",
          timer: 1800,
          showConfirmButton: false,
          customClass: { popup: 'swal-zindex' }

        })
      } else {
        addProject(projectData)
        await Swal.fire({
          icon: "success",
          title: "Projet créé",
          text: "Le nouveau projet a été créé avec succès",
          timer: 1800,
          showConfirmButton: false,
          customClass: { popup: 'swal-zindex' }

        })
      }

      setIsModalOpen(false)
      setEditingProject(undefined)
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur est survenue lors de l'enregistrement",
        customClass: { popup: 'swal-zindex' }

      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    if (!isLoading) {
      setIsModalOpen(false)
      setEditingProject(undefined)
    }
  }

  const stats = [
    {
      title: "Total Projets",
      value: projects.length,
      change: { value: 12, type: "increase" },
      icon: FolderOpen,
      iconColor: "text-primary",
      iconBgColor: "bg-primary bg-opacity-10"
    },
    {
      title: "Projets Actifs",
      value: projects.filter(p => p.status === "active").length,
      change: { value: 8, type: "increase" },
      icon: Clock,
      iconColor: "text-success",
      iconBgColor: "bg-success bg-opacity-10"
    },
    {
      title: "Projets Terminés",
      value: projects.filter(p => p.status === "completed").length,
      change: { value: 3, type: "increase" },
      icon: CheckCircle,
      iconColor: "text-info",
      iconBgColor: "bg-info bg-opacity-10"
    },
    {
      title: "Budget Total",
      value: `${(dashboardStats.totalBudget / 1000).toFixed(0)}k XOF`,
      change: { value: 15, type: "increase" },
      icon: DollarSign,
      iconColor: "text-warning",
      iconBgColor: "bg-warning bg-opacity-10"
    }
  ]

  return (
    <div className="container-fluid py-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="h3 fw-bold text-dark mb-0">Dashboard</h1>
          <div className="text-secondary small mt-1">
            Vue d'ensemble de vos projets et activités
          </div>
        </div>
        <div>
          <button className="btn btn-primary fw-semibold shadow-sm" onClick={handleCreateProject}>
            Nouveau projet
          </button>
        </div>
      </div>

      {/* Statistiques Grid */}
      <div className="row g-3 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-3">
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mb-4">
        <ProjectChart />
      </div>

      {/* Projets récents + actions rapides */}
      <div className="row g-3">
        <div className="col-12 col-lg-8">
          <RecentProjects />
        </div>

        {/* Actions Rapides */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border">
            <div className="card-body">
              <h3 className="h6 fw-bold text-dark mb-3">
                Actions rapides
              </h3>
              <div className="d-grid gap-2">
                <button className="btn btn-light d-flex align-items-center text-start gap-2 py-3">
                  <FolderOpen className="text-primary" size={20} />
                  <div>
                    <div className="fw-medium">Créer un projet</div>
                    <div className="small text-secondary">Nouveau projet d'équipe</div>
                  </div>
                </button>
                <button className="btn btn-light d-flex align-items-center text-start gap-2 py-3">
                  <Users className="text-success" size={20} />
                  <div>
                    <div className="fw-medium">Inviter un membre</div>
                    <div className="small text-secondary">Ajouter à l'équipe</div>
                  </div>
                </button>
                <button className="btn btn-light d-flex align-items-center text-start gap-2 py-3">
                  <CheckCircle className="text-info" size={20} />
                  <div>
                    <div className="fw-medium">Mes tâches</div>
                    <div className="small text-secondary">Voir les tâches assignées</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProject ? "Modifier le projet" : "Nouveau projet"}
        size="xl"
      >
        <ProjectForm
          project={editingProject}
          onSubmit={handleSubmitProject}
          onCancel={handleCloseModal}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  )
}

export default Dashboard
