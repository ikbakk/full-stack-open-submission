import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const newCountries = response.data
        .filter((country) => {
          return (
            country.capital && country.capital.length > 0 && country.languages
          );
        })
        .map((country) => {
          return {
            name: country.name.common,
            area: country.area,
            capital: country.capital[0],
            languages: Object.values(country.languages),
            flag: country.flag,
          };
        });

      setCountries(newCountries);
    });
  }, []);

  const onChange = (event) => setFilter(event.target.value);
  const onSelectCountry = (name) => setFilter(name);

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Filter value={filter} onChange={onChange} />
      <Countries
        countries={countriesToShow}
        onSelectCountry={onSelectCountry}
      />
    </>
  );
}

export default App;
