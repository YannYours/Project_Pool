export const users = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Martin",
    email: "alice.martin@company.com",
    password: "password123",
    avatar:
      "https://randomuser.me/api/portraits/men/1.jpg",
    role: "Frontend Developer",
    position: "Senior",
    joinDate: "2023-06-15",
    isActive: true
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@company.com",
    password: "password123",
    avatar:
      "https://randomuser.me/api/portraits/men/2.jpg",
    role: "Backend Developer",
    position: "Senior",
    joinDate: "2023-05-20",
    isActive: true
  },
  {
    id: 3,
    firstName: "Carol",
    lastName: "Davis",
    email: "carol.davis@company.com",
    password: "password123",
    avatar:
      "https://randomuser.me/api/portraits/women/1.jpg",
    role: "UI/UX Designer",
    position: "Mid-level",
    joinDate: "2023-07-10",
    isActive: true
  },
  {
    id: 4,
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@company.com",
    password: "password123",
    avatar:
      "https://randomuser.me/api/portraits/men/3.jpg",
    role: "Project Manager",
    position: "Senior",
    joinDate: "2023-04-12",
    isActive: true
  },
  {
    id: 5,
    firstName: "Emma",
    lastName: "Brown",
    email: "emma.brown@company.com",
    password: "password123",
    avatar:
      "https://randomuser.me/api/portraits/women/4.jpg",
    role: "DevOps Engineer",
    position: "Mid-level",
    joinDate: "2023-08-03",
    isActive: true
  },
  {
    id: 6,
    firstName: "Frank",
    lastName: "Miller",
    email: "frank.miller@company.com",
    password: "password123",
    avatar:
      "https://randomuser.me/api/portraits/men/5.jpg",
    role: "QA Engineer",
    position: "Junior",
    joinDate: "2023-09-15",
    isActive: true
  },
  {
    id: 7,
    firstName: "Grace",
    lastName: "Lee",
    email: "grace.lee@company.com",
    password: "password123",
    avatar:
      "https://randomuser.me/api/portraits/women/5.jpg",
    role: "Data Analyst",
    position: "Mid-level",
    joinDate: "2023-06-28",
    isActive: true
  },
  {
    id: 8,
    firstName: "Henry",
    lastName: "Garcia",
    email: "henry.garcia@company.com",
    password: "password123",
    avatar:
      "https://randomuser.me/api/portraits/men/11.jpg",
    role: "Full Stack Developer",
    position: "Senior",
    joinDate: "2023-03-22",
    isActive: true
  },
  {
    id: 9,
    firstName: "Ivy",
    lastName: "Anderson",
    email: "ivy.anderson@company.com",
    password: "password123",
    avatar:
      "https://randomuser.me/api/portraits/women/11.jpg",
    role: "Product Manager",
    position: "Senior",
    joinDate: "2023-02-14",
    isActive: true
  },
  {
    id: 10,
    firstName: "Jack",
    lastName: "Thompson",
    email: "jack.thompson@company.com",
    password: "password123",
    avatar:
      "https://randomuser.me/api/portraits/men/10.jpg",
    role: "Marketing Manager",
    position: "Mid-level",
    joinDate: "2023-10-05",
    isActive: true
  },
  {
    id: 11,
    firstName: "Kate",
    lastName: "Williams",
    email: "kate.williams@company.com",
    password: "password123",
    avatar:
      "https://randomuser.me/api/portraits/women/6.jpg",
    role: "Business Analyst",
    position: "Junior",
    joinDate: "2023-11-12",
    isActive: true
  },
  {
    id: 12,
    firstName: "Liam",
    lastName: "Taylor",
    email: "liam.taylor@company.com",
    password: "password123",
    avatar:
      "https://randomuser.me/api/portraits/women/13.jpg",
    role: "System Administrator",
    position: "Senior",
    joinDate: "2023-01-08",
    isActive: true
  }
]

export const projects = [
  {
    id: 1,
    name: "Site e-commerce ModernShop",
    description:
      "Développement d'une boutique en ligne moderne avec React et Node.js",
    status: "active",
    priority: "high",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    assignedUsers: [1, 2, 3],
    progress: 75,
    createdAt: "2024-01-10",
    createdBy: 1,
    budget: 25000,
    technologies: ["React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    name: "Application Mobile FinanceTracker",
    description: "App mobile pour le suivi des finances personnelles",
    status: "completed",
    priority: "medium",
    startDate: "2023-10-01",
    endDate: "2023-12-31",
    assignedUsers: [4, 5, 6],
    progress: 100,
    createdAt: "2023-09-25",
    createdBy: 4,
    budget: 18000,
    technologies: ["React Native", "Firebase", "Redux"]
  },
  {
    id: 3,
    name: "Plateforme CRM Enterprise",
    description: "Système de gestion client pour entreprises",
    status: "active",
    priority: "critical",
    startDate: "2024-02-01",
    endDate: "2024-06-30",
    assignedUsers: [7, 8, 9, 10],
    progress: 45,
    createdAt: "2024-01-28",
    createdBy: 9,
    budget: 45000,
    technologies: ["Angular", "Spring Boot", "PostgreSQL"]
  },
  {
    id: 4,
    name: "Site Vitrine AgencyWeb",
    description: "Site web moderne pour agence digitale",
    status: "paused",
    priority: "low",
    startDate: "2024-01-20",
    endDate: "2024-02-28",
    assignedUsers: [3, 11],
    progress: 30,
    createdAt: "2024-01-18",
    createdBy: 3,
    budget: 8000,
    technologies: ["Next.js", "Tailwind CSS", "Strapi"]
  },
  {
    id: 5,
    name: "API Gateway Microservices",
    description: "Architecture microservices avec gateway central",
    status: "active",
    priority: "high",
    startDate: "2024-02-15",
    endDate: "2024-05-15",
    assignedUsers: [2, 5, 12],
    progress: 60,
    createdAt: "2024-02-10",
    createdBy: 2,
    budget: 35000,
    technologies: ["Node.js", "Docker", "Kubernetes", "Redis"]
  },
  {
    id: 6,
    name: "Dashboard Analytics",
    description: "Tableau de bord analytique temps réel",
    status: "completed",
    priority: "medium",
    startDate: "2023-11-01",
    endDate: "2024-01-31",
    assignedUsers: [7, 1],
    progress: 100,
    createdAt: "2023-10-28",
    createdBy: 7,
    budget: 22000,
    technologies: ["Vue.js", "D3.js", "Python", "InfluxDB"]
  },
  {
    id: 7,
    name: "App IoT SmartHome",
    description: "Application de contrôle domotique intelligente",
    status: "active",
    priority: "medium",
    startDate: "2024-03-01",
    endDate: "2024-07-30",
    assignedUsers: [8, 5, 6],
    progress: 25,
    createdAt: "2024-02-25",
    createdBy: 8,
    budget: 30000,
    technologies: ["Flutter", "Arduino", "MQTT", "InfluxDB"]
  },
  {
    id: 8,
    name: "Plateforme E-learning",
    description: "Système de formation en ligne interactif",
    status: "cancelled",
    priority: "low",
    startDate: "2023-12-01",
    endDate: "2024-04-30",
    assignedUsers: [9, 10, 11],
    progress: 15,
    createdAt: "2023-11-28",
    createdBy: 9,
    budget: 40000,
    technologies: ["React", "Laravel", "MySQL", "WebRTC"]
  },
  {
    id: 9,
    name: "Chatbot IA CustomerSupport",
    description: "Assistant virtuel pour support client",
    status: "active",
    priority: "high",
    startDate: "2024-02-20",
    endDate: "2024-04-20",
    assignedUsers: [7, 12, 1],
    progress: 70,
    createdAt: "2024-02-18",
    createdBy: 12,
    budget: 28000,
    technologies: ["Python", "TensorFlow", "FastAPI", "Redis"]
  },
  {
    id: 10,
    name: "App Blockchain Wallet",
    description: "Portefeuille crypto-monnaies sécurisé",
    status: "completed",
    priority: "critical",
    startDate: "2023-08-01",
    endDate: "2023-11-30",
    assignedUsers: [2, 5, 8],
    progress: 100,
    createdAt: "2023-07-28",
    createdBy: 8,
    budget: 55000,
    technologies: ["React Native", "Solidity", "Web3.js", "MetaMask"]
  },
  {
    id: 11,
    name: "Système Inventory Management",
    description: "Gestion d'inventaire pour entrepôts",
    status: "active",
    priority: "medium",
    startDate: "2024-01-10",
    endDate: "2024-04-10",
    assignedUsers: [4, 6, 11],
    progress: 55,
    createdAt: "2024-01-08",
    createdBy: 4,
    budget: 32000,
    technologies: ["Django", "PostgreSQL", "React", "Barcode Scanner"]
  },
  {
    id: 12,
    name: "API REST Documentation",
    description: "Documentation interactive pour APIs",
    status: "completed",
    priority: "low",
    startDate: "2023-09-15",
    endDate: "2023-10-31",
    assignedUsers: [1, 3],
    progress: 100,
    createdAt: "2023-09-12",
    createdBy: 1,
    budget: 12000,
    technologies: ["Swagger", "OpenAPI", "Gatsby", "GraphQL"]
  },
  {
    id: 13,
    name: "Security Audit Platform",
    description: "Plateforme d'audit sécurité automatisé",
    status: "active",
    priority: "critical",
    startDate: "2024-03-15",
    endDate: "2024-08-15",
    assignedUsers: [12, 2, 5],
    progress: 20,
    createdAt: "2024-03-12",
    createdBy: 12,
    budget: 48000,
    technologies: ["Python", "Nmap", "OWASP", "Elasticsearch"]
  },
  {
    id: 14,
    name: "Social Media Scheduler",
    description: "Planificateur de contenu réseaux sociaux",
    status: "paused",
    priority: "medium",
    startDate: "2024-02-05",
    endDate: "2024-05-05",
    assignedUsers: [10, 11],
    progress: 40,
    createdAt: "2024-02-02",
    createdBy: 10,
    budget: 20000,
    technologies: ["React", "Node.js", "MongoDB", "Social APIs"]
  },
  {
    id: 15,
    name: "Weather Monitoring System",
    description: "Système de surveillance météorologique",
    status: "active",
    priority: "low",
    startDate: "2024-01-25",
    endDate: "2024-03-25",
    assignedUsers: [7, 8],
    progress: 80,
    createdAt: "2024-01-22",
    createdBy: 7,
    budget: 15000,
    technologies: ["IoT Sensors", "Python", "InfluxDB", "Grafana"]
  },
  {
    id: 16,
    name: "Video Streaming Platform",
    description: "Plateforme de streaming vidéo HD",
    status: "active",
    priority: "high",
    startDate: "2024-03-10",
    endDate: "2024-09-10",
    assignedUsers: [1, 2, 8, 5],
    progress: 35,
    createdAt: "2024-03-07",
    createdBy: 1,
    budget: 65000,
    technologies: ["React", "Node.js", "FFmpeg", "AWS S3", "CDN"]
  },
  {
    id: 17,
    name: "HR Management Portal",
    description: "Portail de gestion des ressources humaines",
    status: "completed",
    priority: "medium",
    startDate: "2023-07-01",
    endDate: "2023-12-31",
    assignedUsers: [9, 4, 11],
    progress: 100,
    createdAt: "2023-06-28",
    createdBy: 9,
    budget: 38000,
    technologies: ["Angular", "Spring Boot", "MySQL", "JWT"]
  },
  {
    id: 18,
    name: "Task Automation Engine",
    description: "Moteur d'automatisation de tâches",
    status: "active",
    priority: "medium",
    startDate: "2024-02-28",
    endDate: "2024-05-28",
    assignedUsers: [12, 5],
    progress: 50,
    createdAt: "2024-02-25",
    createdBy: 12,
    budget: 25000,
    technologies: ["Python", "Celery", "Redis", "Cron", "API Integrations"]
  },
  {
    id: 19,
    name: "Virtual Reality Experience",
    description: "Expérience VR immersive pour formation",
    status: "active",
    priority: "high",
    startDate: "2024-04-01",
    endDate: "2024-10-01",
    assignedUsers: [3, 8, 6],
    progress: 10,
    createdAt: "2024-03-28",
    createdBy: 3,
    budget: 75000,
    technologies: ["Unity", "C#", "Oculus SDK", "Blender", "WebVR"]
  },
  {
    id: 20,
    name: "Digital Marketing Analytics",
    description: "Plateforme d'analyse marketing digital",
    status: "active",
    priority: "medium",
    startDate: "2024-03-20",
    endDate: "2024-06-20",
    assignedUsers: [10, 7, 1],
    progress: 30,
    createdAt: "2024-03-18",
    createdBy: 10,
    budget: 33000,
    technologies: ["React", "Python", "Google Analytics API", "Charts.js"]
  }
]

export const dashboardStats = {
  totalProjects: 20,
  activeProjects: 12,
  completedProjects: 6,
  pausedProjects: 1,
  cancelledProjects: 1,
  totalUsers: 12,
  totalBudget: 650000,
  thisMonthProjects: 3
}

export let currentUser = null

export const authUser = (email, password) => {
  const user = users.find(u => u.email === email && u.password === password)
  if (user) {
    currentUser = user
    localStorage.setItem("authToken", "mock-token-" + user.id)
    localStorage.setItem("currentUser", JSON.stringify(user))
    return { success: true, user }
  }
  return { success: false, message: "Email ou mot de passe incorrect" }
}

export const registerUser = userData => {
  const existingUser = users.find(u => u.email === userData.email)
  if (existingUser) {
    return { success: false, message: "Un compte avec cet email existe déjà" }
  }

  const newUser = {
    ...userData,
    id: Math.max(...users.map(u => u.id)) + 1,
    avatar: `https://randomuser.me/api/portraits/men/19.jpg`,
    joinDate: new Date().toISOString().split("T")[0],
    isActive: true
  }

  users.push(newUser)
  return { success: true, user: newUser }
}

export const logoutUser = () => {
  currentUser = null
  localStorage.removeItem("authToken")
  localStorage.removeItem("currentUser")
}

export const getCurrentUser = () => {
  if (currentUser) return currentUser

  const savedUser = localStorage.getItem("currentUser")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
    return currentUser
  }

  return null
}
