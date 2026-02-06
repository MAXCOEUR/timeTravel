# TimeTravel

Une application web moderne et immersive pour une agence de voyage temporel fictive, construite avec [Next.js](https://nextjs.org/) et enrichie par des capacités d'IA. Ce projet présente une page d'accueil futuriste avec des éléments interactifs, un assistant chatbot et une expérience de réservation fluide.

## ✨ Fonctionnalités

- **🌍 Page d'Accueil Immersive** : Des sections magnifiquement conçues comprenant une zone Héro, une vitrine des Destinations, À Propos et une interface de Réservation.
- **💬 Assistant de Voyage IA** : `ChatbotWidget` intégré propulsé par le [Vercel AI SDK](https://sdk.vercel.ai/) pour répondre aux questions des utilisateurs et les guider à travers les époques.
- **🧩 Quiz Interactif** : Une `QuizSection` pour aider les utilisateurs à découvrir leur destination de voyage temporel idéale.
- **🎨 Esthétique Moderne** : Design entièrement responsive avec un rendu premium, utilisant [Tailwind CSS](https://tailwindcss.com/) et les composants [Radix UI](https://www.radix-ui.com/).
- **⚡ Haute Performance** : Construit sur le robuste framework Next.js 15 App Router.
- **🎬 Animations Fluides** : Facilité d'utilisation engageante avec [Framer Motion](https://www.framer.com/motion/).

## 🛠️ Stack Technique

- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript
- **Style** : Tailwind CSS, Tailwind Merge, CLSX
- **Bibliothèque UI** : Radix UI (Primitives), Shadcn UI (Modèles de composants), Lucide React (Icônes)
- **Intégration IA** : Vercel AI SDK, Mistral AI (dépendance implicite)
- **État & Formulaires** : React Hook Form, Zod
- **Visualisation de Données** : Recharts

## 🚀 Pour Commencer

### Prérequis

Assurez-vous d'avoir installé les éléments suivants sur votre machine :
- **Node.js** : v18.17.0 ou supérieur
- **Gestionnaire de Paquets** : npm, pnpm (recommandé) ou yarn

### Installation

1. **Cloner le dépôt :**
   ```bash
   git clone <repository-url>
   cd timeTravel
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   # ou si vous utilisez pnpm
   pnpm install
   ```

3. **Configurer les Variables d'Environnement :**
   Créez un fichier `.env.local` à la racine du répertoire. Vous aurez probablement besoin de configurer vos clés de fournisseur d'IA (par exemple, pour Mistral ou OpenAI) selon l'implémentation dans `app/api/chat`.

   ```env
   # Exemple
   MISTRAL_API_KEY=votre_cle_api_ici
   ```

4. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   # ou
   pnpm dev
   ```

5. **Ouvrir l'application :**
   Visitez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour explorer l'application.

## 📂 Structure du Projet

```
├── app/                  # Pages Next.js App Router et routes API
│   ├── api/chat/         # Point de terminaison API pour le chatbot IA
│   ├── page.tsx          # Page d'accueil principale assemblant toutes les sections
│   ├── layout.tsx        # Structure de mise en page racine
│   └── globals.css       # Styles globaux et directives Tailwind
├── components/           # Composants UI réutilisables et sections de fonctionnalités
│   ├── ui/               # Composants UI primitifs (boutons, entrées, etc.)
│   ├── hero-section.tsx  # Composant bannière Hero
│   ├── chatbot-widget.tsx# Interface de Chat IA
│   └── ...               # Autres sections (Quiz, Destinations, etc.)
├── lib/                  # Fonctions utilitaires et aides partagées
├── public/               # Actifs statiques (images, polices)
└── ...                   # Fichiers de configuration (next.config.mjs, tailwind.config.ts)
```

## 🤝 Contribuer

Les contributions sont toujours les bienvenues ! Si vous avez des idées, des suggestions ou des signalements de bugs :

1. Forkez le projet.
2. Créez votre branche de fonctionnalité (`git checkout -b feature/SuperFonctionnalite`).
3. Committez vos changements (`git commit -m 'Ajout d'une SuperFonctionnalite'`).
4. Pushez vers la branche (`git push origin feature/SuperFonctionnalite`).
5. Ouvrez une Pull Request.

## 📄 Licence

Correspond à la licence du dépôt du projet (MIT par défaut pour la plupart des opensource).
