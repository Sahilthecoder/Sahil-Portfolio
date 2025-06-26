import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(json => isMounted && setData(json))
      .catch(err => isMounted && setError(err))
      .finally(() => isMounted && setLoading(false));

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
