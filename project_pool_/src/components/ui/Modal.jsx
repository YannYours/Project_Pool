import React, { useEffect } from "react"
import { X } from "lucide-react"

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
    useEffect(() => {
        const handleEscape = e => {
            if (e.key === "Escape") onClose()
        }
        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
            document.body.style.overflow = "hidden"
        }
        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = "unset"
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const getSizeClass = () => {
        switch (size) {
            case "sm":
                return "modal-sm"
            case "lg":
                return "modal-lg"
            case "xl":
                return "modal-xl"
            default:
                return ""
        }
    }

    return (
        <div
            className="modal fade show"
            tabIndex="-1"
            style={{ display: "block", background: "rgba(33, 37, 41, 0.4)" , zIndex: 100 }}
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            <div
                className={`modal-dialog ${getSizeClass()} modal-dialog-centered`}
                style={{ pointerEvents: "none" }}
                onClick={e => e.stopPropagation()}
            >
                <div className="modal-content" style={{ borderRadius: 18, pointerEvents: "auto" }}>
                    <div className="modal-header border-0 pb-2">
                        <h5 className="modal-title fw-bold">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Fermer"
                            onClick={onClose}
                            style={{ fontSize: 18 }}
                        >
                        </button>
                    </div>
                    <div className="modal-body pt-0">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default Modal
