# Project Overview

This is a React-based web application built with Vite and styled with Tailwind CSS. The application appears to be a landing page for a service called "Urbanspell ABM Academy," which offers coaching and training for B2B marketing and sales.

The main page (`src/App.tsx`) is a comprehensive single-page layout that includes:
- A hero section with a call-to-action.
- Client testimonials and success stories.
- Detailed information about the program, including what's included, who it's for, and a program snapshot.
- An action-based guarantee with a downloadable scorecard.
- Pricing information for different tiers of the service.
- An FAQ section.
- A footer with contact information.

The project uses `lucide-react` for icons and has interactive elements like a testimonial slider and an FAQ accordion.

# Building and Running

To work with this project, you need to have Node.js and npm (or a compatible package manager) installed.

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    This will start a local development server, and you can view the application in your browser at the address provided in the console.

3.  **Build for Production:**
    ```bash
    npm run build
    ```
    This will create a `dist` directory with the optimized, static assets for the application.

4.  **Lint the Code:**
    ```bash
    npm run lint
    ```
    This will run ESLint to check for code quality and style issues.

5.  **Preview the Production Build:**
    ```bash
    npm run preview
    ```
    This will serve the `dist` directory, allowing you to preview the production build locally.

# Development Conventions

*   **Styling:** The project uses Tailwind CSS for styling. Customizations to the theme are defined in `tailwind.config.js`.
*   **Components:** The main application logic is contained within the `src/App.tsx` file.
*   **Dependencies:** The project uses `react`, `react-dom`, `lucide-react`, and `@supabase/supabase-js`. Development dependencies include `vite`, `typescript`, `eslint`, and `tailwindcss`.
*   **Build Tool:** Vite is used as the build tool and development server. The configuration is in `vite.config.ts`.
