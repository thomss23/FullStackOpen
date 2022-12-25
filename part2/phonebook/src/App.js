import { useState } from 'react'
import { useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterRule, setFilterRule] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmitNewPerson = (e) => {
    e.preventDefault()

    let newPerson = {name: newName, id: persons.length + 1, phoneNumber: newNumber};
    let names = persons.map(person => person.name.toLowerCase());

    if (names.includes(newPerson.name.toLowerCase())) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          setPersons(persons.concat(response.data));
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameInputChange = (e) => {
    setNewName(e.target.value)
  }  
  
  const handlePhoneInputChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFiltering = (e) => {
    setFilterRule(e.target.value)
  }

  let personsToShow = filterRule === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filterRule.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterRule={filterRule} handleFiltering={handleFiltering}/>
      <h3>Add new</h3>
      <PersonForm handleNameInputChange={handleNameInputChange} newName={newName} newNumber={newNumber} handlePhoneInputChange={handlePhoneInputChange} handleSubmitNewPerson={handleSubmitNewPerson}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} setPersons={setPersons} persons={persons}/>
    </div>
  )
}

export default App