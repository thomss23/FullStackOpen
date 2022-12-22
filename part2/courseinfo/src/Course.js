const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </>
  
const Course = ({course}) => {
  return (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((acumulator, currentvalue) => currentvalue.exercises + acumulator, 0)} />
  </div>)
}

export default Course