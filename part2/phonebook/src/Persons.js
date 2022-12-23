const Persons = ({personsToShow}) => (<>
    { personsToShow.map(person => <div key={person.id}>{person.name} {person.phoneNumber}</div>)}
</>)

export default Persons