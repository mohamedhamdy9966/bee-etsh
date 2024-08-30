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
          <img className='logo' src={Logo} alt="Bee etsh logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <NavDropdown title="SPLE" id="collapsible-nav-dropdown">
              <Link to="/files" className="dropdown-item">Files</Link>
              <Link to="/courses" className="dropdown-item">Courses</Link>
              <Link to="/quiz" className="dropdown-item">Quiz</Link>
              <NavDropdown.Divider />
              <Link to="/exam" className="dropdown-item">Exam</Link>
            </NavDropdown>
          </Nav>
          <Nav>
            <Link to="/login" className="nav-link">Log In / Sign Up</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
