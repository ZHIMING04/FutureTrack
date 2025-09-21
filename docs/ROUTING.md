# Routing

This document details the application's routes, including web routes, API endpoints, and broadcasting channels.

## Web Routes (`routes/web.php`)

| Method | URI | Controller@Action | Middleware | Returns |
| --- | --- | --- | --- | --- |
| `GET` | `/` | `Closure` | `web` | `Inertia('Home')` |
| `GET` | `/dashboard` | `DashboardController@index` | `web` | `Inertia` |
| `GET` | `/my-profile` | `MyProfileController@index` | `web` | `Inertia` |
| `PUT` | `/my-profile` | `MyProfileController@update` | `web` | (Redirect) |
| `GET` | `/interest-assessment` | `InterestAssessmentController@index` | `web` | `Inertia` |
| `POST` | `/interest-assessment` | `InterestAssessmentController@store` | `web` | (Redirect) |
| `GET` | `/career-explorer` | `CareerExplorerController@index` | `web` | `Inertia` |
| `POST` | `/career-explorer/set-primary-goal` | `CareerExplorerController@setPrimaryGoal` | `web` | (Redirect) |
| `GET` | `/pathway-planner` | `PathwayPlannerController@index` | `web` | `Inertia` |
| `GET` | `/what-if-simulator` | `WhatIfSimulatorController@index` | `web` | `Inertia` |
| `POST` | `/what-if-simulator/simulate` | `WhatIfSimulatorController@simulate` | `web` | (JSON Response) |
| `POST` | `/what-if-simulator/save` | `WhatIfSimulatorController@save` | `web` | (Redirect) |
| `GET` | `/my-roadmap` | `MyRoadmapController@index` | `web` | `Inertia` |
| `PUT` | `/my-roadmap/update-progress` | `MyRoadmapController@updateProgress` | `web` | (Redirect) |
| `GET` | `/applications-deadlines` | `ApplicationsDeadlinesController@index` | `web` | `Inertia` |
| `PUT` | `/applications-deadlines/update-application` | `ApplicationsDeadlinesController@updateApplication` | `web` | (Redirect) |
| `GET` | `/courses` | `CoursesController@index` | `web` | `Inertia` |
| `POST` | `/courses/enroll` | `CoursesController@enroll` | `web` | (Redirect) |
| `PUT` | `/courses/update-progress` | `CoursesController@updateProgress` | `web` | (Redirect) |
| `GET` | `/mentors-guidance` | `MentorsGuidanceController@index` | `web` | `Inertia` |
| `POST` | `/mentors-guidance/send-message` | `MentorsGuidanceController@sendMessage` | `web` | (Redirect) |
| `GET` | `/resources` | `ResourcesController@index` | `web` | `Inertia` |
| `GET` | `/resources/{id}` | `ResourcesController@view` | `web` | `Inertia` |
| `GET` | `/resources/{id}/download` | `ResourcesController@download` | `web` | (File Download) |
| `GET` | `/settings` | `SettingsController@index` | `web` | `Inertia` |
| `PUT` | `/settings/profile` | `SettingsController@updateProfile` | `web` | (Redirect) |
| `PUT` | `/settings/preferences` | `SettingsController@updatePreferences` | `web` | (Redirect) |
| `PUT` | `/settings/password` | `SettingsController@updatePassword` | `web` | (Redirect) |
| `DELETE`| `/settings/delete-account` | `SettingsController@deleteAccount` | `web` | (Redirect) |

## API Routes (`routes/api.php`)

(none found)

## Broadcast Channels (`routes/channels.php`)

(none found)
