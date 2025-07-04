import { useState, useMemo } from "react"
import { Plus, Search, Filter } from "lucide-react"
import { useProjects } from "../../context/ProjectsContext"
import ProjectCard from "./ProjectCard"
import ProjectForm from "./ProjectForm"
import Modal from "../ui/Modal"
import Swal from "sweetalert2"

const Projects = () => {
    const {
        projects,
        addProject,
        updateProject,
        deleteProject,
    } = useProjects()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingProject, setEditingProject] = useState(undefined)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [priorityFilter, setPriorityFilter] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const filteredProjects = useMemo(() => {
        let result = projects;

        if (searchQuery) {
            result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (statusFilter) {
            result = result.filter(p => p.status === statusFilter);
        }

        if (priorityFilter) {
            result = result.filter(p => p.priority === priorityFilter);
        }

        return result;
    }, [projects, searchQuery, statusFilter, priorityFilter])

    const handleCreateProject = () => {
        setEditingProject(undefined)
        setIsModalOpen(true)
    }

    const handleEditProject = project => {
        setEditingProject(project)
        setIsModalOpen(true)
    }

    // SweetAlert2 pour suppression
    const handleDeleteProject = async id => {
        const result = await Swal.fire({
            title: "Supprimer ce projet ?",
            text: "Cette action est irréversible.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Oui, supprimer",
            cancelButtonText: "Annuler",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6"
        })

        if (result.isConfirmed) {
            deleteProject(id)
            await Swal.fire({
                title: "Supprimé !",
                text: "Le projet a été supprimé avec succès.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
                customClass: { popup: 'swal-zindex' }

            }).then(() => {
                location.reload()
            })
        }
    }

    // SweetAlert2 pour création/édition/erreur
    const handleSubmitProject = async projectData => {
        setIsLoading(true)

        // Simulate API delay
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

                }).then(() => {
                    location.reload()
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

                }).then(() => {
                    location.reload()
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

    const getProjectStats = () => {
        const total = projects.length
        const active = projects.filter(p => p.status === "active").length
        const completed = projects.filter(p => p.status === "completed").length
        const paused = projects.filter(p => p.status === "paused").length

        return { total, active, completed, paused }
    }

    const stats = getProjectStats()

    return (
        <div className="container-xl py-3">
            {/* Header */}
            <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3 mb-4">
                <div>
                    <h1 className="h3 fw-bold text-dark mb-1">Projets</h1>
                    <div className="text-secondary small">Gérez et suivez tous vos projets</div>
                </div>
                <button
                    onClick={handleCreateProject}
                    className="btn btn-primary d-flex align-items-center gap-2 fw-medium"
                >
                    <Plus size={18} />
                    <span>Nouveau projet</span>
                </button>
            </div>

            {/* Stats */}
            <div className="row g-3 mb-3">
                <div className="col-6 col-lg-3">
                    <div className="card border text-center p-3">
                        <div className="small text-secondary">Total</div>
                        <div className="h4 fw-bold text-dark mb-0">{stats.total}</div>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="card border text-center p-3">
                        <div className="small text-secondary">Actifs</div>
                        <div className="h4 fw-bold text-success mb-0">{stats.active}</div>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="card border text-center p-3">
                        <div className="small text-secondary">Terminés</div>
                        <div className="h4 fw-bold text-primary mb-0">{stats.completed}</div>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="card border text-center p-3">
                        <div className="small text-secondary">En pause</div>
                        <div className="h4 fw-bold text-warning mb-0">{stats.paused}</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="card border p-3 mb-4">
                <div className="row g-3">
                    <div className="col-lg-5">
                        <div className="position-relative">
                            <Search
                                style={{
                                    position: "absolute",
                                    left: 14,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#adb5bd",
                                    width: 17,
                                    height: 17
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Rechercher des projets..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="form-control ps-5"
                            />
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="form-select"
                        >
                            <option value="">Tous les statuts</option>
                            <option value="active">Actifs</option>
                            <option value="completed">Terminés</option>
                            <option value="paused">En pause</option>
                            <option value="cancelled">Annulés</option>
                        </select>
                    </div>
                    <div className="col-lg-3">
                        <select
                            value={priorityFilter}
                            onChange={e => setPriorityFilter(e.target.value)}
                            className="form-select"
                        >
                            <option value="">Toutes les priorités</option>
                            <option value="critical">Critique</option>
                            <option value="high">Haute</option>
                            <option value="medium">Moyenne</option>
                            <option value="low">Basse</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
                <div className="row g-4">
                    {filteredProjects.map(project => (
                        <div key={project.id} className="col-12 col-lg-6 col-xl-4">
                            <ProjectCard
                                project={project}
                                onEdit={handleEditProject}
                                onDelete={handleDeleteProject}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-5">
                    <div
                        className="mx-auto rounded d-flex align-items-center justify-content-center mb-3"
                        style={{
                            width: 58,
                            height: 58,
                            background: "#f1f3f5"
                        }}
                    >
                        <Filter size={32} color="#adb5bd" />
                    </div>
                    <div className="h5 text-secondary mb-1">Aucun projet trouvé</div>
                    <div className="text-muted small">
                        {searchQuery || statusFilter || priorityFilter
                            ? "Essayez de modifier vos filtres"
                            : "Créez votre premier projet pour commencer"}
                    </div>
                </div>
            )}

            {/* Project Form Modal */}
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

export default Projects
