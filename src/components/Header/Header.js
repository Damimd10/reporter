import React, { useState } from 'react';
import { func } from 'prop-types';

import './header.css';

const Header = ({ onSearchUser }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => setQuery(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearchUser(query);
    }
  };

  const handleRemove = () => setQuery('');

  return (
    <header className="section">
      <div className="field">
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is-large is-rounded"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Who are you looking for?"
            type="text"
            value={query}
          />
          <span className="icon is-medium is-left">
            <i className="fas fa-search" />
          </span>
          <span className="icon is-small is-right search-icon" onClick={handleRemove}>
            <i className="far fa-times-circle" />
          </span>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onSearchUser: func.isRequired,
};

export default Header;
