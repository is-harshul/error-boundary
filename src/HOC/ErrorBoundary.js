import React from "react";

// 2nd param is if we want to show the 1st fallback component, else just the text <h1>Some error!</h1>
export function withErrorBoundary(
  WrappedComponent,
  showErrorComponent = false
) {
  return (props) => (
    <ErrorBoundary showErrorComponent={showErrorComponent}>
      {/* This is the component wrapped in the boundary. */}
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: { message: "", stack: "" },
      errorInfo: { componentStack: "" },
    };
  }

  // Catches the error and changes the state
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log({ error });
    return { hasError: true };
  }

  /* This lifecycle method is optional if you do not want to log error information */
  // Logs the error into the state
  componentDidCatch = (error, errorInfo) => {
    // Sets the error and info in state
    this.setState({ error, errorInfo });
  };

  render() {
    console.log(this.state);
    console.log(this.props);
    if (this.state.hasError && !this.props.showErrorComponent) {
      // You can render any custom fallback UI
      return <div className="error">ANY MODAL OR POP_UP COMPONENT HERE</div>;
    }
    /* Condition if we do not want to show modal or any component that you chose everytime, instead we have some text or other component. */
    else if (this.state.hasError && this.props.showErrorComponent) return <h1>Some error!</h1>;
    // Else return the children as is
    return this.props.children;
  }
}

export default ErrorBoundary;
