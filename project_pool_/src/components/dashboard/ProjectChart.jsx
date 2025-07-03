import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { useProjects } from "../../context/ProjectsContext"


const ProjectChart = () => {
  const { projects } = useProjects()

  // Données relatives à la répartition des statuts (diagramme circulaire)
  const statusData = [
    {
      name: "Actifs",
      value: projects.filter(p => p.status === "active").length,
      color: "#10B981"
    },
    {
      name: "Terminés",
      value: projects.filter(p => p.status === "completed").length,
      color: "#3B82F6"
    },
    {
      name: "En pause",
      value: projects.filter(p => p.status === "paused").length,
      color: "#F59E0B"
    },
    {
      name: "Annulés",
      value: projects.filter(p => p.status === "cancelled").length,
      color: "#EF4444"
    }
  ]

  // Données pour les projets mensuels (diagramme à barres)
  const monthlyData = [
    { month: "Jan", projects: 2 },
    { month: "Feb", projects: 4 },
    { month: "Mar", projects: 6 },
    { month: "Avr", projects: 3 },
    { month: "Mai", projects: 5 },
    { month: "Jun", projects: 2 }
  ]

  return (
    <div className="row g-3">
      {/* Diagramme à secteurs de la répartition des statuts */}
      <div className="col-12 col-lg-6">
        <div className="card border shadow-sm h-100">
          <div className="card-body">
            <h3 className="h6 fw-semibold text-dark mb-3">
              Répartition par statut
            </h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Diagramme à barres des projets mensuels */}
      <div className="col-12 col-lg-6">
        <div className="card border shadow-sm h-100">
          <div className="card-body">
            <h3 className="h6 fw-semibold text-dark mb-3">
              Projets par mois
            </h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="projects" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectChart
