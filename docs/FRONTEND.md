# Frontend

This document describes the frontend architecture of the FutureTrack application, which is built using React and Inertia.js.

## Component Tree

The frontend is structured into pages, layouts, and reusable components.

*   **Pages (`resources/js/Pages/`)**: Each file corresponds to a specific page rendered by a controller.
*   **Layouts (`resources/js/Layout/`)**: Defines the main application shell, including the header and sidebar. The primary layout is `MainLayout.jsx`.
*   **Components (`resources/js/Component/`)**: Reusable components are organized by feature (e.g., `Dashboard`, `Profile`, `Course`).

### Page to Route Mapping

| Inertia Page (`resources/js/Pages/`) | Laravel Route | Controller Action |
| --- | --- | --- |
| `Home.jsx` | `GET /` | `Closure` |
| `Dashboard.jsx` | `GET /dashboard` | `DashboardController@index` |
| `MyProfile.jsx` | `GET /my-profile` | `MyProfileController@index` |
| `InterestAssessment.jsx` | `GET /interest-assessment` | `InterestAssessmentController@index` |
| `CareerExplorer.jsx` | `GET /career-explorer` | `CareerExplorerController@index` |
| `PathwayPlanner.jsx` | `GET /pathway-planner` | `PathwayPlannerController@index` |
| `WhatIfSimulator.jsx` | `GET /what-if-simulator` | `WhatIfSimulatorController@index` |
| `MyRoadmap.jsx` | `GET /my-roadmap` | `MyRoadmapController@index` |
| `ApplicationsDeadlines.jsx` | `GET /applications-deadlines` | `ApplicationsDeadlinesController@index` |
| `Courses.jsx` | `GET /courses` | `CoursesController@index` |
| `MentorsGuidance.jsx` | `GET /mentors-guidance` | `MentorsGuidanceController@index` |
| `Resources.jsx` | `GET /resources` | `ResourcesController@index` |
| `Settings.jsx` | `GET /settings` | `SettingsController@index` |

## State Management

State management primarily relies on:

*   **Inertia's `usePage` hook**: Used to access shared data from Laravel (e.g., authenticated user, flash messages).
*   **React's local state (`useState`)**: For managing component-level state.
*   **Props drilling**: For passing data between nested components.

No global state management library (e.g., Redux, Zustand) is currently in use.

## Forms & API Interaction

*   **Forms**: Handled using Inertia's `useForm` hook, which provides helpers for managing form state, validation errors, and submission.
*   **API Interaction**: Most data is loaded via Inertia's initial page load and subsequent navigation. For client-side API calls (e.g., in the What-If Simulator), `axios` is used.

## Vite Configuration (`vite.config.js`)

The frontend assets are compiled using Vite. The configuration includes:

*   **Laravel Plugin**: Integrates Vite with the Laravel backend.
*   **React Plugin**: Enables React support with Fast Refresh.
*   **Tailwind CSS**: The `@tailwindcss/vite` plugin is used for compiling Tailwind CSS.
*   **Input Files**: `resources/css/app.css` and `resources/js/app.jsx` are the main entry points.
*   **Hot Module Replacement (HMR)**: Enabled for a better development experience.
