# NEXUS - Digital Investigation Agency Game

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a Nuxt 3 TypeScript project for creating an FBI-style investigation game called "NEXUS - Digital Investigation Agency". The game simulates a laptop environment where players can investigate different cases by exploring emails, messages, files, and other digital evidence.

## Tech Stack

- **Framework**: Nuxt 3 with TypeScript
- **Styling**: SCSS with custom variables
- **State Management**: Pinia
- **Fonts**: Inter (UI) and JetBrains Mono (code/terminal)

## Project Structure

- `stores/` - Pinia stores for game state and laptop simulation
- `components/` - Vue components for laptop apps and UI elements
- `pages/` - Main game pages
- `assets/scss/` - Global styles and variables

## Key Features

1. **Story Selection**: Main menu with different investigation cases
2. **Laptop Simulation**: Full desktop environment with apps, taskbar, and windows
3. **Email Investigation**: Email client with suspicious communications
4. **Message Analysis**: Chat application with evidence
5. **File Exploration**: Document and evidence management
6. **Window Management**: Draggable, resizable windows like a real OS

## Current Stories

### Available Stories:
- **the-internal-leak**: Corporate espionage investigation at defense contractor (Nexus-Corp Industries)
- **banking-fraud-investigation**: Sophisticated fraud scheme at City National Bank involving cryptocurrency laundering

### Story Development:
- **Story Documentation**: Complete story creation guide available in `stories/README.md`
- **Story Structure**: Each story has its own folder with characters.ts, emails.ts, chats.ts, files.ts, and index.ts
- **Story Registry**: All stories must be registered in `utils/storyRegistry.ts` for dynamic loading
- **Story IDs**: Must match between game store, story registry, and story content files

## Application Names

### Current Laptop Applications:
- **Email**: Standard email client
- **CipherChat**: Encrypted messaging application (formerly Chat)
- **File Explorer**: Document and file management
- **Browser**: Nexium web browser
- **JobDescription**: Investigation briefing and case details (formerly Notes)
- **EvidenceLocker**: Evidence collection and analysis (formerly Evidence)

## Component Guidelines

- Use SCSS variables from `variables.scss` 
- Follow the established color scheme (dark theme with blue accents: #007acc)
- Maintain realistic laptop/desktop UI patterns
- Include proper TypeScript interfaces
- Use Pinia stores for state management
- Implement proper window management (draggable, resizable, maximize/minimize)
- Follow modern Vue 3 Composition API patterns

## Styling Guidelines

- Dark theme with professional investigation agency aesthetics
- Primary color: #007acc (accent blue)
- Use CSS Grid and Flexbox for layouts
- Include hover effects and smooth transitions
- Mobile responsive design
- Consistent spacing and typography
- Use modern SCSS features (@use, @forward)
- Proper list styling with adequate padding and indentation

## Development Guidelines

- Use TypeScript for all components and stores
- Implement proper error handling
- Follow Vue 3 best practices
- Use semantic HTML elements
- Ensure accessibility compliance
- Write clean, maintainable code
- Minimal comments: Only add comments for complex logic, not self-explanatory code
- Use English comments when necessary
- Avoid redundant comments that restate what the code already shows
- Focus on self-documenting code with clear variable and function names

## Testing Guidelines

- **Browser Testing**: User handles all browser testing and preview responsibilities
- **Development Server**: Use VS Code tasks to run development server
- **Tool Usage**: Do not use `open_simple_browser` tool - user manages browser interactions
- **Feedback Loop**: User will provide testing feedback and report any issues found during browser testing

## Code Style Guidelines

- **Semicolons**: Always use semicolons (`;`) at the end of statements, except after closing braces (`}`)
- **Import Paths**: Use `@/` alias instead of `~/` (Nuxt 3 default) for import paths (e.g., `@/stores/game`, `@/components/...`)
- **Examples**:
  - ✅ `const x = 5;`
  - ✅ `import { ref } from 'vue';`
  - ✅ `import { useGameStore } from '@/stores/game';`
  - ✅ `import LaptopScreen from '@/components/LaptopScreen.vue';`
  - ✅ `if (condition) { doSomething(); }`
  - ❌ `const x = 5` (missing semicolon)
  - ❌ `import { useGameStore } from '@/stores/game';` (use ~/ instead)
  - ❌ `}; // after closing brace` (unnecessary semicolon)

## Programming Principles & Design Guidelines

### Clean Code Principles
- **Meaningful Names**: Use descriptive, intention-revealing names for variables, functions, and classes
- **Functions**: Keep functions small, focused on single responsibility, and avoid side effects
- **Comments**: Minimize comments by writing self-documenting code; only comment complex business logic
- **Formatting**: Maintain consistent horizontal and vertical formatting (newspaper metaphor)
- **Error Handling**: Use proper exception handling, avoid null returns and null parameters

### Object-Oriented Design Principles
- **DRY (Don't Repeat Yourself)**: Eliminate code duplication through abstraction and reusable components
- **KISS (Keep It Simple, Stupid)**: Prefer simple, straightforward solutions over complex ones
- **YAGNI (You Aren't Gonna Need It)**: Don't implement features until they are actually needed
- **Loose Coupling**: Minimize dependencies between components and modules
- **High Cohesion**: Group related functionality together in well-defined modules

### SOLID Principles
- **Single Responsibility Principle (SRP)**: Each class/component should have only one reason to change
- **Open/Closed Principle (OCP)**: Software entities should be open for extension, closed for modification
- **Liskov Substitution Principle (LSP)**: Objects should be replaceable with instances of their subtypes
- **Interface Segregation Principle (ISP)**: Many client-specific interfaces are better than one general-purpose interface
- **Dependency Inversion Principle (DIP)**: Depend on abstractions, not concretions

### Design Patterns & Architecture
- **MVC Pattern**: Separate concerns with Model-View-Controller architecture (Nuxt follows this pattern)
- **Observer Pattern**: Use reactive programming patterns (Vue's reactivity system)
- **Factory Pattern**: Use factory functions for object creation when appropriate
- **Decorator Pattern**: Enhance functionality without modifying original classes
- **Composition over Inheritance**: Prefer component composition over class inheritance

### Code Quality & Anti-patterns
- **Avoid God Objects**: Prevent classes that know/do too much
- **Avoid Spaghetti Code**: Maintain clear structure and logical flow
- **Avoid Magic Numbers**: Use named constants instead of hardcoded values
- **Avoid Long Parameter Lists**: Use configuration objects or builder patterns
- **Avoid Deep Nesting**: Use early returns and guard clauses to reduce complexity

### TypeScript Best Practices
- **Strong Typing**: Use explicit types, avoid `any` type
- **Interface Segregation**: Create specific interfaces for different use cases
- **Type Guards**: Use type guards for runtime type checking
- **Generic Types**: Use generics for reusable type-safe components
- **Null Safety**: Handle undefined/null cases explicitly