# TODO & Backlog

This document lists prioritized tasks for improving the FutureTrack application, including refactoring, new features, and documentation gaps.

| Priority | Task | Category | Description |
| --- | --- | --- | --- |
| **High** | Implement Authentication | Security | The application is missing standard authentication routes and flows. Implement a robust authentication system using Laravel Fortify or a similar package. |
| **High** | Add Authorization Policies | Security | There is no explicit authorization logic. Implement Laravel Policies for models to control access to resources based on user roles. |
| **High** | Create a `.env.example` file | DX | The repository is missing a `.env.example` file, making it difficult for new developers to set up the project. |
| **Medium** | Write Feature and Unit Tests | Testing | The application has no tests. Start by writing feature tests for critical user flows and unit tests for models. |
| **Medium** | Refactor to use Service Classes | Architecture | Business logic is currently in controllers. Refactor to use service classes to improve code organization and reusability. |
| **Medium** | Add Frontend Tests | Testing | The React components are not tested. Introduce a testing framework like Jest and React Testing Library. |
| **Low** | Implement Real-time Features | Feature | Consider using Laravel Echo and Pusher for real-time notifications or chat features, if needed. |
| **Low** | Explore Global State Management | Frontend | For more complex frontend features, consider a global state management library like Zustand or Redux. |
