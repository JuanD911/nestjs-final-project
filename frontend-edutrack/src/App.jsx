import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
import MainPage from './components/pages/mainPage/mainPage';
import StudentForm from './components/student/studentForm';
import StudentPage from './components/pages/student/studentPage';
import { ThemeProvider } from './components/theme/ThemeProvider';
import StudentList from './components/student/studentList';
import StudentEditForm from './components/student/studentEditForm';
import ProfessorList from './components/professor/professorList';
import ProfessorEditForm from './components/professor/professorEditForm';
import ProfessorForm from './components/professor/professorForm';
import ProfessorPage from './components/pages/professor/professorPage';
import EnrollmentPage from './components/pages/enrollment/enrollmentPage';
import EnrollmentForm from './components/enrollment/enrollmentForm';
import EnrollmentList from './components/enrollment/enrollmentList';
import CoursePage from './components/pages/course/coursePage';
import CourseForm from './components/course/courseForm';
import CourseList from './components/course/courseList';
import CourseEditForm from './components/course/courseEditForm';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="app-container">

          <Header />

          <div className="main-content-wrapper">
            <div className="main-content-inner">

              <Routes>

                <Route path="/main" element={<MainPage />} />

                <Route path="/students" element={<StudentPage />} />
                <Route path="/students/new" element={<StudentForm />} />
                <Route path="/students/list" element={<StudentList />} />
                <Route path="/students/edit/:id" element={<StudentEditForm />} />

                <Route path="/professors" element={<ProfessorPage />} />
                <Route path="/professors/new" element={<ProfessorForm />} />
                <Route path="/professors/list" element={<ProfessorList />} />
                <Route path="/professors/edit/:id" element={<ProfessorEditForm />} />

                <Route path="/enrollments" element={<EnrollmentPage />} />
                <Route path="/enrollments/new" element={<EnrollmentForm />} />
                <Route path="/enrollments/list" element={<EnrollmentList />} />

                <Route path="/courses" element={<CoursePage />} />
                <Route path="/courses/new" element={<CourseForm />} />
                <Route path="/courses/list" element={<CourseList />} />
                <Route path="/courses/edit/:id" element={<CourseEditForm />} />

              </Routes>

            </div>
          </div>

          <Footer />

        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
