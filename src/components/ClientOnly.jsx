import { useState, useEffect } from 'react';

const ClientOnly = ({ children, fallback = null }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only set mounted to true after the component mounts on the client
    setMounted(true);

    // Cleanup function
    return () => {
      setMounted(false);
    };
  }, []);

  // On the server, render the fallback or null
  if (typeof window === 'undefined' || !mounted) {
    return fallback;
  }

  // On the client, render children
  return children;
};

export default ClientOnly;
