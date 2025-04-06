// src/components/AnalyticsErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // Optional fallback UI
}

interface State {
  hasError: boolean;
}

class AnalyticsErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  // Use static getDerivedStateFromError to update state so the next render shows the fallback UI.
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  // Use componentDidCatch to log error information
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service here
    // or just log it to the console for debugging.
    // Avoid logging if the error is likely due to an ad blocker,
    // unless you specifically want to track that.
    console.error(
      "Analytics Error Boundary caught an error:",
      error,
      errorInfo,
    );
    // Example: Check if error message indicates script blocking
    // if (!error.message.includes('Failed to fetch') && !error.message.includes('net::ERR_BLOCKED_BY_CLIENT')) {
    //   // Log error to your service
    // }
  }

  public render() {
    if (this.state.hasError) {
      // Render fallback UI, or null to render nothing
      return this.props.fallback !== undefined ? this.props.fallback : null;
    }

    // Normally, just render children
    return this.props.children;
  }
}

export default AnalyticsErrorBoundary;
