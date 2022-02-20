import React, { useRef, useState } from 'react';

const Search = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [showClearBtn, setShowClearBtn] = useState(false);

  const handleClearInput = () => {
    setSearchValue('');
  };

  const handleUpdateInputValue = (keyword: string) => {
    setSearchValue(keyword);
  };

  const handleShowClearButton = () => {
    !showClearBtn && setShowClearBtn(true);
  };

  const handleChangeSearchInput = (keyword: string) => {
    handleUpdateInputValue(keyword);
    handleShowClearButton();
  };

  const handleSearch = () => {
    localStorage.setItem('search', searchValue);
  };

  return (
    <div className="search-area">
      <div className="search-item">
        <input
          ref={searchRef}
          type="search"
          id="search-input"
          maxLength={20}
          aria-label="컨텐츠 검색"
          value={searchValue}
          onChange={keyword =>
            handleChangeSearchInput(keyword.currentTarget.value)
          }
        />
        {searchValue && (
          <button className="clear-btn" onClick={handleClearInput}></button>
        )}
        <button type="submit" onClick={handleSearch}>
          검색
        </button>
      </div>
    </div>
  );
};

export default React.memo(Search);
