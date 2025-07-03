const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-primary",
  iconBgColor = "bg-primary bg-opacity-10"
}) => {
  return (
    <div className="card border shadow-sm h-100" style={{ transition: "box-shadow .2s" }}>
      <div className="card-body d-flex align-items-center justify-content-between">
        <div>
          <div className="small text-secondary fw-medium">{title}</div>
          <div className="h4 fw-bold text-dark mb-0 mt-1">{value}</div>
          {change && (
            <div className="d-flex align-items-center mt-2">
              <span
                className={`small fw-medium ${
                  change.type === "increase" ? "text-success" : "text-danger"
                }`}
              >
                {change.type === "increase" ? "+" : "-"}
                {Math.abs(change.value)}%
              </span>
              <span className="small text-secondary ms-2">ce mois</span>
            </div>
          )}
        </div>
        <div
          className={`d-flex align-items-center justify-content-center rounded bg-opacity-10 ${iconBgColor}`}
          style={{ width: 48, height: 48 }}
        >
          <Icon className={`w-50 h-50 ${iconColor}`} size={28} />
        </div>
      </div>
    </div>
  )
}

export default StatCard
