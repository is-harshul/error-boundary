import React, { Component, Fragment } from "react";
import { withErrorBoundary } from "../HOC/ErrorBoundary";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    const { count } = this.state;
    if (count >= 5) {
      throw new Error("Count exceeded 5");
    }
    return (
      <>
        <h1>I am Child2 wrapped in Boundary</h1>
        <p>I will show error when count gets equal to 5</p>
        <h3>Count: {count}</h3>
        <button
          onClick={() =>
            this.setState((prevState) => {
              return { count: prevState.count + 1 };
            })
          }
        >
          Increment
        </button>
      </>
    );
  }
}

export default withErrorBoundary(Child2, true);
