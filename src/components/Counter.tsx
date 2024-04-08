import React, { useState } from "react";

interface State {
  count: number;
}

const Counter: React.FC<{}> = () => {
  const [state, setState] = useState<State>({ count: 0 });

  function increment(): void {
    setState({ count: state.count + 1 });
  }

  function decrement(): void {
    setState({ count: state.count - 1 });
  }

  return (
    <div>
      <h1>{state.count}</h1>
      <button
        onClick={increment}
        type="button">
        Increment
      </button>
      <button
        onClick={decrement}
        type="button">
        Decrement
      </button>
    </div>
  );
};

export default Counter;
