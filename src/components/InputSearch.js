import React from 'react';

const InputSearch = ({ inputDebounce }) => {
  return (
    <div className="franchise-list__search">
      <span className="icon-wrapper">
        <img src="/img/icon-zoom.png" alt="" />
      </span>
      <input
        className="search-input-wrapper"
        type="text"
        onKeyUp={e => inputDebounce(e.target.value)}
        // onChange={e => inputDebounce(e.target.value)}
      />
    </div>
  );
};

export default InputSearch;
