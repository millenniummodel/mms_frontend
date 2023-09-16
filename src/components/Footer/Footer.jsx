import React, { useEffect, useState } from 'react'
import './Footer.css'
import { Container, Row, Col, ListGroupItem, ListGroup } from 'reactstrap'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/logo1.png'


const quick_links = [
  {
    path: '/contacts',
    display: 'Contact'
  },
  {
    path: '/admission',
    display: 'Admission',
  },
  {
    path: '/result',
    display: 'Result'
  },
  {
    path: '/faculties',
    display: 'Faculties',
  },
  {
    path: '/school-timings',
    display: 'Timings',
  },
]



const Footer = ({ mode }) => {

  const [footerStyle, setFooterStyle] = useState({})
  useEffect(() => {
    const darkStyle = {
      "backgroundColor": "#231835",
      "color": "white"
    }
    const lightStyle = {
      "backgroundColor": "white",
      "color": "black"
    }
    if (mode === "light") setFooterStyle(lightStyle)
    else setFooterStyle(darkStyle)
  }, [mode])


  return (
    <footer className='footer pt-5' style={footerStyle}>
      <Container>
        <Row className='footer_row'>
          <Col lg='2' className='pt-3'>
            <div className='logo '>
              <img src={logo} className='mx-auto' alt='Not available' />
              {/* <div className='social-links d-flex align-items-center gap-4'>
                <span><Link to='#'><i className="fa-brands fa-youtube"></i></Link></span>
                <span><Link to='#'><i className="fa-brands fa-github"></i></Link></span>
                <span><Link to='#'><i className="fa-brands fa-instagram"></i></Link></span>
                <span><Link to='#'><i className="fa-brands fa-facebook"></i></Link></span>
              </div> */}
            </div>
            {/* <div>Millennium Model School</div> */}
          </Col>

          <Col lg='2'>
            <h5 className='quickLinks'>Quick Links</h5>
            <ListGroup className='footer-quick-links'>
              {
                quick_links.map((link, idx) => <ListGroupItem className=' underline quick_underline ps-0 border-0' key={idx}><i className="fa-solid fa-arrow-up-right-from-square me-2"></i><Link to={link.path}>{link.display}</Link></ListGroupItem>)
              }
            </ListGroup>
          </Col>

          <Col lg='4'>
            <h5 className='contact'>Contact</h5>
            <ListGroup className='footer-quick-links'>
              <ListGroupItem className='underline ps-0 border-0'>
                <h6 className='d-flex align-items-center gap-3'>
                  <span><i className="fa-solid fa-location-dot"></i></span>
                  Address :
                </h6>
                <p className='mb-0'>Millennium Model School Khajrod Road, Mandi Bamora, M.P.</p>
              </ListGroupItem>
            </ListGroup>

            <ListGroup className='footer-quick-links'>
              <ListGroupItem className='underline ps-0 border-0'>
                <h6 className='d-flex align-items-center gap-3'>
                  <span><i className="fa-solid fa-envelope"></i></span>
                  Email :
                </h6>
                <p className='mb-0'>millenniummodel2000@gmail.com</p>
              </ListGroupItem>
            </ListGroup>

            <ListGroup className='footer-quick-links'>
              <ListGroupItem className='underline ps-0 border-0'>
                <h6 className='d-flex align-items-center gap-3'>
                  <span><i className="fa-solid fa-phone"></i></span>
                  Phone :
                </h6>
                <p className='mb-0'>+91-9926336071, +91-8982352628</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg='3'>
            <div className="address_map_footer">
              <iframe title='Map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3643.1240516105204!2d78.08112467544213!3d24.061935678459104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3979678bd2b7e55b%3A0x216132c20b2b6013!2sMillennium%20Model%20School!5e0!3m2!1sen!2sin!4v1691687388183!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </Col>

        </Row>
      </Container>
      <div lg='12' className='mt-5 copyright_main'>
        <p className='copyright'>Copyright &#169; {2023}, Millennium Model School, Mandi Bamora</p>
        <p className='copyright'>Developed by <a href='https://www.linkedin.com/in/devesh-raghuvanshi-624040239/' target='_blank' rel="noreferrer">Devesh</a> and <a href='https://www.linkedin.com/in/mamatva-jain-094798218/' target='_blank' rel="noreferrer"> Mamatva</a> </p>
      </div>
    </footer>
  )
}

export default Footer
