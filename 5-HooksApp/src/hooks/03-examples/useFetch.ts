import { useEffect, useState } from "react";

interface TypeHook<T> {
  data: null | T;
  isLoading: boolean;
  hasError: boolean;
  error: { code: number; message: string } | null;
}

const localCache: Record<string, unknown> = {};

const useFetch = <T>(url: string): Omit<TypeHook<T>, "error"> => {
  const [state, setState] = useState<TypeHook<T>>({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getFetch(url);
  }, [url]);

  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
    });
  };

  const getFetch = async (url: string) => {
    setLoadingState();
    if (localCache[url]) {
      return setState({
        data: localCache[url] as T,
        isLoading: false,
        hasError: false,
        error: null,
      });
    }

    const response = await fetch(url);
    await new Promise((resolve) => setTimeout(() => resolve(true), 2000));
    if (!response.ok) {
      return setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: response.status,
          message: response.statusText,
        },
      });
    }
    const data = (await response.json()) as T;

    setState({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    });

    localCache[url] = data;
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};

export default useFetch;
