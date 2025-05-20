import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Oops! Something went wrong with this listing.</h2>
          <p>
            <Link to="/">Click here</Link> to return to the homepage.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
