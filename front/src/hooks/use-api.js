import { apiClient } from "@/api/apiClient";
import { useCallback, useEffect, useState } from "react";

export const useApi = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }, [url]);

  useEffect(() => {
    request();
  }, [request]);

  return { data, error, loading };
};
