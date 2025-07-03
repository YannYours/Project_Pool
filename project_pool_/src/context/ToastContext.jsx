import  { createContext, useContext, useState, useCallback } from "react"

// Crée le contexte
const ToastContext = createContext()

// Provider
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const showToast = useCallback(toast => {
        const id = Math.random().toString(36).substr(2, 9)
        setToasts(prev => [...prev, { ...toast, id }])
    }, [])

    const removeToast = useCallback(id => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    )
}

// Hook d’accès
export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}
