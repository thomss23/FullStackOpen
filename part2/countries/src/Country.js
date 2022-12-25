const Country = ({country}) => {
   return <>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <h2>languages</h2>
    <ul>
      {country.languages.map(language => (
        <li key={language}>{language}</li>) )}
    </ul>
    <div>{country.flag}</div>
  </>
}

export default Country