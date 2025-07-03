import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ProjectsProvider } from "./context/ProjectsContext"
import { useToast } from "./context/ToastContext"
import { ToastProvider } from "./context/ToastContext"
import { ToastContainer } from "./components/ui/Toast" // juste l'affichage visuel
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./components/auth/Login"
import Dashboard from "./components/dashboard/Dashboard"
import Register from "./components/auth/Register"
import Layout from "../src/components/layouts/Layout"
import Projects from "./components/projects/Projects"


// Composant qui contient toutes les routes et le container de toast
const AppContent = () => {
  const { toasts, removeToast } = useToast()

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Routes protégées */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="team" element={
            <div className="p-4 text-center text-secondary">Page Équipe - En développement</div>
          } />
          <Route path="stats" element={
            <div className="p-4 text-center text-secondary">Page Statistiques - En développement</div>
          } />
          <Route path="settings" element={
            <div className="p-4 text-center text-secondary">Page Paramètres - En développement</div>
          } />
        </Route>
      </Routes>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </Router>

  )
}

// App englobe tout avec les Providers de contexte
function App() {
  return (
    <AuthProvider>
      <ProjectsProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </ProjectsProvider>
    </AuthProvider>
  )
}

export default App
