import axios from "axios"

const Persons = ({personsToShow, setPersons, persons, setErrorMessage}) => {

    const deletePerson = (id) => {
        const url = `http://localhost:3001/persons/${id}`
        const personToBeDeleted = personsToShow.find(person => person.id === id)
        
        if (window.confirm("Are you sure you wish to delete " + personToBeDeleted.name)) {
            axios
            .delete(url, personToBeDeleted)
            .then(() => {
                setPersons(persons.filter(person => person.id !== personToBeDeleted.id));
            })
            .catch(error => {
                setErrorMessage(`Information of ${personToBeDeleted.name} was already deleted from the server`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
        }
    }

   return <>
       {personsToShow.map(person => {
        return (
            <div key={person.id}>
                <div style={{float:"left"}}>{person.name} {person.phoneNumber}</div>
                <button onClick={() => deletePerson(person.id)} style={{marginLeft:"5px"}}>delete</button>
            </div>
        )
    })}
    </>

    
}

export default Persons