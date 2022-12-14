import Weather from "./Weather";

function Country({ name, area, capital, languages, flag }) {
  return (
    <>
      <h2>{name}</h2>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <p>
        <b>languages:</b>
      </p>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <div className="flag">{flag}</div>

      <Weather city={capital} />
    </>
  );
}

export default Country;
