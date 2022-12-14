import Country from "./Country";

function Countries({ countries, onSelectCountry }) {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length === 1) {
    return <Country {...countries[0]} />;
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name}>
          {country.name}
          <button onClick={() => onSelectCountry(country.name)}>show</button>
        </div>
      ))}
    </div>
  );
}

export default Countries;
