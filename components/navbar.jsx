import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link, Outlet } from 'react-router-dom';

function NavBar(){
    return (
      <>
      <style type="text/css">
        {`
        .btn-flat {
          
          color: red;
        }

        .btn-xxl {
          padding: 1.5rem 1.5rem;
          font-size: 1rem;
        }
        `}
      </style>

      
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
        <Navbar.Brand as={Link} to="/">BadBank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/deposit">Deposit</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/withdraw"> Withdraw </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/balance">Balance</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/alldata">
                All Data
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
          <Navbar.Brand>
            <Button as={Link} to="/createaccount2" className='btn btn-primary'>Create Account</Button>
          </Navbar.Brand>
        </Container>
      </Navbar>

        <section>
          <Outlet></Outlet>
        </section>

      </>);
}

export default NavBar