import React, { Component } from "react";

interface State {
  count: number;
}

class ClassCounter extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increment = (): void => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = (): void => {
    this.setState({ count: this.state.count - 1 });
  };

  render(): JSX.Element {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button
          onClick={this.increment}
          type="button">
          Increment
        </button>
        <button
          onClick={this.decrement}
          type="button">
          Decrement
        </button>
      </div>
    );
  }
}

export default ClassCounter;
