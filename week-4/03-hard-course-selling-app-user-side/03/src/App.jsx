import { Routes, Route } from 'react-router-dom';
import CourseList from './components/CourseList.jsx';
import Landing from './components/Landing.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';

function App() {
  return (
    <>
      <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/courses" element={<CourseList type={0}/>} />
            <Route path="/courses/purchased" element={<CourseList type={1}/>} />
            <Route path="/courses/:id" element={<CourseList type={2}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
