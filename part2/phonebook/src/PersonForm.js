const PersonForm = ({handleSubmitNewPerson, newName, newNumber, handleNameInputChange, handlePhoneInputChange}) => (
    
    <form onSubmit={handleSubmitNewPerson}>
        <div>
            name: <input required value={newName} onChange={handleNameInputChange} />
        </div>
        <div>
            number: <input required value={newNumber} onChange={handlePhoneInputChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm