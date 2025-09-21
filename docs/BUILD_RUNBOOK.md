# Build Runbook

This document provides instructions for setting up, building, and deploying the FutureTrack application.

## Local Development Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd FutureTrack
    ```

2.  **Install dependencies**:
    ```bash
    composer install
    npm install
    ```

3.  **Environment Configuration**:
    *   Copy the `.env.example` file to `.env`. Since `.env.example` is missing, you will need to create it based on the `Required Environment Variables` section below.
    *   Generate an application key:
        ```bash
        php artisan key:generate
        ```
    *   Configure your database and other services in the `.env` file.

4.  **Database Migration and Seeding**:
    ```bash
    php artisan migrate --seed
    ```

5.  **Run the development servers**:
    ```bash
    npm run dev
    ```
    This will start the Vite development server and the Laravel development server.

## EC2 Deployment Steps

1.  **Provision an EC2 instance**:
    *   Use a standard LAMP or LEMP stack image.
    *   Ensure PHP, Composer, Node.js, and a database (MySQL/Postgres) are installed.

2.  **Deploy the code**:
    *   Use a CI/CD pipeline (e.g., GitHub Actions, Jenkins) or a manual `git pull`.

3.  **Install dependencies**:
    ```bash
    composer install --optimize-autoloader --no-dev
    npm install --production
    ```

4.  **Environment Configuration**:
    *   Create a `.env` file and populate it with production-specific values.
    *   Do not commit the production `.env` file to the repository. Use a secure method for managing secrets (e.g., AWS Secrets Manager, HashiCorp Vault).

5.  **Build frontend assets**:
    ```bash
    npm run build
    ```

6.  **Run database migrations**:
    ```bash
    php artisan migrate --force
    ```

7.  **Optimize for production**:
    ```bash
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    ```

8.  **Configure web server**:
    *   Point the web server's document root to the `public` directory.
    *   Ensure the `storage` and `bootstrap/cache` directories are writable by the web server.

9.  **Set up queue workers**:
    *   Use a process manager like Supervisor to run `php artisan queue:work` commands.

10. **Set up scheduler**:
    *   Add a cron entry to run `php artisan schedule:run` every minute.

## Required Environment Variables

The following is a list of environment variables required by the application, based on the configuration files.

```dotenv
APP_NAME=FutureTrack
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=futuretrack
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
QUEUE_CONNECTION=database
SESSION_DRIVER=database
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1
```
