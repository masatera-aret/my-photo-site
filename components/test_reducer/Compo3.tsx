import { useCountReducerContext, InisialState } from "./CountReducerContext";

type State = {
  state: InisialState;
  dispatch: React.Dispatch<any>;
};

const Compo3 = () => {
  const { state, dispatch }: State = useCountReducerContext();

  return (
    <div className={`bg-pink-500 p-5`}>
      <h1>Compo3</h1>
      <p>カウント:{state.countTwo}</p>
      <button
        onClick={() => dispatch({ type: "incrementTwo" })}
        className={`bg-yellow-300 rounded p-3`}
      >
        up
      </button>
      <button
        onClick={() => dispatch({ type: "decrementTwo" })}
        className={`bg-green-300 rounded p-3`}
      >
        Down
      </button>
    </div>
  );
};

export default Compo3;
