import { useState } from 'react'
import { useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import axios from 'axios'
import Notification from './Notification'
import './index.css'
import ErrorNotification from './ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterRule, setFilterRule] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    axios
      .get('/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmitNewPerson = (e) => {
    e.preventDefault()

    let names = persons.map(person => person.name.toLowerCase());
  
    if (names.includes(newName.toLowerCase())) {

      if(window.confirm(newName + "Is already present in the phonebook. Do you wish to change their number?")) {
        const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
        const url = `/api/persons/${person.id}`
        const changedPerson = { ...person, number: newNumber }
        
        axios.put(url, changedPerson).then(response => {
          setPersons(persons.map(p => p.id !== changedPerson.id ? p : response.data))
        })
      }

    } else {
      let newPerson = {name: newName, id: persons.length + 1, number: newNumber};

      axios
        .post('/api/persons', newPerson)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNotificationMessage(`${newPerson.name} was added`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
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
      <Notification message={notificationMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter filterRule={filterRule} handleFiltering={handleFiltering}/>
      <h3>Add new</h3>
      <PersonForm handleNameInputChange={handleNameInputChange} newName={newName} newNumber={newNumber} handlePhoneInputChange={handlePhoneInputChange} handleSubmitNewPerson={handleSubmitNewPerson}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} setPersons={setPersons} persons={persons} setErrorMessage={setErrorMessage}/>
    </div>
  )
}

export default App