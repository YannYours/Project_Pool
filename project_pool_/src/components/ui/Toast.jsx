import React, { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, XCircle, X } from "lucide-react"

// Toast individuel
const ToastComponent = ({ toast, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(toast.id)
        }, toast.duration || 5000)
        return () => clearTimeout(timer)
    }, [toast.id, toast.duration, onClose])

    // Icones et couleurs Bootstrap
    const getIcon = () => {
        switch (toast.type) {
            case "success":
                return <CheckCircle className="me-2 text-success" size={20} />
            case "error":
                return <XCircle className="me-2 text-danger" size={20} />
            case "warning":
                return <AlertCircle className="me-2 text-warning" size={20} />
            default:
                return <AlertCircle className="me-2 text-primary" size={20} />
        }
    }

    const getBgClass = () => {
        switch (toast.type) {
            case "success":
                return "border-success bg-success bg-opacity-10"
            case "error":
                return "border-danger bg-danger bg-opacity-10"
            case "warning":
                return "border-warning bg-warning bg-opacity-10"
            default:
                return "border-primary bg-primary bg-opacity-10"
        }
    }

    return (
        <div
            className={`toast show align-items-center ${getBgClass()} border mb-2`}
            style={{ minWidth: 320, maxWidth: 400, boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
            role="alert"
        >
            <div className="d-flex">
                <div className="toast-body d-flex align-items-start">
                    {getIcon()}
                    <div>
                        <div className="fw-semibold">{toast.title}</div>
                        {toast.message && (
                            <div className="small text-secondary">{toast.message}</div>
                        )}
                    </div>
                </div>
                <button
                    type="button"
                    className="btn-close ms-2 me-2"
                    aria-label="Fermer"
                    onClick={() => onClose(toast.id)}
                    style={{ marginTop: 8 }}
                />
            </div>
        </div>
    )
}

// Container global, position fixed en haut à droite
export const ToastContainer = ({ toasts, onClose }) => (
    <div
        style={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 1080,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
        }}
    >
        {toasts.map(toast => (
            <ToastComponent key={toast.id} toast={toast} onClose={onClose} />
        ))}
    </div>
)

// Hook
export const useToast = () => {
    const [toasts, setToasts] = useState([])

    const showToast = toast => {
        const id = Math.random().toString(36).substr(2, 9)
        setToasts(prev => [...prev, { ...toast, id }])
    }

    const removeToast = id => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }

    return {
        toasts,
        showToast,
        removeToast
    }
}
