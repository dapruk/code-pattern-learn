import {
  AlertCircle,
  Minus,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Timer,
} from 'lucide-react';
import { CountdownState } from '../countdown.types';

interface CountdownViewProps {
  state: CountdownState;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onAddTime: (seconds: number) => void;
  onSubtractTime: (seconds: number) => void;
}

export const CountdownView = ({
  state,
  onStart,
  onPause,
  onReset,
  onAddTime,
  onSubtractTime,
}: CountdownViewProps) => {
  return (
    <div className="flex w-full max-w-md flex-col items-center rounded-2xl bg-slate-50 p-8 shadow-inner ring-1 ring-slate-200 sm:p-10">
      <div className="mb-4 flex items-center gap-2 text-slate-400">
        <Timer className="size-5" />
        <span className="text-sm font-semibold tracking-widest uppercase">
          Focus Session
        </span>
      </div>

      <div className="mb-8 font-mono text-7xl font-extrabold tracking-tight text-slate-800 sm:text-8xl">
        {state.formattedTime}
      </div>

      {/* Time Adjustment Controls */}
      <div className="mb-8 flex items-center gap-4 rounded-full bg-white p-2 shadow-sm ring-1 ring-slate-200">
        <button
          onClick={() => {
            onSubtractTime(10);
          }}
          className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 active:bg-slate-300"
        >
          <Minus className="size-5" strokeWidth={2.5} />
        </button>
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Adjust
        </span>
        <button
          onClick={() => {
            onAddTime(10);
          }}
          className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 active:bg-slate-300"
        >
          <Plus className="size-5" strokeWidth={2.5} />
        </button>
      </div>

      {/* Main Playback Controls */}
      <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid">
        {(state.status === 'initial' || state.status === 'paused') && (
          <button
            onClick={onStart}
            className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            <Play className="size-5 fill-current" />
            {state.status === 'paused' ? 'Resume' : 'Start Timer'}
          </button>
        )}

        {state.status === 'running' && (
          <button
            onClick={onPause}
            className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 font-bold text-white shadow-sm transition-all hover:bg-amber-600 active:scale-[0.98]"
          >
            <Pause className="size-5 fill-current" />
            Pause
          </button>
        )}

        {(state.status === 'running' ||
          state.status === 'paused' ||
          state.status === 'finished') && (
          <button
            onClick={onReset}
            className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-slate-200 py-3.5 font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-300 active:scale-[0.98]"
          >
            <RotateCcw className="size-5" />
            Reset to 1:00
          </button>
        )}
      </div>

      {state.status === 'finished' && (
        <div className="animate-in zoom-in-95 mt-6 flex items-center gap-2 rounded-lg bg-red-100 px-4 py-3 text-red-700 ring-1 ring-red-200">
          <AlertCircle className="size-5" />
          <span className="font-semibold">Time is up!</span>
        </div>
      )}
    </div>
  );
};
