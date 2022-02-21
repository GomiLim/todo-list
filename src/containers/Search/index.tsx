import React, { useState } from 'react';

interface PropsSearch {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  keyword: string;
}
const Search = (props: PropsSearch) => {
  const { setKeyword, keyword } = props;
  const [showClearBtn, setShowClearBtn] = useState(false);

  const handleClearInput = () => {
    setKeyword('');
    setShowClearBtn(false);
  };

  const showClearButton = () => {
    !showClearBtn && setShowClearBtn(true);
  };

  const handleInputChange = (keyword: string) => {
    setKeyword(keyword);
    if (keyword) showClearButton();
    else setShowClearBtn(false);
  };

  const onSearch = (keyword: string) => setKeyword(keyword);

  return (
    <div className="search-area">
      <div className="search-item">
        <input
          type="search"
          id="search-input"
          maxLength={20}
          aria-label="컨텐츠 검색"
          value={keyword}
          onChange={e => handleInputChange(e.currentTarget.value)}
        />
        {showClearBtn && (
          <button className="clear-btn" onClick={handleClearInput}></button>
        )}
        <button type="submit" onClick={() => onSearch(keyword)}>
          검색
        </button>
      </div>
    </div>
  );
};

export default React.memo(Search);
