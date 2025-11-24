import './App.css'
import StudentForm from './components/student/studentForm'
import Header from './components/layout/header/Header'

function App() {

  return (
    <>
    <Header/>
    <div className='main-container'>
      <StudentForm/>
    </div>
    </>
  )
}

export default App
