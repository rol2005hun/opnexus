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

## Current Story: "The Internal Leak"

The first investigation involves finding an internal employee who is leaking confidential documents to external parties. Evidence includes:
- Suspicious emails between employees and external contacts
- Chat messages coordinating document transfers
- File access logs showing unauthorized downloads
- Financial transactions indicating payments

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