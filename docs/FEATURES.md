# Features

This document lists the main features of the FutureTrack application, derived from the available routes and controllers.

## Core Features

| Feature | User Roles | Acceptance Criteria | Primary Routes/Pages |
| --- | --- | --- | --- |
| **Dashboard** | `student` | View a summary of progress, upcoming deadlines, and quick actions. | `GET /dashboard` (`Dashboard.jsx`) |
| **My Profile** | `student` | View and edit personal and academic information. | `GET /my-profile`, `PUT /my-profile` (`MyProfile.jsx`) |
| **Interest Assessment** | `student` | Answer a series of questions to determine interests and skills. | `GET /interest-assessment`, `POST /interest-assessment` (`InterestAssessment.jsx`) |
| **Career Explorer** | `student` | Explore different careers, view details, and set a primary career goal. | `GET /career-explorer`, `POST /career-explorer/set-primary-goal` (`CareerExplorer.jsx`) |
| **Pathway Planner** | `student` | View and compare different educational pathways. | `GET /pathway-planner` (`PathwayPlanner.jsx`) |
| **What-If Simulator** | `student` | Simulate admission likelihood based on different academic scenarios. | `GET /what-if-simulator`, `POST /what-if-simulator/simulate` (`WhatIfSimulator.jsx`) |
| **My Roadmap** | `student` | View a personalized roadmap with phases and tasks, and update progress. | `GET /my-roadmap`, `PUT /my-roadmap/update-progress` (`MyRoadmap.jsx`) |
| **Applications & Deadlines** | `student` | Track university applications and important deadlines. | `GET /applications-deadlines` (`ApplicationsDeadlines.jsx`) |
| **Courses** | `student` | Browse and enroll in courses to develop new skills. | `GET /courses`, `POST /courses/enroll` (`Courses.jsx`) |
| **Mentors & Guidance** | `student` | Get guidance from mentors and an AI advisor. | `GET /mentors-guidance` (`MentorsGuidance.jsx`) |
| **Resources** | `student` | Access a library of articles, guides, and videos. | `GET /resources` (`Resources.jsx`) |
| **Settings** | `student` | Manage account settings, including profile, preferences, and security. | `GET /settings`, `PUT /settings/*` (`Settings.jsx`) |

## User Flows

### 1. Onboarding & Assessment
1.  A new `student` registers for an account (registration flow is not explicitly defined).
2.  The student navigates to the **Interest Assessment** page.
3.  The student answers a series of questions.
4.  The system saves the assessment results.

### 2. Career Exploration
1.  The student goes to the **Career Explorer** page.
2.  The system displays a list of careers, potentially filtered based on the assessment results.
3.  The student can view details for each career.
4.  The student can set a primary career goal.

### 3. Pathway & Roadmap Planning
1.  The student visits the **Pathway Planner** to see different educational routes.
2.  The student uses the **What-If Simulator** to check their admission chances.
3.  Based on their goals, a personalized roadmap is available on the **My Roadmap** page.
4.  The student can track their progress through the roadmap's phases and tasks.
