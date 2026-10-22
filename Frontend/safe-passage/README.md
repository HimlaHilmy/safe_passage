# Safe Passage

A travel-safety web app: report emergencies, discover nearby services, track case progress, request roadside assistance, and review operations in an admin dashboard.

## Stack
React 19 · Vite · React Router · Tailwind CSS v4 · Leaflet / React-Leaflet

## Getting started
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

## How it works (demo mode)
Reports and assistance requests are saved to the browser's `localStorage` (`src/caseStore.js`). The tracking page and admin dashboard read from the same store, so a submitted case can be looked up by its ID and moved through its lifecycle (Reported → Under Review → Assistance in Progress → Resolved).

Service Discovery markers use sample coordinates around Colombo and are not verified locations.

## Moving to production
Replace `caseStore.js` with API calls to a backend (the `Backend/` folder is ready for it), and protect `/admin` with authentication and role-based authorization.

## Structure
```
src/
  App.jsx / Navbar.jsx / Home.jsx
  EmergencyReporting.jsx, AssistanceDispatch.jsx   (config for CaseForm)
  CaseForm.jsx        shared report/request form
  CaseLifecycle.jsx   case tracking
  AdminDashboard.jsx  stats + status management
  ServiceDiscovery.jsx  map and service list
  caseStore.js        persistence layer
  ui.jsx              Page, Field, StatusBadge
```
