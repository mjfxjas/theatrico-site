# Theatrico Site - GitHub Copilot Instructions

## Project Overview

Theatrico is a professional theater and film production company website built with React and Vite. It showcases services in theater production, film services, team profiles, and includes a portfolio section featuring technical projects. The site uses modern animations and responsive design.

## Tech Stack

### Core Framework
- **React 19.1.1**: UI library with modern features
- **Vite 7.1.7**: Fast build tool and development server
- **React Router DOM 7.9.3**: Client-side routing

### Styling & Animation
- **Framer Motion 12.23.22**: Animation library for smooth transitions
- **CSS Modules**: Scoped styling (default Vite setup)

### Authentication & Security
- **OIDC Client TS 3.3.0**: OpenID Connect client
- **React OIDC Context 3.3.0**: React integration for OIDC

### Development Tools
- **ESLint 9.36.0**: Code linting
- **TypeScript 5.x**: Type checking (via @types packages)
- **Vite React Plugin**: React integration

## Code Patterns & Conventions

### Component Structure
```tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ComponentProps {
  title: string;
  children: React.ReactNode;
}

export const Component: React.FC<ComponentProps> = ({ title, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>{title}</h1>
      {children}
    </motion.div>
  );
};
```

### Routing Setup
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film" element={<Film />} />
        <Route path="/people" element={<People />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Animation Patterns
```tsx
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
</motion.div>
```

### OIDC Authentication
```tsx
import { useAuth } from 'react-oidc-context';

const ProtectedComponent = () => {
  const auth = useAuth();

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Error: {auth.error.message}</div>;
  if (!auth.isAuthenticated) {
    auth.signinRedirect();
    return null;
  }

  return <div>Welcome, {auth.user?.profile.name}!</div>;
};
```

## Development Workflow

### Setup
```bash
npm install
npm run dev  # Development server on localhost:5173
```

### Build & Deploy
```bash
npm run build  # Production build to dist/
npm run preview  # Preview production build
npm run lint  # ESLint checking
```

### SPA Route Creation
```bash
npm run build  # Includes custom script for SPA routing
```

## Common Tasks

### Adding New Pages
1. Create component in `src/pages/` or `src/components/`
2. Add route to main App component
3. Update navigation links in Layout component
4. Add to sitemap and meta tags

### Adding Animations
1. Import motion components from framer-motion
2. Define animation variants
3. Apply to JSX elements with initial/animate props
4. Test performance impact on mobile devices

### Managing Media Assets
1. Place videos/images in `public/` directory
2. Use relative paths in components
3. Optimize file sizes for web delivery
4. Add fallbacks for missing media

## Important Notes

- **SPA Architecture**: Single-page application with client-side routing
- **Video Backgrounds**: Heavy use of cinematic video backgrounds - optimize for performance
- **Responsive Design**: Mobile-first approach with breakpoint considerations
- **Portfolio Integration**: Links to external projects (update paths for deployment)
- **Authentication**: OIDC integration for protected areas (if implemented)
- **Build Process**: Custom script creates index files for SPA routing

## Code Style

- Use TypeScript for all new components
- Follow React functional component patterns
- Use Framer Motion for all animations
- Implement proper error boundaries
- Use semantic HTML elements
- Follow ESLint rules and auto-fix
- Use descriptive prop names and interfaces