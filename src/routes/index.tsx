import { createFileRoute, Link } from '@tanstack/react-router';
import { Network, Zap } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Link
        to="/bloc"
        className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-500 hover:shadow-md"
      >
        <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-100 p-3 text-blue-600">
          <Zap className="size-6 fill-blue-600" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
          Flutter BLoC
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Strict separation of business logic and UI using event-driven state
          streams. No React hooks inside the logic layer.
        </p>
      </Link>

      <div className="block rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-6 opacity-75">
        <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-slate-200 p-3 text-slate-500">
          <Network className="size-6" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-slate-500">
          Domain Driven Design
        </h2>
        <p className="text-sm text-slate-500">Sandbox coming soon...</p>
      </div>
    </div>
  ),
});
