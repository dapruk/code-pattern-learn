import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-200">
      <div className="mx-auto max-w-5xl p-6 sm:p-10">
        <header className="mb-10 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Architecture Playground
          </h1>
          <p className="mt-2 text-lg text-slate-500">
            Exploring state management and design patterns in React.
          </p>
        </header>

        <main>
          <Outlet />
        </main>
      </div>

      <TanStackRouterDevtools position="bottom-right" />
    </div>
  ),
});
