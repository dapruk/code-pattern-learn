import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { CountdownWidget } from '../patterns/bloc/features/countdownComponent';

export const Route = createFileRoute('/bloc')({
  component: () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <ArrowLeft className="size-4" />
          Back to Hub
        </Link>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-12">
        <div className="mb-10 border-b border-slate-100 pb-8 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            BLoC Implementation
          </h2>
          <p className="mt-3 max-w-2xl text-slate-500">
            The timer below is driven entirely by an isolated TypeScript class.
            The UI knows nothing about how the timer works; it only dispatches
            events and listens to state changes.
          </p>
        </div>

        <div className="flex justify-center">
          <CountdownWidget />
        </div>
      </div>
    </div>
  ),
});
