// import { apiClient } from "@/api/apiClient";
// import { useCallback, useEffect, useState } from "react";

// export const useApi = (url) => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const request = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await apiClient.get(url);
//       setData(response.data);
//     } catch (error) {
//       setError(error);
//     }
//     setLoading(false);
//   }, [url]);

//   const refresh = useCallback(async () => {
//     await request();
//   }, [request]);

//   useEffect(() => {
//     request();
//   }, [request]);

//   return { data, error, loading, refresh };
// };

// export const useApiPost = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const requestPost = useCallback(async (url, body) => {
//     setLoading(true);
//     try {
//       const response = await apiClient.post(url, body);
//       setData(response.data);
//     } catch (err) {
//       setError(err.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return { data, error, loading, requestPost };
// };

// export const useApiDelete = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const requestDelete = useCallback(async (url) => {
//     setLoading(true);
//     try {
//       const response = await apiClient.delete(url);
//       setData(response.data);
//     } catch (err) {
//       setError(err.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return { data, error, loading, requestDelete };
// };
