import React, { useState } from 'react';

import Header from './components/Header';

const App = () => {
  const [query, setQuery] = useState();

  const handleQueryChange = (e) => setQuery(e.target.value);

  const handleSearch = () => {
    console.log('Searching', query);
  };

  return (
    <div>
      <Header onChange={handleQueryChange} onSearch={handleSearch} />
    </div>
  );
};

export default App;
