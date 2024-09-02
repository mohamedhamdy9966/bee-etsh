import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_question_icon from '../../assets/images/addquestion.png'
import list_question_icon from '../../assets/images/question-list.jpg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addquestion'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={add_question_icon} alt="add question icon" />
        <p>Add Question</p>
      </div>
      </Link>
      <Link to={'/listquestion'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={list_question_icon} alt="list question icon" />
        <p>List Question</p>
      </div>
      </Link>
    </div>
  )
}

export default Sidebar
