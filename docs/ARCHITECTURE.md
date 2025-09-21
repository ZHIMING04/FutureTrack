# Architecture

This document provides a high-level overview of the FutureTrack application's architecture.

## System Diagram

```
+----------------+      +-----------------+      +-----------------+
|   React (FE)   |----->| Inertia.js (JS) |----->| Laravel (BE)    |
+----------------+      +-----------------+      +-----------------+
       |                      ^                            |
       | (Renders Pages)      | (Adapter)                  | (Handles Requests)
       v                      |                            v
+----------------+      +-----------------+      +-----------------+
|   Browser      |<-----|   Controllers   |<-----| Routes          |
+----------------+      +-----------------+      +-----------------+
                              |
                              v
+----------------+      +-----------------+
|   Services     |----->|   Models        |
+----------------+      +-----------------+
                              |
                              v
+----------------+      +-----------------+
|   Database     |      |   Queues/Events | (Not Used)
+----------------+      +-----------------+
```

## Tech Stack

| Category | Technology | Version | Notes |
| --- | --- | --- | --- |
| Backend | PHP | ^8.2 | |
| | Laravel | ^12.0 | |
| Frontend | React | ^19.1.1 | |
| | Inertia.js | ^2.1.7 | React Adapter |
| | Vite | ^6.2.4 | |
| | Tailwind CSS | ^4.0.0 | |
| Database | (Not specified) | | Configured for MySQL, PostgreSQL, SQLite |
| Server | (Not specified) | | Designed for Nginx/Apache with PHP-FPM |

## Module Boundaries and Data Flow

1.  **Client (Browser)**: The user interacts with the React frontend running in the browser.
2.  **Inertia.js**: Acts as an adapter between the Laravel backend and the React frontend. It allows for building a single-page application using classic server-side routing.
3.  **Laravel Backend**:
    *   **Routes**: Define the application's endpoints.
    *   **Controllers**: Handle incoming HTTP requests, interact with services and models, and return Inertia responses.
    *   **Services**: (Not explicitly found, but a good practice) Contain business logic.
    *   **Models**: Represent the database tables and their relationships.
4.  **Database**: The primary data store for the application.

## Deployment

The application is designed to be deployed on an AWS EC2 instance running a standard LEMP/LAMP stack. The deployment process involves:
*   Installing dependencies with Composer and npm.
*   Building frontend assets with Vite.
*   Running database migrations.
*   Configuring a web server (Nginx/Apache) and a process manager (Supervisor) for queue workers.
