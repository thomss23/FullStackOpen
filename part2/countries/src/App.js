import axios from "axios";
import { useState, useEffect } from "react";
import Country from './Country'
import Filter from './Filter'

function App() {
  const [inputText, setInputText] = useState('')
  const [countries, setCountries] = useState([])
  const [action, setAction] = useState('');

  useEffect(() => {
    console.log("axios")
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
    setAction('')
  }

  const handleClickedButton = (e) => {
    setAction(e.target.getAttribute("data-key"))
  }

  if(countries.length === 1) {
    const country = countries[0];
    let languages = [];
    Object.keys(country.languages).forEach((key) => languages.push(country.languages[key]))
    country.languages = languages;

    return (
      <>
      <Filter inputText={inputText} handleInputChange={handleInputChange} />
      <Country country={country} />
      </>
    );
  } else if(countries.length <= 10) {

    if(action === '') {
      return (
        <div>
          <Filter inputText={inputText} handleInputChange={handleInputChange}/>
          {countries.map(country => (
            <div key={country.id}>
              <div>{country.name}</div>
              <button data-key={country.name} onClick={handleClickedButton}>show</button>
            </div>
          ))}
        </div>
      );
    } else {
      let country = countries.filter(country => country.name === action)[0]
      let langs = [];
      Object.keys(country.languages).forEach((key) => langs.push(country.languages[key]))
      country.languages = langs;

      return(
        <>
        <Filter inputText={inputText} handleInputChange={handleInputChange}/>
        <Country country={country} />
        </>
      );
    }

  } else if(countries.length > 10){ 
    return (
      <div>
        <Filter inputText={inputText} handleInputChange={handleInputChange}/>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }
}

export default App;
