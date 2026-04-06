import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setMessage(data.status))
      .catch(() => setMessage('Error connecting to API'));
  }, []);

  return (
    <div>
      <h1>YelpCamp</h1>
      <p>API Status: {message}</p>
    </div>
  );
}

export default App;
