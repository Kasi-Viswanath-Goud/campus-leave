# Campus Leave Management System

A modern web-based application designed to streamline the process of requesting and approving leaves for students on campus. This system provides distinct portals for students to submit leave requests and for administrators/wardens to review, approve, or reject them efficiently.

## Features
- **Student Dashboard:** Submit new leave requests, track their status, and view past request history.
- **Admin Dashboard:** Review incoming leave requests in real-time, and quickly approve or reject them.
- **Authentication:** Secure login system with role-based access control for students and administrators.
- **Responsive UI:** Clean, intuitive interface built with modern React components.

## Tech Stack & Skills Used
This project was built leveraging the following technologies:
- **Frontend Framework:** [React 19](https://react.dev/) - For building the interactive user interface.
- **Routing:** [React Router v7](https://reactrouter.com/) - For handling navigation between different views (Login, Dashboards).
- **Build Tool:** [Vite](https://vitejs.dev/) - For ultra-fast development server and optimized production builds.
- **Icons:** [Lucide React](https://lucide.dev/) - For beautiful and consistent iconography across the app.
- **Linting:** [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) - For fast and reliable code linting.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
- `npm run build`: Bundles the app into static files for production.
- `npm run preview`: Serves the production build locally for testing.
- `npm run lint`: Runs the linter to catch potential issues in the codebase.
