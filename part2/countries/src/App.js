import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [inputText, setInputText] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        let filteredCountries = response.data
        .filter(country => country.name.common.toLowerCase().includes(inputText.toLowerCase()))
        .map(country => ({
          "name": country.name.common,
          "id": parseInt(country.ccn3),
          "languages": country.languages,
          "flag": country.flag,
          "capital":country.capital,
          "area": country.area
        }))
        setCountries(filteredCountries)
      })
    
  }, [inputText])

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  console.log(countries)

  if(countries.length === 1) {
    const country = countries[0];

    let languages =[];
    Object.keys(country.languages).forEach((key) => languages.push(country.languages[key]))

    return (
      <div>
        find countries <input value={inputText} onChange={handleInputChange}></input>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <h2>languages</h2>
        <ul>
          {languages.map(language => <li key={country.id}>{language}</li>)}
        </ul>
        <div>{country.flag}</div>
      </div>
    );
  } else if(countries.length <= 10) {
    return (
      <div>
        find countries <input value={inputText} onChange={handleInputChange}></input>
        {countries.map(country => {
          return <div key={country.id}>{country.name}</div>;
        })}
      </div>
    );
  } else if(countries.length > 10){ 
    return (
      <div>
        find countries <input value={inputText} onChange={handleInputChange}></input>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }
}

export default App;
