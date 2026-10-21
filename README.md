# ConnectUP — Frontend

**ConnectUP** is a full-stack event discovery and management platform developed as a Bachelor's thesis project at the Faculty of Mathematics and Computer Science, University of Bucharest.

This repository contains the **frontend**: a single-page application built with **React, TypeScript, and Material UI**. It communicates with a separate REST API to support event discovery, participation, event hosting, and community interactions.

## Tech stack

- **React** — component-based user interface
- **TypeScript** — typed application development
- **Material UI** — consistent UI components and styling
- **Google Maps API** — interactive event maps, location exploration, and directions
- **Stripe.js** — secure payment collection for paid events
- **REST API** — integration with the ConnectUP backend

## Key features

- **Account experience:** registration with email verification, login, password recovery, and profile management.
- **Role-aware navigation:** dedicated experiences for members and administrators.
- **Event discovery:** browse event cards, view event details, search by title, sort, and filter by tags, participation, paid/free status, and favorites.
- **Location-based discovery:** interactive map, nearby events within a selected area, and directions to event venues.
- **Participation:** join events, manage participation, and save favorites.
- **Event hosting:** create and manage events with descriptions, dates, locations, images, and tags.
- **Paid events:** checkout experience integrated with Stripe.js.
- **Community features:** event reviews, ratings, questions, and user mentions.
- **Event insights:** visual presentation of aggregated participant statistics for eligible organizers.

## Architecture

The frontend is a **single-page application (SPA)**. It renders the user interface and communicates with the backend REST API for authentication, business operations, and data persistence. The backend manages PostgreSQL data through Prisma and integrates with email, payments, and geocoding services.

```
React + TypeScript + Material UI
             |
             | REST API
             v
     ConnectUP Backend
             |
       PostgreSQL / Prisma
```

## Running locally

The application requires the separate **ConnectUP backend** to be configured and running.

```
npm install
```

Then configure the frontend's environment variables as required by the actual source code (particularly the backend API URL and any client-side Google Maps / Stripe publishable keys).

Run the development script defined in `package.json`: `npm run dev`


## Backend integration

This frontend is designed to work with the **ConnectUP Backend** repository.

https://github.com/RaresDDB/ConnectUP-backend

## Project context

Developed as an individual Bachelor's thesis project at the **University of Bucharest, Faculty of Mathematics and Computer Science**.

**Author:** Costin-Rareș-Călin Pârlea

