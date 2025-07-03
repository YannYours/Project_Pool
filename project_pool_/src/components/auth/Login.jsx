import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, FolderOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import Swal from 'sweetalert2';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Format d'email invalide";
        }

        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        }
        // Option sécurité (mot de passe trop simple)
        else if (
            ["123456", "password", "motdepasse", "azerty", "qwerty"].includes(formData.password.trim().toLowerCase())
        ) {
            newErrors.password = "Le mot de passe est trop simple pour être sécurisé";
            // Option: Alert immédiate
            Swal.fire({
                icon: 'warning',
                title: 'Sécurité',
                text: "Le mot de passe choisi est trop simple !",
                confirmButtonText: 'OK',
                customClass: { popup: 'swal-zindex' }
            });
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        const result = await login(formData.email, formData.password);
        setIsLoading(false);

        if (result.success) {
            Swal.fire({
                icon: 'success',
                title: 'Connexion réussie',
                text: 'venue sur ProjectPool !',
                timer: 1200,
                showConfirmButton: false,
                customClass: { popup: 'swal-zindex' }

            });
            setTimeout(() => navigate('/dashboard'), 2200); // Laisse l'alerte visible
        } else {
            // Affiche SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Erreur de connexion',
                text: result.message || 'Vérifiez vos identifiants et réessayez.',
                customClass: { popup: 'swal-zindex' }

            });
            setErrors({ general: result.message || 'Erreur de connexion' });
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow" style={{ maxWidth: 400, width: '100%' }}>
                <div className="card-body">
                    <div className="text-center mb-4">
                        <div className="mx-auto mb-2 d-flex align-items-center justify-content-center bg-primary rounded-3" style={{ width: 64, height: 64 }}>
                            <FolderOpen className="text-white" size={32} />
                        </div>
                        <h2 className="h4 fw-bold mb-1">Connexion à ProjectPool</h2>
                        <p className="text-muted small mb-0">Accédez à votre espace de gestion de projets</p>
                    </div>
                    <form className="mt-3" onSubmit={handleSubmit}>
                        {/* On peut garder l'affichage classique d'erreur en plus de SweetAlert */}
                        {errors.general && (
                            <div className="alert alert-danger py-2">{errors.general}</div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <Mail size={18} className="text-secondary" />
                                </span>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`form-control${errors.email ? ' is-invalid' : ''}`}
                                    placeholder="votre@email.com"
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email}</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Mot de passe</label>
                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <Lock size={18} className="text-secondary" />
                                </span>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
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
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="rememberMe">
                                    Se souvenir de moi
                                </label>
                            </div>
                            <a href="#" className="small text-primary text-decoration-none">
                                Mot de passe oublié ?
                            </a>
                        </div>
                        <div className="d-grid mb-2">
                            <button
                                type="submit"
                                className="btn btn-primary fw-bold"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <LoadingSpinner size="sm" className="text-white" />
                                ) : (
                                    'Se connecter'
                                )}
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <span className="text-muted small">
                                Pas encore de compte ?{' '}
                                <Link to="/register" className="text-primary text-decoration-none fw-bold">
                                    Inscrivez-vous
                                </Link>
                            </span>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <p className="text-secondary small">
                            Demo: alice.martin@company.com / password123
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
