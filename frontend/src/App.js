import './App.css';
import Exam from './components/Exam/Exam';
import Home from './components/Home/Home';
import Navbar from "./components/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Quiz from './components/Quiz/Quiz';
import SignUpLogin from './components/Login/SignUpLogin';
import Footer from './pages/Footer/Footer';
import Notes from './components/Notes/Notes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/notes' element={<Notes />} />
          <Route path='/exam' element={<Exam />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/login' element={<SignUpLogin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
