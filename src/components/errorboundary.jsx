// src/components/ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to render fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log error information (optional)
    console.error('Error caught by ErrorBoundary:', error);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when error occurs
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;
