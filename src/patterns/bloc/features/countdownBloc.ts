import { CountdownEvent, CountdownState } from './countdown.types';

export class CountdownBloc {
  private state: CountdownState;
  private listeners: Set<() => void> = new Set();
  private timer?: ReturnType<typeof setInterval>;

  constructor(initialDuration = 60) {
    this.state = this.createState(initialDuration, 'initial');
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  private createState(
    duration: number,
    status: CountdownState['status']
  ): CountdownState {
    return {
      duration,
      status,
      formattedTime: this.formatTime(duration),
    };
  }

  public getState = (): CountdownState => this.state;

  public subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private emit(newState: CountdownState) {
    this.state = newState;
    this.listeners.forEach((l) => {
      l();
    });
  }

  public dispatch = (event: CountdownEvent) => {
    switch (event.type) {
      case 'STARTED':
        if (this.state.duration > 0) {
          this.emit(this.createState(this.state.duration, 'running'));
          this.startInterval();
        }
        break;

      case 'PAUSED':
        this.stopInterval();
        this.emit(this.createState(this.state.duration, 'paused'));
        break;

      case 'RESET':
        this.stopInterval();
        this.emit(this.createState(event.payload, 'initial'));
        break;

      case 'TICKED':
        if (this.state.duration > 0) {
          this.emit(this.createState(this.state.duration - 1, 'running'));
        } else {
          this.stopInterval();
          this.emit(this.createState(0, 'finished'));
        }
        break;

      case 'TIME_ADDED':
        this.emit(
          this.createState(
            this.state.duration + event.payload,
            this.state.status
          )
        );
        break;

      case 'TIME_SUBTRACTED': {
        const nextTime = Math.max(0, this.state.duration - event.payload);
        this.emit(
          this.createState(
            nextTime,
            nextTime === 0 ? 'finished' : this.state.status
          )
        );
        if (nextTime === 0) this.stopInterval();
        break;
      }
    }
  };

  private startInterval() {
    this.stopInterval();
    this.timer = setInterval(() => {
      this.dispatch({ type: 'TICKED' });
    }, 1000);
  }

  private stopInterval() {
    if (this.timer) clearInterval(this.timer);
  }
}
