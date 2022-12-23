import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterRule, setFilterRule] = useState('')

  const handleSubmitNewPerson = (e) => {
    e.preventDefault()

    let newPerson = {name: newName, id: persons.length + 1, phoneNumber: newNumber};
    let names = persons.map(person => person.name.toLowerCase());

    if (names.includes(newPerson.name.toLowerCase())) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
    }

    setNewName('')
    setNewNumber('')
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
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App