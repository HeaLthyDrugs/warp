// components/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';

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

    public static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="error-container">
                    <h1>Something went wrong</h1>
                    <button onClick={() => this.setState({ hasError: false })}>
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;