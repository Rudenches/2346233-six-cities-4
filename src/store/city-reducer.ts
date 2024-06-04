import { createReducer } from '@reduxjs/toolkit';
import { setCity } from './action';
import { City } from '../types/types';
import { CITIES } from '../const';

const initialCity: City = CITIES.find((city) => city.name === 'Paris') as City;

const cityReducer = createReducer(initialCity, (builder) => {
  builder.addCase(setCity, (_state, action) =>
    action.payload // Ensure that the action payload is used to update the state
  );
});

export default cityReducer;
