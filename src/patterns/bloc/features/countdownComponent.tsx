import { CountdownView } from './components/countdownView';
import { useBloc } from './core/useBloc';
import { CountdownBloc } from './countdownBloc';

const countdownBloc = new CountdownBloc(60);

export const CountdownWidget = () => {
  const state = useBloc(countdownBloc);

  return (
    <CountdownView
      state={state}
      onStart={() => {
        countdownBloc.dispatch({ type: 'STARTED' });
      }}
      onPause={() => {
        countdownBloc.dispatch({ type: 'PAUSED' });
      }}
      onReset={() => {
        countdownBloc.dispatch({ type: 'RESET', payload: 60 });
      }}
      onAddTime={(s) => {
        countdownBloc.dispatch({ type: 'TIME_ADDED', payload: s });
      }}
      onSubtractTime={(s) => {
        countdownBloc.dispatch({ type: 'TIME_SUBTRACTED', payload: s });
      }}
    />
  );
};
