import './Admin.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Routes,Route } from "react-router-dom";
import AddQuestion from '../../components/AddQuestion/AddQuestion';
import ListQuestions from '../../components/ListQuestions/ListQuestions';
import ListUsers from '../../components/ListUsers/ListUsers';

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addquestion' element={<AddQuestion/>}/>
        <Route path='/listquestion' element={<ListQuestions/>}/>
        <Route path='/listusers' element={<ListUsers/>}/>        
      </Routes>
    </div>
  )
}

export default Admin
