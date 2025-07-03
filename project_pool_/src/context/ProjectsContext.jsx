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
  const [projects, setProjects] = useState(initialProjects)

  // Ajouter un projet
  const addProject = projectData => {
    const newProject = {
      ...projectData,
      id: projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1,
      createdAt: new Date().toISOString().split("T")[0]
    }
    setProjects([...projects, newProject])
  }

  // Modifier un projet
  function updateProject(id, updates) {
    setProjects(
      projects.map(project =>
        project.id === id ? { ...project, ...updates } : project
      )
    )
  }

  // Supprimer un projet
  function deleteProject(id) {
    setProjects(projects.filter(project => project.id !== id))
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
