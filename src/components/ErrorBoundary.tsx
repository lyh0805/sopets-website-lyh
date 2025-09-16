'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div 
          role="alert"
          aria-live="assertive"
          className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-900/20 via-black to-black p-4"
        >
          <div className="rounded-lg bg-white/5 p-8 backdrop-blur-lg shadow-xl">
            <h2 className="mb-4 text-2xl font-bold text-white">
              Something went wrong
            </h2>
            <p className="text-gray-300">
              Please try refreshing the page
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 rounded-full bg-purple-500 px-6 py-2 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-all"
              aria-label="Try loading the page again"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 