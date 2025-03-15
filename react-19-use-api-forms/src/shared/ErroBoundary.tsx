import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

export class ErrorBoundary extends Component<Props> {
  state: { hasError: boolean } = { hasError: false };

  constructor(props: Props) {
    super(props);
  }

  static getDerivedStateFromError(error: Error) {
    console.log(error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // this.setState({ hasError: true });
    console.log({ error, info });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}
