import React, { useState, useEffect, useMemo } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  const processedData = useMemo(() => {
    // Perform any expensive data processing here
    if (data) {
      return data.map(item => item);
    }
    return [];
  }, [data]); // Recalculate only when data changes

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <ul>
          {processedData.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyComponent;
