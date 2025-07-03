import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Briefcase,
  FolderOpen
} from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import LoadingSpinner from "../ui/LoadingSpinner"

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    position: "",
    acceptTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Project Manager",
    "DevOps Engineer",
    "QA Engineer",
    "Data Analyst",
    "Product Manager",
    "Marketing Manager",
    "Business Analyst",
    "System Administrator"
  ]

  const getPasswordStrength = password => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const getPasswordStrengthText = strength => {
    switch (strength) {
      case 0:
      case 1:
        return { text: "Très faible", color: "text-danger" }
      case 2:
        return { text: "Faible", color: "text-warning" }
      case 3:
        return { text: "Moyen", color: "text-info" }
      case 4:
        return { text: "Fort", color: "text-success" }
      case 5:
        return { text: "Très fort", color: "text-success" }
      default:
        return { text: "", color: "" }
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis"
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "Le prénom doit contenir au moins 2 caractères"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis"
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Le nom doit contenir au moins 2 caractères"
    }

    if (!formData.email) {
      newErrors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide"
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "La confirmation du mot de passe est requise"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
    }

    if (!formData.role) {
      newErrors.role = "Le rôle est requis"
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Vous devez accepter les conditions d'utilisation"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    const result = await register({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email,
      password: formData.password,
      role: formData.role,
      position: formData.position || "Junior"
    })
    setIsLoading(false)

    if (result.success) {
      navigate("/login")
    } else {
      setErrors({ general: result.message || "Erreur lors de l'inscription" })
    }
  }

  const handleChange = e => {
    const { name, value, type } = e.target
    const checked = e.target.checked

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const passwordStrengthInfo = getPasswordStrengthText(passwordStrength)

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-4">
      <div className="card shadow w-100" style={{ maxWidth: 440 }}>
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <div className="mx-auto mb-2 d-flex align-items-center justify-content-center bg-primary rounded-3" style={{ width: 64, height: 64 }}>
              <FolderOpen className="text-white" size={32} />
            </div>
            <h2 className="h4 fw-bold mb-1">Créer un compte</h2>
            <p className="text-muted small mb-0">
              Rejoignez ProjectPool et gérez vos projets efficacement
            </p>
          </div>

          <form className="mt-3" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="alert alert-danger py-2">{errors.general}</div>
            )}

            <div className="row">
              <div className="mb-3 col-6">
                <label htmlFor="firstName" className="form-label">Prénom</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><User size={18} className="text-secondary" /></span>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`form-control${errors.firstName ? ' is-invalid' : ''}`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>
              </div>
              <div className="mb-3 col-6">
                <label htmlFor="lastName" className="form-label">Nom</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`form-control${errors.lastName ? ' is-invalid' : ''}`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><Mail size={18} className="text-secondary" /></span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control${errors.email ? ' is-invalid' : ''}`}
                  placeholder="john.doe@company.com"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="role" className="form-label">Rôle</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><Briefcase size={18} className="text-secondary" /></span>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className={`form-select${errors.role ? ' is-invalid' : ''}`}
                >
                  <option value="">Sélectionnez votre rôle</option>
                  {roles.map(role => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <div className="invalid-feedback d-block">{errors.role}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><Lock size={18} className="text-secondary" /></span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-control${errors.password ? ' is-invalid' : ''}`}
                  placeholder="Votre mot de passe"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
                {errors.password && (
                  <div className="invalid-feedback d-block">{errors.password}</div>
                )}
              </div>
              {formData.password && (
                <div className="mt-2">
                  <small className={passwordStrengthInfo.color}>
                    Force : {passwordStrengthInfo.text}
                  </small>
                  <div className="progress mt-1" style={{ height: 6 }}>
                    <div
                      className="progress-bar bg-primary"
                      style={{
                        width: `${(passwordStrength / 5) * 100}%`,
                        transition: 'width .3s'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><Lock size={18} className="text-secondary" /></span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-control${errors.confirmPassword ? ' is-invalid' : ''}`}
                  placeholder="Confirmez votre mot de passe"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  tabIndex={-1}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
                {errors.confirmPassword && (
                  <div className="invalid-feedback d-block">{errors.confirmPassword}</div>
                )}
              </div>
            </div>

            <div className="mb-3 form-check">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className={`form-check-input${errors.acceptTerms ? ' is-invalid' : ''}`}
              />
              <label htmlFor="acceptTerms" className="form-check-label">
                J'accepte les{" "}
                <a href="#" className="text-primary text-decoration-none">
                  conditions d'utilisation
                </a>{" "}
                et la{" "}
                <a href="#" className="text-primary text-decoration-none">
                  politique de confidentialité
                </a>
              </label>
              {errors.acceptTerms && (
                <div className="invalid-feedback d-block">{errors.acceptTerms}</div>
              )}
            </div>

            <div className="d-grid mb-2">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary fw-bold"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" className="text-white" />
                ) : (
                  "Créer un compte"
                )}
              </button>
            </div>

            <div className="text-center mt-2">
              <span className="text-muted small">
                Déjà un compte ?{" "}
                <Link
                  to="/login"
                  className="text-primary text-decoration-none fw-bold"
                >
                  Connectez-vous
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
