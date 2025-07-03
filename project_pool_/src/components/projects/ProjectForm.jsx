import React, { useState, useEffect } from "react"
import { X } from "lucide-react"
import { users } from "../../data/mockData"
import { useAuth } from "../../context/AuthContext"
import LoadingSpinner from "../ui/LoadingSpinner"

const ProjectForm = ({ project, onSubmit, onCancel, isLoading = false }) => {
    const { user } = useAuth()
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "active",
        priority: "medium",
        startDate: "",
        endDate: "",
        assignedUsers: [],
        progress: 0,
        createdBy: user?.id || 1,
        budget: 0,
        technologies: [],
        newTechnology: ""
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (project) {
            setFormData({
                name: project.name,
                description: project.description,
                status: project.status,
                priority: project.priority,
                startDate: project.startDate,
                endDate: project.endDate,
                assignedUsers: project.assignedUsers,
                progress: project.progress,
                createdBy: project.createdBy,
                budget: project.budget,
                technologies: project.technologies,
                newTechnology: ""
            })
        }
    }, [project])

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = "Le nom du projet est requis"
        }

        if (!formData.description.trim()) {
            newErrors.description = "La description est requise"
        }

        if (!formData.startDate) {
            newErrors.startDate = "La date de début est requise"
        }

        if (!formData.endDate) {
            newErrors.endDate = "La date de fin est requise"
        }

        if (
            formData.startDate &&
            formData.endDate &&
            formData.startDate > formData.endDate
        ) {
            newErrors.endDate = "La date de fin doit être postérieure à la date de début"
        }

        if (formData.budget < 0) {
            newErrors.budget = "Le budget ne peut pas être négatif"
        }

        if (formData.progress < 0 || formData.progress > 100) {
            newErrors.progress = "La progression doit être entre 0 et 100%"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (!validateForm()) return

        const projectData = {
            name: formData.name.trim(),
            description: formData.description.trim(),
            status: formData.status,
            priority: formData.priority,
            startDate: formData.startDate,
            endDate: formData.endDate,
            assignedUsers: formData.assignedUsers,
            progress: formData.progress,
            createdBy: formData.createdBy,
            budget: formData.budget,
            technologies: formData.technologies
        }

        onSubmit(projectData)
    }

    const handleChange = e => {
        const { name, value, type } = e.target
        const processedValue = type === "number" ? Number(value) : value

        setFormData(prev => ({
            ...prev,
            [name]: processedValue
        }))

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }))
        }
    }

    const handleUserToggle = userId => {
        setFormData(prev => ({
            ...prev,
            assignedUsers: prev.assignedUsers.includes(userId)
                ? prev.assignedUsers.filter(id => id !== userId)
                : [...prev.assignedUsers, userId]
        }))
    }

    const addTechnology = () => {
        if (
            formData.newTechnology.trim() &&
            !formData.technologies.includes(formData.newTechnology.trim())
        ) {
            setFormData(prev => ({
                ...prev,
                technologies: [...prev.technologies, prev.newTechnology.trim()],
                newTechnology: ""
            }))
        }
    }

    const removeTechnology = tech => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.filter(t => t !== tech)
        }))
    }

    const handleKeyPress = e => {
        if (e.key === "Enter") {
            e.preventDefault()
            addTechnology()
        }
    }

    return (
        <div className="container-xl">
            <form onSubmit={handleSubmit} className="mt-4">
                {/* Name & Budget */}
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Nom du projet *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`form-control${errors.name ? " is-invalid" : ""}`}
                            placeholder="Nom du projet"
                        />
                        {errors.name && (
                            <div className="invalid-feedback">{errors.name}</div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="budget" className="form-label">Budget (XOF)</label>
                        <input
                            type="number"
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            min="0"
                            className={`form-control${errors.budget ? " is-invalid" : ""}`}
                            placeholder="0"
                        />
                        {errors.budget && (
                            <div className="invalid-feedback">{errors.budget}</div>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div className="mt-3">
                    <label htmlFor="description" className="form-label">Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        className={`form-control${errors.description ? " is-invalid" : ""}`}
                        placeholder="Description du projet"
                    />
                    {errors.description && (
                        <div className="invalid-feedback">{errors.description}</div>
                    )}
                </div>

                {/* Status, Priority, Dates */}
                <div className="row g-3 mt-3">
                    <div className="col-md-3">
                        <label htmlFor="status" className="form-label">Statut</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="active">Actif</option>
                            <option value="completed">Terminé</option>
                            <option value="paused">En pause</option>
                            <option value="cancelled">Annulé</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="priority" className="form-label">Priorité</label>
                        <select
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="low">Basse</option>
                            <option value="medium">Moyenne</option>
                            <option value="high">Haute</option>
                            <option value="critical">Critique</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="startDate" className="form-label">Date de début *</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className={`form-control${errors.startDate ? " is-invalid" : ""}`}
                        />
                        {errors.startDate && (
                            <div className="invalid-feedback">{errors.startDate}</div>
                        )}
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="endDate" className="form-label">Date de fin *</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className={`form-control${errors.endDate ? " is-invalid" : ""}`}
                        />
                        {errors.endDate && (
                            <div className="invalid-feedback">{errors.endDate}</div>
                        )}
                    </div>
                </div>

                {/* Progress */}
                <div className="mt-3">
                    <label htmlFor="progress" className="form-label">
                        Progression ({formData.progress}%)
                    </label>
                    <input
                        type="range"
                        id="progress"
                        name="progress"
                        min="0"
                        max="100"
                        value={formData.progress}
                        onChange={handleChange}
                        className="form-range"
                    />
                    {errors.progress && (
                        <div className="invalid-feedback d-block">{errors.progress}</div>
                    )}
                </div>

                {/* Technologies */}
                <div className="mt-3">
                    <label className="form-label">Technologies</label>
                    <div className="d-flex flex-wrap gap-2 mb-2">
                        {formData.technologies.map(tech => (
                            <span
                                key={tech}
                                className="badge bg-primary bg-opacity-10 text-primary d-inline-flex align-items-center"
                                style={{ fontSize: 13 }}
                            >
                                {tech}
                                <button
                                    type="button"
                                    onClick={() => removeTechnology(tech)}
                                    className="btn btn-link btn-sm p-0 ms-1 text-primary"
                                    tabIndex={-1}
                                    style={{ lineHeight: 0 }}
                                >
                                    <X size={13} />
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="d-flex gap-2">
                        <input
                            type="text"
                            value={formData.newTechnology}
                            onChange={e =>
                                setFormData(prev => ({
                                    ...prev,
                                    newTechnology: e.target.value
                                }))
                            }
                            onKeyPress={handleKeyPress}
                            className="form-control"
                            style={{ maxWidth: 260 }}
                            placeholder="Ajouter une technologie"
                        />
                        <button
                            type="button"
                            onClick={addTechnology}
                            className="btn btn-primary"
                        >
                            Ajouter
                        </button>
                    </div>
                </div>

                {/* Assigned users */}
                <div className="mt-3">
                    <label className="form-label">Membres assignés</label>
                    <div className="row g-2" style={{ maxHeight: 220, overflowY: "auto" }}>
                        {users.map(user => (
                            <div className="col-12 col-md-6 col-lg-4" key={user.id}>
                                <label
                                    className={`d-flex align-items-center gap-2 border rounded p-2 cursor-pointer mb-0 ${formData.assignedUsers.includes(user.id)
                                            ? "border-primary bg-primary bg-opacity-10"
                                            : "border-secondary"
                                        }`}
                                    style={{ transition: "background .2s, border-color .2s" }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={formData.assignedUsers.includes(user.id)}
                                        onChange={() => handleUserToggle(user.id)}
                                        className="form-check-input"
                                    />
                                    <img
                                        src={user.avatar}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className="rounded-circle"
                                        style={{ width: 32, height: 32, objectFit: "cover" }}
                                    />
                                    <div className="flex-grow-1 min-w-0">
                                        <div className="fw-medium text-dark" style={{ fontSize: 14 }}>
                                            {user.firstName} {user.lastName}
                                        </div>
                                        <div className="small text-secondary">{user.role}</div>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="d-flex justify-content-end gap-3 pt-4 border-top mt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-light"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary d-flex align-items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner size="sm" />
                                <span>Enregistrement...</span>
                            </>
                        ) : (
                            <span>{project ? "Mettre à jour" : "Créer le projet"}</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProjectForm
