import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const hoverHandlers = {
    onMouseEnter: (e) =>
      e.currentTarget.style.setProperty('color', '#ffc107', 'important'),
    onMouseLeave: (e) =>
      e.currentTarget.style.setProperty('color', 'white', 'important'),
  };

  const footerRoutes = {
    'About us': '/',
    Careers: '/',
    Press: '/',
    'Job Search': '/',
    'Company Reviews': '/company/profile',
    'Resume help': '/profile',
    'Help Center': '/profile',
    'Privacy Policy': '/',
    Terms: '/',
    LinkedIn: 'https://www.linkedin.com/',
    Twitter: 'https://twitter.com/',
    Facebook: 'https://www.facebook.com/',
  };

  const handleNavigation = (label) => {
    const route = footerRoutes[label];
    if (route) {
      if (route.startsWith('http')) {
        window.open(route, '_blank', 'noopener,noreferrer');
      } else {
        navigate(route);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const renderList = (items) =>
    items.map((item) => (
      <li
        key={item}
        {...hoverHandlers}
        style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}
        onClick={() => handleNavigation(item)}
      >
        {item}
      </li>
    ));

  return (
    <footer className="bg-dark text-light py-4 mt-auto border-top border-secondary">
      <Container>
        <Row>
          <Col md={3}>
            <h6>About</h6>
            <ul className="list-unstyled">
              {renderList(['About us', 'Careers', 'Press'])}
            </ul>
          </Col>
          <Col md={3}>
            <h6>Services</h6>
            <ul className="list-unstyled">
              {renderList(['Job Search', 'Company Reviews', 'Resume help'])}
            </ul>
          </Col>
          <Col md={3}>
            <h6>Support</h6>
            <ul className="list-unstyled">
              {renderList(['Help Center', 'Privacy Policy', 'Terms'])}
            </ul>
          </Col>
          <Col md={3}>
            <h6>Follow Us</h6>
            <ul className="list-unstyled">
              {renderList(['LinkedIn', 'Twitter', 'Facebook'])}
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
