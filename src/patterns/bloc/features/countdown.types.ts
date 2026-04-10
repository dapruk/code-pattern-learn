export type CountdownStatus = 'initial' | 'running' | 'paused' | 'finished';

export interface CountdownState {
  duration: number; //seconds
  formattedTime: string;
  status: CountdownStatus;
}

export type CountdownEvent =
  | { type: 'STARTED' }
  | { type: 'PAUSED' }
  | { type: 'RESUMED' }
  | { type: 'RESET'; payload: number }
  | { type: 'TICKED' }
  | { type: 'TIME_ADDED'; payload: number }
  | { type: 'TIME_SUBTRACTED'; payload: number };
