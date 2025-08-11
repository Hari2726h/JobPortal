import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const hoverHandlers = {
    onMouseEnter: (e) => e.currentTarget.style.setProperty('color', '#ffc107', 'important'),
    onMouseLeave: (e) => e.currentTarget.style.setProperty('color', 'white', 'important'),
  };

  return (
    <footer className="bg-dark text-light py-4 mt-auto border-top border-secondary">
      <Container>
        <Row>
          <Col md={3}>
            <h6>About</h6>
            <ul className="list-unstyled">
              <li {...hoverHandlers} style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}>About us</li>
              <li {...hoverHandlers} style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}>Careers</li>
              <li {...hoverHandlers} style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}>Press</li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Services</h6>
            <ul className="list-unstyled">
              <li {...hoverHandlers} style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}>Job Search</li>
              <li {...hoverHandlers} style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}>Company Reviews</li>
              <li {...hoverHandlers} style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}>Resume help</li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Support</h6>
            <ul className="list-unstyled">
              <li {...hoverHandlers} style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}>Help Center</li>
              <li {...hoverHandlers} style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}>Privacy Policy</li>
              <li {...hoverHandlers} style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}>Terms</li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Follow Us</h6>
            <ul className="list-unstyled">
              <li {...hoverHandlers} style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}>LinkedIn</li>
              <li {...hoverHandlers} style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}>Twitter</li>
              <li {...hoverHandlers} style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}>Facebook</li>
            </ul>
          </Col>
        </Row>
        <div className="d-flex justify-content-center align-items-center mt-3 text-secondary">
          &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
