import { createContext, useContext, useState, useEffect } from "react";
import { authUser, registerUser, logoutUser, getCurrentUser } from "../data/mockData";

// Création du context
const AuthContext = createContext(undefined);

// Hook personnalisé d'accès au contexte Auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Provider Auth qui englobe toute l'app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifie au démarrage si un utilisateur est connecté
  useEffect(() => {
    const savedUser = getCurrentUser();
    setUser(savedUser);
    setLoading(false);
  }, []);

  // Connexion utilisateur
  async function login (email, password)  {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simule une requête API
    const result = authUser(email, password);
    if (result.success) setUser(result.user);
    setLoading(false);
    return result;
  };

  // Inscription utilisateur
  async function register (userData) {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const result = registerUser(userData);
    setLoading(false);
    return result;
  };

  // Déconnexion utilisateur
  function logout () {
    logoutUser();
    setUser(null);
  };

  // Valeur fournie au contexte
  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
