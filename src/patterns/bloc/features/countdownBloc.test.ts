import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CountdownBloc } from './countdownBloc';

describe('CountdownBloc Logic', () => {
  let bloc: CountdownBloc;

  beforeEach(() => {
    vi.useFakeTimers();
    bloc = new CountdownBloc(60);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with the correct default state', () => {
    const state = bloc.getState();
    expect(state.duration).toBe(60);
    expect(state.formattedTime).toBe('01:00');
    expect(state.status).toBe('initial');
  });

  it('should transition to running status when STARTED is dispatched', () => {
    bloc.dispatch({ type: 'STARTED' });
    expect(bloc.getState().status).toBe('running');
  });

  it('should decrement duration when time passes', () => {
    bloc.dispatch({ type: 'STARTED' });

    vi.advanceTimersByTime(3000);

    const state = bloc.getState();
    expect(state.duration).toBe(57);
    expect(state.formattedTime).toBe('00:57');
  });
  it('should stop and set status to finished when time reaches zero', () => {
    const shortBloc = new CountdownBloc(2);
    shortBloc.dispatch({ type: 'STARTED' });

    vi.advanceTimersByTime(2000);

    vi.advanceTimersByTime(1000);

    const state = shortBloc.getState();
    expect(state.duration).toBe(0);
    expect(state.status).toBe('finished');
  });

  it('should handle TIME_ADDED correctly', () => {
    bloc.dispatch({ type: 'TIME_ADDED', payload: 30 });
    expect(bloc.getState().duration).toBe(90);
    expect(bloc.getState().formattedTime).toBe('01:30');
  });

  it('should handle TIME_SUBTRACTED without going below zero', () => {
    bloc.dispatch({ type: 'TIME_SUBTRACTED', payload: 100 });
    const state = bloc.getState();
    expect(state.duration).toBe(0);
    expect(state.status).toBe('finished');
  });

  it('should stop the timer when PAUSED is dispatched', () => {
    bloc.dispatch({ type: 'STARTED' });
    vi.advanceTimersByTime(1000);

    bloc.dispatch({ type: 'PAUSED' });
    const durationAfterPause = bloc.getState().duration;

    vi.advanceTimersByTime(5000);

    expect(bloc.getState().duration).toBe(durationAfterPause);
    expect(bloc.getState().status).toBe('paused');
  });
});
