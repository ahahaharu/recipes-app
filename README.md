# Recipes App

A modern frontend SPA for browsing recipes, featuring real-time communication and GraphQL integration. The application demonstrates advanced state management, type-safe routing, and various data fetching techniques.

[View WebSite]()

## Features

* **Authentication:** User login flow using dummyjson auth.
* **Recipes Catalog:** Pagination and data fetching using TanStack Query.
* **Real-time Chat:** WebSocket integration for live messaging.
* **GraphQL Data:** Character explorer powered by Apollo Client and the Rick and Morty API.
* **Routing:** Type-safe file-based routing with TanStack Router.

## Tech Stack

* **Core:** React 19, TypeScript
* **Build Tool:** Vite
* **Routing:** TanStack Router (File-based, Type-safe)
* **State Management & Data Fetching:**
    * TanStack Query (REST API)
    * Apollo Client (GraphQL)
    * React Context API (Auth state)
* **Styling:** Emotion (CSS-in-JS)
* **Icons:** Lucide React
* **Linting:** ESLint, TypeScript-ESLint

## Getting Started

Follow these steps to set up the project locally.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ahahaharu/recipes-app.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd recipes-app
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Building for Production

To create an optimized production build:

```bash
npm run build
```

The output files will be generated in the dist/ directory.

Test Credentials
To test the authentication flow, use the following credentials:

  Username: emilys
  
  Password: emilyspass
