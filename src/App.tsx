import React, { useEffect, useState } from "react";
import "./App.css";

const url = 'http://test.similar.mayorana.ch/chapters?ranges=2-34';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setData(null); // Reset data state before fetching new data
      setError(null); // Reset error state before fetching new data
      console.log('Fetching data from the API...');
      const response = await fetch(url);
      console.log('API call successful');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error:any) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    fetchData(); // Call fetchData when the button is clicked
  };

  return (
    <div className="container">
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data Again'}
      </button>
      {error && <p>Error: {error}</p>}
      {data && <p>Data: {JSON.stringify(data)}</p>}
    </div>
  );
}

export default App;
