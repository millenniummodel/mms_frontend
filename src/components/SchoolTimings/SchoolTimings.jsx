import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Col, Container, Row } from 'reactstrap'
import './SchoolTimings.css'
import { Fade } from "react-awesome-reveal";

const SchoolTimings = () => {
  return (
    <>
      <Navbar />
      <Fade>
      <section className="imgHeadingSchoolTimings imgHeadingImg">
        <Container>
          <Row>
            <Col lg="12">
              <h1 className="imgHeadingHead">School Timings</h1>
            </Col>
          </Row>
        </Container>
      </section>
      <Container className='d-flex justify-content-center align-items-center text-center p-5'>
        <Row className='border p-4'>
          <Col lg='12' className='mb-5'>
            <h3 className='mb-2 text-decoration-underline'>School Timings</h3>
            <p className='fs-5'>Monday to Saturday - 11:00 AM to 04:00 PM</p>
          </Col>

          <Col lg='12' className=''>
            <h3 className='mb-2 text-decoration-underline'>Office Timing</h3>
            <p className='fs-5'>Monday to Friday - 11:30 AM to 03:00 PM</p>
          </Col>
        </Row>
      </Container>
      <Footer />
      </Fade>
    </>
  )
}

export default SchoolTimings
