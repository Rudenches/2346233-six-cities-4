import React, { useCallback } from 'react';
import { City } from '../../types/types';

type CityListProps = {
  cities: City[];
  currentCity: City;
  onCityChange: (city: City) => void;
};

const CityList = React.memo(({ cities, currentCity, onCityChange }: CityListProps): JSX.Element => {
  const handleCityClick = useCallback((city: City) => () => {
    onCityChange(city);
  }, [onCityChange]);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li
            className="locations__item"
            key={city.name}
            onClick={handleCityClick(city)}
          >
            <a
              className={`locations__item-link tabs__item ${
                currentCity.name === city.name ? 'tabs__item--active' : ''
              }`}
              href="#"
            >
              <span>{city.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
});

CityList.displayName = 'CityList';

export default CityList;
