import React from 'react'
import './Admin.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Routes,Route } from "react-router-dom";
import AddQuestion from '../../components/AddQuestion/AddQuestion';
import ListQuestions from '../../components/ListQuestions/ListQuestions';

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addquestion' element={<AddQuestion/>}/>
        <Route path='/listquestion' element={<ListQuestions/>}/>
      </Routes>
    </div>
  )
}

export default Admin
