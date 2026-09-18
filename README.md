.AI Workplace companion

Project Overview

AI Workplace companion is a modern, responsive, frontend-only SaaS web application designed to help professionals improve workplace productivity with AI-powered tools.

The application provides a simple dashboard where users can generate professional emails, organise tasks into daily or weekly plans, and research or summarise information.

This project is intentionally designed without a backend, database, authentication, or persistent data storage. AI functionality is represented through frontend/mock responses for demonstration purposes.

Features Implemented

1. Smart Email Generator

Generate professional workplace emails.

Supports multiple writing tones:

Formal

Friendly

Persuasive

Accepts context, subject, and key points.

AI-generated output is editable.

Copy and clear actions are provided.

2. AI Task Planner

Create daily or weekly work schedules.

Add tasks, deadlines, priorities, and available working hours.

Prioritise tasks as:

High

Medium

Low

Displays generated schedules in an organised, editable format.

Includes copy, edit, and clear functionality.

3. AI Research Assistant

Research a topic using a simple prompt.

Paste article or text content for summarisation.

Enter a URL for the research workflow.

Provides:

Summary

Key insights

Recommendations

Generated results are editable.

Copy and clear actions are available.

URL processing is frontend-only and does not use a backend scraper or external API.

4. Modern Dashboard

SaaS-style dashboard interface.

Sidebar navigation.

Quick access to all three AI tools.

Responsive design for desktop, tablet, and mobile.

Clean cards, forms, buttons, and editable output areas.

Temporary mock activity data only; information is not persisted.

5. Responsible AI

The application includes a responsible AI disclaimer:

AI-generated content may contain errors or omissions. Review and verify important information before using it. Do not enter confidential or sensitive workplace information.

Technologies and Tools Used

Lovable — Application development and frontend generation.

React — User interface development.

TypeScript — Type-safe application logic.

Vite — Frontend development and build tooling.

Tailwind CSS — Responsive styling and UI design.

Lucide Icons — Interface icons.

Mock AI Responses — Demonstration of AI-generated outputs without external AI APIs.

Git/GitHub — Optional source-code version control and project hosting.

Design System

The application uses a clean and professional SaaS visual style.

Primary colour: Burgundy red

Secondary colour: Black

Supporting colours: White and neutral shades

Responsive layouts

Modern typography

Subtle hover and focus states

Accessible and easy-to-use forms

Professional dashboard components

Setup Instructions

Prerequisites

Ensure you have the following installed:

Node.js

npm

Git (optional)

1. Clone the Project

git clone <repository-url>
cd <project-folder>

If the project was exported from Lovable, download/export the project files first and open the project directory in your terminal.

2. Install Dependencies

npm install

3. Start the Development Server

npm run dev

The terminal will provide a local development URL, typically similar to:

http://localhost:5173

Open the provided URL in a web browser.

4. Create a Production Build

npm run build

5. Preview the Production Build

npm run preview

Data and Backend

This version of the application does not include:

Backend services

Database

Authentication

User accounts

Persistent storage

External AI API integrations

Server-side URL scraping

Generated content and activity are intended for temporary frontend demonstration only.

Project Goal

The goal of this project is to demonstrate a professional AI productivity SaaS experience while keeping the application lightweight, simple, and frontend-only.

Future versions could integrate real AI APIs, authentication, secure data storage, saved productivity plans, research history, document processing, and team collaboration.
