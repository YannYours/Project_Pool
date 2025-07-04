# 🗂️ProjectPool - Application de Gestion de Projets d’Équipe

Prototype d'application web de gestion de projets, inspirée de Trello et Asana.


## 📚 Description

ProjectPool est un prototype d'application web de gestion de projets collaboratifs pensée pour les équipes tech. Elle permet aux chefs de projet de planifier, suivre et attribuer les tâches en temps réel, et aux membres de mettre à jour leur progression.
Interface moderne, responsive et intuitive, adaptée aux besoins des équipes de développement.
Projet réalisé dans le cadre d’un test technique frontend.

## 🚀 Fonctionnalités principales

-Authentification sécurisée (login, register, logout)

Validation en temps réel des champs

Gestion de session persistante (localStorage & useContext)

Récupération de mot de passe (simulation)

-Dashboard personnalisé

Statistiques dynamiques (projets actifs, terminés, en retard…)

Liste des projets récents

Graphiques interactifs (Rechart)

-Gestion des projets

CRUD complet sur projets (créer, éditer, supprimer)

Filtrage par statut/priorité, recherche

Attribution de membres à chaque projet

Navigation & UX avancées

Header & sidebar responsive (menu collapsible, icônes, avatar utilisateur)

Notifications toast, modals pour actions critiques

Spinners pour chargements

Design responsive

Grille adaptative, menu burger sur mobile

Palette de couleurs cohérente, mode sombre (bonus)


## Screenshots

![Page d'inscription](/src/assets/screen1.png)
![Page de connexion](/src/assets/screen2.png)
![Modal modification projet](/src/assets/screen3.png)
![Toast suppression projet](/src/assets/screen4.png)
![Page des projets](/src/assets/screen5.png)
![Dashboard](/src/assets/screen6.png)


## 🏗️ Stack technique

React 18+ avec Vite (Hooks, Context API, useState/useEffect)

React Router v6 (routes privées/protégées)

Mock Data embarquées (fichier mockData.js)

Gestion d’état : useState, useContext 

Graphiques : Recharts

Icônes : Lucide React

## 📦 Installation

```bash
# 1. Clone le repo
git clone https://github.com/YannYours/Project_Pool.git

cd project_pool_

# 2. Installe les dépendances
npm install

# 3. Lance le serveur de développement
npm run dev
```

 **Remarques** :
Avoir au préalable une version récente de Node JS installé (v23.11.1 pour ce projet).

## 🌐 Démo en ligne

Lien => 