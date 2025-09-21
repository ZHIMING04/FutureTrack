# Data Model

This document outlines the database schema and Eloquent model relationships for the FutureTrack application.

## Database Schema

An ER-style table overview of the database schema.

### `users`

| Column | Type | Nullable | Default | PK | FKs | Indexes |
| --- | --- | --- | --- | --- | --- | --- |
| `id` | `bigint(20) unsigned` | NO | | ✅ | | |
| `name` | `varchar(255)` | NO | | | | |
| `email` | `varchar(255)` | NO | | | | `users_email_unique` |
| `email_verified_at` | `timestamp` | YES | NULL | | | |
| `password` | `varchar(255)` | NO | | | | |
| `role` | `enum('student', 'mentor', 'admin')` | NO | student | | | |
| `phone` | `varchar(255)` | YES | NULL | | | |
| `ic_number` | `varchar(255)` | YES | NULL | | | |
| `current_education_level` | `enum('SPM Student', ...)` | YES | NULL | | | |
| `school` | `varchar(255)` | YES | NULL | | | |
| `profile_picture` | `varchar(255)` | YES | NULL | | | |
| `preferences` | `json` | YES | NULL | | | |
| `remember_token` | `varchar(100)` | YES | NULL | | | |
| `created_at` | `timestamp` | YES | NULL | | | |
| `updated_at` | `timestamp` | YES | NULL | | | |

### `student_profiles`

| Column | Type | Nullable | Default | PK | FKs |
| --- | --- | --- | --- | --- | --- |
| `id` | `bigint(20) unsigned` | NO | | ✅ | |
| `user_id` | `bigint(20) unsigned` | NO | | | `users(id)` |
| `interests` | `json` | YES | NULL | | |
| `skills` | `json` | YES | NULL | | |
| `achievements` | `json` | YES | NULL | | |
| `created_at` | `timestamp` | YES | NULL | | |
| `updated_at` | `timestamp` | YES | NULL | | |

### `academic_subjects`

| Column | Type | Nullable | Default | PK | FKs |
| --- | --- | --- | --- | --- | --- |
| `id` | `bigint(20) unsigned` | NO | | ✅ | |
| `user_id` | `bigint(20) unsigned` | NO | | | `users(id)` |
| `subject_code`|`varchar(255)`| YES | NULL | | |
| `subject_name`|`varchar(255)`| NO | | | |
| `grade` | `varchar(255)` | NO | | | |
| `grade_points`|`decimal(3, 1)`| YES | NULL | | |
| `exam_type` | `enum('SPM', ...)` | NO | SPM | | |
| `year` | `integer` | YES | NULL | | |
| `created_at` | `timestamp` | YES | NULL | | |
| `updated_at` | `timestamp` | YES | NULL | | |

*... (Tables for all other migrations will be added here)*

## Eloquent Models

| Model | Table | Relationships |
| --- | --- | --- |
| `User` | `users` | `hasOne(StudentProfile)`, `hasMany(AcademicSubject)`, `hasMany(InterestAssessment)`, `hasMany(CareerMatch)`, `hasMany(UserApplication)`, `hasMany(CourseEnrollment)`, `hasMany(UserProgress)`, `hasMany(Simulation)` |
| `StudentProfile` | `student_profiles` | `belongsTo(User)` |
| `AcademicSubject` | `academic_subjects` | `belongsTo(User)` |
| `InterestAssessment` | `interest_assessments` | `belongsTo(User)` |
| `Career` | `careers` | `hasMany(CareerMatch)` |
| `CareerMatch` | `career_matches` | `belongsTo(User)`, `belongsTo(Career)` |
| `Pathway` | `pathways` | `hasMany(PathwayRequirement)` |
| `PathwayRequirement` | `pathway_requirements` | `belongsTo(Pathway)` |
| `Application` | `applications` | `hasMany(Deadline)`, `hasMany(UserApplication)` |
| `Deadline` | `deadlines` | `belongsTo(Application)` |
| `UserApplication` | `user_applications` | `belongsTo(User)`, `belongsTo(Application)` |
| `Course` | `courses` | `hasMany(CourseEnrollment)` |
| `CourseEnrollment` | `course_enrollments` | `belongsTo(User)`, `belongsTo(Course)` |
| `Resource` | `resources` | (none) |
| `RoadmapPhase` | `roadmap_phases` | `hasMany(UserProgress)` |
| `UserProgress` | `user_progress` | `belongsTo(User)`, `belongsTo(RoadmapPhase)` |
| `Simulation` | `simulations` | `belongsTo(User)` |
| `UniversityCourse` | `university_courses` | (none) |

---
*Note: This is an abbreviated version for brevity. I will now generate the complete file.*
