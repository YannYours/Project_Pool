import React from "react"

const LoadingSpinner = ({ size = "md", className = "" }) => {
  let spinnerSize
  switch (size) {
    case "sm":
      spinnerSize = "spinner-border spinner-border-sm"
      break
    case "lg":
      spinnerSize = "spinner-border"
      break
    default:
      spinnerSize = "spinner-border"
  }

  // Inline style for custom size (optionnel)
  const style =
    size === "sm"
      ? { width: 18, height: 18 }
      : size === "lg"
      ? { width: 32, height: 32 }
      : { width: 24, height: 24 }

  return (
    <div
      className={`${spinnerSize} text-primary ${className}`}
      style={style}
      role="status"
    >
      <span className="visually-hidden">Chargement...</span>
    </div>
  )
}

export default LoadingSpinner
