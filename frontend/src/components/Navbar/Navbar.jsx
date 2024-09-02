import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "../../assets/images/logo.png";
import { Link } from 'react-router-dom';
import './Navbar.css';

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <img className='logo' src={Logo} alt="Pharmaca logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <NavDropdown title="SPLE" id="collapsible-nav-dropdown">
              <Link to="/notes" className="dropdown-item">Notes</Link>
              <Link to="/courses" className="dropdown-item">Courses</Link>
              <Link to="/quiz" className="dropdown-item">Quiz</Link>
              <NavDropdown.Divider />
              <Link to="/exam" className="dropdown-item">Exam</Link>
            </NavDropdown>
            <NavDropdown title="DHA" id="collapsible-nav-dropdown">
              <Link to="/notes" className="dropdown-item">Notes</Link>
              <Link to="/courses" className="dropdown-item">Courses</Link>
              <Link to="/quiz" className="dropdown-item">Quiz</Link>
              <NavDropdown.Divider />
              <Link to="/exam" className="dropdown-item">Exam</Link>
            </NavDropdown>
            <NavDropdown title="HAAD" id="collapsible-nav-dropdown">
              <Link to="/notes" className="dropdown-item">Notes</Link>
              <Link to="/courses" className="dropdown-item">Courses</Link>
              <Link to="/quiz" className="dropdown-item">Quiz</Link>
              <NavDropdown.Divider />
              <Link to="/exam" className="dropdown-item">Exam</Link>
            </NavDropdown>
            <NavDropdown title="NAHRA" id="collapsible-nav-dropdown">
              <Link to="/notes" className="dropdown-item">Notes</Link>
              <Link to="/courses" className="dropdown-item">Courses</Link>
              <Link to="/quiz" className="dropdown-item">Quiz</Link>
              <NavDropdown.Divider />
              <Link to="/exam" className="dropdown-item">Exam</Link>
            </NavDropdown>
            <NavDropdown title="QCHP" id="collapsible-nav-dropdown">
              <Link to="/notes" className="dropdown-item">Notes</Link>
              <Link to="/courses" className="dropdown-item">Courses</Link>
              <Link to="/quiz" className="dropdown-item">Quiz</Link>
              <NavDropdown.Divider />
              <Link to="/exam" className="dropdown-item">Exam</Link>
            </NavDropdown>
            <NavDropdown title="MOH" id="collapsible-nav-dropdown">
              <Link to="/notes" className="dropdown-item">Notes</Link>
              <Link to="/courses" className="dropdown-item">Courses</Link>
              <Link to="/quiz" className="dropdown-item">Quiz</Link>
              <NavDropdown.Divider />
              <Link to="/exam" className="dropdown-item">Exam</Link>
            </NavDropdown>
            <NavDropdown title="KAPS" id="collapsible-nav-dropdown">
              <Link to="/notes" className="dropdown-item">Notes</Link>
              <Link to="/courses" className="dropdown-item">Courses</Link>
              <Link to="/quiz" className="dropdown-item">Quiz</Link>
              <NavDropdown.Divider />
              <Link to="/exam" className="dropdown-item">Exam</Link>
            </NavDropdown>
            <NavDropdown title="BCPS" id="collapsible-nav-dropdown">
              <Link to="/notes" className="dropdown-item">Notes</Link>
              <Link to="/courses" className="dropdown-item">Courses</Link>
              <Link to="/quiz" className="dropdown-item">Quiz</Link>
              <NavDropdown.Divider />
              <Link to="/exam" className="dropdown-item">Exam</Link>
            </NavDropdown>
            <NavDropdown title="PEBC" id="collapsible-nav-dropdown">
              <Link to="/notes" className="dropdown-item">Notes</Link>
              <Link to="/courses" className="dropdown-item">Courses</Link>
              <Link to="/quiz" className="dropdown-item">Quiz</Link>
              <NavDropdown.Divider />
              <Link to="/exam" className="dropdown-item">Exam</Link>
            </NavDropdown>
            <NavDropdown title="Pearson Vue" id="collapsible-nav-dropdown">
              <Link to="/notes" className="dropdown-item">Notes</Link>
              <Link to="/courses" className="dropdown-item">Courses</Link>
              <Link to="/quiz" className="dropdown-item">Quiz</Link>
              <NavDropdown.Divider />
              <Link to="/exam" className="dropdown-item">Exam</Link>
            </NavDropdown>
            <NavDropdown title="VIVA" id="collapsible-nav-dropdown">
              <Link to="/notes" className="dropdown-item">Notes</Link>
              <Link to="/courses" className="dropdown-item">Courses</Link>
              <Link to="/quiz" className="dropdown-item">Quiz</Link>
              <NavDropdown.Divider />
              <Link to="/exam" className="dropdown-item">Exam</Link>
            </NavDropdown>
          </Nav>
          <Nav>
            {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
            :<Link to="/login" className="nav-link">Log In</Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
