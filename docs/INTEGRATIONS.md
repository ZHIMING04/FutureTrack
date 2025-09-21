# Integrations

This document outlines the third-party services and integrations used in the FutureTrack application.

## Pusher/Echo

*   **Status**: Not implemented.
*   **Details**: There is no `config/broadcasting.php` file, and no usage of Pusher or Laravel Echo was found in the codebase. Real-time features are not currently a part of the application.

## Mail Services

*   **Default Driver**: `log`
*   **Configuration**: The application is configured to support `smtp`, `ses`, `postmark`, and `resend`.
*   **Usage**: No specific mailer is hardcoded in the application. The default `log` driver is used for development, and a different driver can be specified in the `.env` file for production.

## Queue Services

*   **Default Driver**: `database`
*   **Configuration**: The application is configured to support `sync`, `database`, `beanstalkd`, `sqs`, and `redis`.
*   **Usage**: No specific queue connection is hardcoded. The application uses the default connection specified in the `.env` file.

## Storage

*   **Default Driver**: `local`
*   **Configuration**: The application is configured to use the `local` disk for public and private files, and also has a configuration for `s3`.
*   **Usage**: No evidence of `s3` disk usage was found in the application code. File storage currently relies on the local filesystem.

## AWS Integration

The application includes the AWS SDK for PHP (`aws/aws-sdk-php`) and has configuration files set up for S3, SES, and SQS, but there is no active usage of these services found within the application code.

*   **S3**: Configured in `config/filesystems.php`, but not used.
*   **SES**: Configured in `config/mail.php` and `config/services.php`, but not used.
*   **SQS**: Configured in `config/queue.php`, but not used.
*   **Bedrock**: No evidence of AWS Bedrock integration was found.

---
*This document will be updated as new integrations are added.*
