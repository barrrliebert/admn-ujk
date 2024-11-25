import { useState, useEffect } from 'react';
import ApiService from '../utils/apiService';

const useFetchData = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from:', url);
        const fullUrl = url.startsWith('/api/v1') ? url : `/api/v1${url}`;
        const response = await ApiService.get(fullUrl);
        console.log('Response:', response);
        
        if (response?.result_code === 0) {
          setData(response.result);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [isLoading, error, data];
};

export default useFetchData; 