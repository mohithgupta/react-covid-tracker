import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
        const getCountry = await fetchCountries();
        setCountries(getCountry);
    };

    fetchAPI();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)} >
        <option value="">&nbsp;&nbsp;Global</option>
        {countries.map((country, i) => <option key={i} value={country}>&nbsp;&nbsp;{country}</option>)}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
