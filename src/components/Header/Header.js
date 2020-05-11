import React, { useEffect, useRef, useState } from 'react';
import { func, string } from 'prop-types';

import './header.css';

const Header = ({ initialValue, onSearchUser }) => {
  const inputElement = useRef(null);
  const [query, setQuery] = useState(initialValue || '');

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  const handleChange = (e) => setQuery(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearchUser(query);
    }
  };

  const handleRemove = () => {
    setQuery('');
    inputElement.current.focus();
  };

  return (
    <header className="section header-container">
      <div className="field">
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is-large is-rounded"
            data-cy="search-input"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Who are you looking for?"
            ref={inputElement}
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
  initialValue: string,
  onSearchUser: func.isRequired,
};

Header.defaultProps = {
  initialValue: null,
};

export default Header;
