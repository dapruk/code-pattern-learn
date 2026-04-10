# Code Pattern Learn

## Project Overview

This repository serves as a professional sandbox for implementing and documenting advanced software architecture patterns within the React and TypeScript ecosystem. The primary objective is to move beyond standard component-level state management and toward a robust, enterprise-grade separation of concerns.

The project focuses on creating a development environment where business logic is entirely decoupled from the rendering cycle, allowing for high-velocity development and stable, predictable codebases.

---

## Core Principles

The project adheres to three strict architectural constraints:

1. **Pure React Components**: All UI components (Views) are strictly presentational. They operate as pure functions of their props, containing zero business logic, zero side effects, and no internal state management.
2. **Testable Logic**: Business logic is encapsulated in isolated TypeScript classes (BLoCs). These units are designed to be tested in a headless environment, ensuring the engine of the application works correctly without requiring a browser or a DOM.
3. **Strict Type Safety**: The codebase enforces a strict policy against the use of the `any` type. It leverages TypeScript's advanced type system, including Discriminated Unions and Utility Types, to ensure compile-time safety.

---

## Pattern Implementation: BLoC (Business Logic Component)

The first pattern explored is the BLoC pattern, utilizing a reactive approach to state management. This implementation uses a Smart-Dumb component split to ensure total isolation.

### Architectural Layers

1. **Logic Layer (CountdownBloc.ts)**
   - A plain TypeScript class that acts as the External Store.
   - Responsible for state transitions, interval management, and data formatting.
   - Includes private methods for state creation to ensure the UI receives ready-to-render data.

2. **View Layer (CountdownView.tsx)**
   - A pure React component.
   - Defines a strict interface for props (data and callbacks).
   - Responsible only for JSX structure and styling.

3. **Widget Layer (CountdownWidget.tsx)**
   - The Smart Connector or Glue.
   - Utilizes the `useBloc` hook to subscribe to the BLoC.
   - Maps BLoC actions and state to the View's props.

---

## Testing Strategy

By decoupling the engine from the dashboard, the project achieves maximum test coverage with minimal friction.

### Logic Testing

Targeted at the BLoC class. Tests verify state transitions and math using Vitest fake timers. These tests run in a pure Node environment.

- Path: `src/patterns/bloc/features/countdownBloc.test.ts`

---

## Technical Stack

- Framework: Vite, React 18
- Router: TanStack Router
- Icons: Lucide React
- Testing: Vitest, React Testing Library
- Styling: Tailwind CSS

---

## Scripts

- `npm run dev`: Start the development server.
- `npm test`: Run the test suite in watch mode.
- `npm run test:ui`: Open the interactive Vitest UI dashboard.
- `npm run build`: Generate the production build.
