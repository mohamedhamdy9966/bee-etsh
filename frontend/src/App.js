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
import Contact from './components/Contact/Contact';
import GoogleAd from './components/GoogleAds/GoogleAd';
import Videos from './components/Videos/Videos';
import ExamNhra from './components/Exam/ExamNhra';
import ExamQhcp from './components/Exam/ExamQhcp';
import ExamDha from './components/Exam/ExamDha';
import ExamOmsp from './components/Exam/ExamOmsp';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/notes' element={<Notes />} />
          <Route path='/courses' element={<Videos />} />
          <Route path='/exam' element={<Exam />} />
          <Route path='/examNhra' element={<ExamNhra />} />
          <Route path='/examQhcp' element={<ExamQhcp />} />
          <Route path='/examDha' element={<ExamDha />} />
          <Route path='/examOmsp' element={<ExamOmsp />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/login' element={<SignUpLogin />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <GoogleAd/>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
