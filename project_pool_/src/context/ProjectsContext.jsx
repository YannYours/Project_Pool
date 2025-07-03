import { createContext, useContext, useState } from "react"
import { projects as initialProjects, users } from "../data/mockData"

// Création du contexte
const ProjectsContext = createContext(undefined)

// Hook personnalisé pour utiliser le contexte
export function useProjects() {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider")
  }
  return context
}

// Provider du contexte
export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  // Ajouter un projet
  const addProject = projectData => {
    const newProject = {
      ...projectData,
      id: projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1,
      createdAt: new Date().toISOString().split("T")[0]
    }
    const updatedProjects = [...projects, newProject]
    setProjects(updatedProjects)
    localStorage.setItem("projects", JSON.stringify(updatedProjects))
  }

  // Modifier un projet
  function updateProject(id, updates) {
    const updatedProjects = projects.map(project =>
      project.id === id ? { ...project, ...updates } : project
    )
    setProjects(updatedProjects)
    localStorage.setItem("projects", JSON.stringify(updatedProjects))
  }

  // Supprimer un projet
  function deleteProject(id) {
    const updatedProjects = projects.filter(project => project.id !== id)
    setProjects(updatedProjects)
    localStorage.setItem("projects", JSON.stringify(updatedProjects))
  }


  // Obtenir un projet par ID
  function getProjectById(id) {
    return projects.find(project => project.id === id)
  }

  // Obtenir les utilisateurs par IDs
  function getUsersByIds(ids) {
    return users.filter(user => ids.includes(user.id))
  }

  // Recherche dans les projets
  function searchProjects(query) {
    if (!query.trim()) return projects

    const lowercaseQuery = query.toLowerCase()
    return projects.filter(
      project =>
        project.name.toLowerCase().includes(lowercaseQuery) ||
        project.description.toLowerCase().includes(lowercaseQuery) ||
        project.technologies.some(tech =>
          tech.toLowerCase().includes(lowercaseQuery)
        )
    )
  }

  // Filtrer par statut et priorité
  function filterProjects(status, priority) {
    return projects.filter(project => {
      const matchesStatus = !status || project.status === status
      const matchesPriority = !priority || project.priority === priority
      return matchesStatus && matchesPriority
    })
  }

  const value = {
    projects,
    addProject,
    updateProject,
    deleteProject,
    getProjectById,
    getUsersByIds,
    searchProjects,
    filterProjects
  }

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  )
}
