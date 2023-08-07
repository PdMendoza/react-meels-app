import { useCallback, useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequest = useCallback(async (url, options, transformData) => {
    setIsLoading(true);
    setError(false);
    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error("Something went wrong while fetching");
      }

      const data = await res.json();
      transformData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  return {
    loading: isLoading,
    error,
    sendRequest: fetchRequest
  };
};

export default useFetch;
