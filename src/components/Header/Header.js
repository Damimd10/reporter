import React from 'react';
import { func } from 'prop-types';

const Header = ({ onChange, onSearch }) => {
  return (
    <header className="section">
      <div className="field">
        <div className="control has-icons-right">
          <input
            className="input is-large is-rounded"
            onChange={onChange}
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
  onChange: func.isRequired,
  onSearch: func.isRequired,
};

export default Header;
