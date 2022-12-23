import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id : 1 }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmitNewPerson = (e) => {
    e.preventDefault()
    console.log(persons)
    setPersons(persons.concat({name: newName, id: persons.length + 1}))
    setNewName('')
  }

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmitNewPerson}>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return <div key = {person.id}>{person.name}</div>
      })}
    </div>
  )
}

export default App