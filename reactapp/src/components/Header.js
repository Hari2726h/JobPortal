import React from 'react'
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';
import { HouseDoorFill, PeopleFill, BriefcaseFill, ChatDotsFill, BellFill } from 'react-bootstrap-icons';
const Header = () => {
  const hoverHandlers = {
    onMouseEnter: (e) => e.currentTarget.style.setProperty('color', '#ff9800', 'important'),
    onMouseLeave: (e) => e.currentTarget.style.setProperty('color', 'white', 'important'),
  }
  return (
    <Navbar bg='dark' variant='dark' expand="lg" className="border-bottom sticky-top">
      <Container>
        <Navbar.Brand href='#home' className="fw-bold text-light">
          Job Portal
        </Navbar.Brand>
<Navbar.Toggle aria-controls='navbar-content'/>
<Navbar.Collapse id="navbar-content">

        <Form className="d-none d-md-flex me-auto ms-3" style={{ flex: 1 }}>
          <FormControl type="search" placeholder="seach jobs, companies..." className="me-2 bg-secondary text-light border-0" />
        </Form>
        <div className="d-flex ms-auto align-items-center">
          <Nav>
            <Nav.Link href='#home' className='text-light px-2 d-flex align-items-center'
              style={{ transition: '0.3s' }}
              {...hoverHandlers}>
              <HouseDoorFill size={20} className='me-1' />Home</Nav.Link>
            <Nav.Link href='#network' className='text-light px-2 d-flex align-items-center' style={{ transition: '0.3s' }}
              {...hoverHandlers}><PeopleFill size={20} className='me-1' />Network</Nav.Link>
            <Nav.Link href='#jobs' className='text-light px-2 d-flex align-items-center' style={{ transition: '0.3s' }}
              {...hoverHandlers}><BriefcaseFill size={20} className='me-1' />Jobs</Nav.Link>
            <Nav.Link href='#messages' className='text-light px-2 d-flex align-items-center' style={{ transition: '0.3s' }}
              {...hoverHandlers}><ChatDotsFill size={20} className='me-1' />Messages</Nav.Link>
            <Nav.Link href='#notification' className='text-light px-2 d-flex align-items-center' style={{ transition: '0.3s' }}
              {...hoverHandlers}><BellFill size={20} className='me-1' />Notification</Nav.Link>
          </Nav>
        </div>
              </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;