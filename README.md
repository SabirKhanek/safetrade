# End to End Typesafe Fullstack SPA Monorepo

This project is an end-to-end, typesafe fullstack Single Page Application (SPA) housed within a monorepo architecture. It leverages React for the frontend and Nest.js for the backend.

## Commands

- `npm run dev`: Initiates the development environment.
- `npm run build`: Builds the project.
- Once built, the server will host the SPA on the root route.
- Server documentation is accessible at [http://localhost:3000/docs](http://localhost:3000/docs).
- During development, the SPA can be accessed at [http://localhost:5173](http://localhost:5173). Relative API calls are configured to be proxied to port 3000 server.

## Technologies Used

- **Frontend**:
  - React with `@ts-rest/react-query` for typesafety.
  - Tailwind CSS is configured for styling.

- **Backend**:
  - Nest.js framework.

This setup ensures a seamless development experience for both frontend and backend, with comprehensive documentation available for the server APIs. 

npm install -D tailwindcss postcss autoprefixer