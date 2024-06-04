import { useState, useCallback } from 'react';
import React from 'react';

type SortOptionsProps = {
  onSortChange: (sortType: string) => void;
};

const SORT_TYPES = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

const SortOptions = React.memo(({ onSortChange }: SortOptionsProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Popular');

  const handleSortChange = useCallback((sortType: string) => {
    setSelectedSort(sortType);
    onSortChange(sortType);
    setIsOpen(false);
  }, [onSortChange]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleOpen}>
        &nbsp;{selectedSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {SORT_TYPES.map((sortType) => (
            <li
              key={sortType}
              className={`places__option ${sortType === selectedSort ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => handleSortChange(sortType)}
            >
              {sortType}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
});

SortOptions.displayName = 'SortOptions';

export default SortOptions;
