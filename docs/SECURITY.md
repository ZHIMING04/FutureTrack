# Security

This document covers the security aspects of the FutureTrack application, including authentication, authorization, and other security measures.

## Authentication

*   **Flows**: The application does not appear to use a standard Laravel starter kit like Breeze or Jetstream for authentication. There are no explicit routes for login, registration, or password reset in `routes/web.php`. It is likely that user management is handled manually or through a custom implementation. The `users` table contains `password` and `remember_token` columns, suggesting a standard session-based authentication mechanism.
*   **Password Hashing**: Laravel's default `Hash` facade is used for password hashing, which uses bcrypt.

## Authorization

*   **Roles**: The `users` table has a `role` column with possible values `student`, `mentor`, and `admin`, indicating a role-based access control (RBAC) system.
*   **Policies & Gates**: There is no `AuthServiceProvider` and no policy files were found in `app/Policies`. Authorization logic may be implemented directly in the controllers or service classes. This is a potential area for improvement.

## Middleware

The following middleware are applied to the `web` route group, as defined in `bootstrap/app.php`:

*   `\App\Http\Middleware\HandleInertiaRequests`: Handles Inertia.js requests.

Standard Laravel middleware for encryption, CSRF protection, and session management are also applied by default.

## Known Risks & Recommendations

*   **Missing Authentication Routes**: The absence of standard authentication routes could indicate a custom, potentially less secure implementation. It's recommended to use a standard package like Laravel Fortify for authentication to ensure best practices are followed.
*   **Lack of Explicit Authorization**: Authorization logic appears to be missing or is not implemented using Laravel's Gates and Policies. This can lead to scattered authorization checks and make the application harder to maintain. It is recommended to implement policies for models that require access control.
*   **Mass Assignment**: Some models use `$guarded = []`, which can be risky if not handled carefully. It is better to use `$fillable` to explicitly define which attributes are mass assignable.
*   **Missing `.env.example` file**: This makes it difficult for new developers to set up the project and could lead to security issues if sensitive keys are not properly configured.
