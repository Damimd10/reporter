import React, { useState } from 'react';
import { func } from 'prop-types';

const Header = ({ onSearchUser }) => {
  const [query, setQuery] = useState();

  const handleChange = e => setQuery(e.target.value);

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      onSearchUser(query);
    }
  }

  return (
    <header className="section">
      <div className="field">
        <div className="control has-icons-right">
          <input
            className="input is-large is-rounded"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="What are you looking for?"
            type="text"
          />
          <span className="icon is-right">
            <i className="fas fa-check" />
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
