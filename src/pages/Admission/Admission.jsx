import React from 'react'
import './Admission.css'
import { Col, Container, Row } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import pic from '../../assets/images/Contactus.png'
import { Fade } from "react-awesome-reveal";

const Admission = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/admission/apply')
  }

  const d = new Date();
  const currMonth = d.getMonth()
  const currYear = d.getFullYear()

  return (
    <>
      <Navbar />
      <Fade>
      {(currMonth <= 2 || currMonth >= 8) &&
        <section className="imgHeadingAdmission imgHeadingImg">
          <Container>
            <Row>
              <Col lg="12">
                <h1 className="imgHeadingHead">Admission</h1>
              </Col>
            </Row>
          </Container>
        </section>}
      <div className="admission_main_cont">
        <div className="admission_upper_alert">
          <Col lg="12" className="admissionLeftBox d-flex align-items-center justify-content-center">
            <div className="text-center">
              {(currMonth >= 3 && currMonth <= 7) ? (
                <div>
                  <h1 className="my-2">Admissions Open!</h1>
                  <h4 className="my-2">
                    Session {currYear}-{currYear - 2000 + 1}
                  </h4>
                  <button onClick={handleClick} className="add_faculty_submit_btn my-2">
                    Apply Now
                  </button>
                </div>
              ) : (
                <div className='w-100'>
                  <h5 className="my-2">-- ADMISSIONS BEGIN FROM APRIL --</h5>
                </div>
              )}
            </div>
          </Col>
        </div>
        <Row className="gap-5 admission_lower_box">
          <Col lg="5" >
            <img src={pic} alt="" />
          </Col>
          <Col lg="6" className="admissionRightBox">
            <h4 className="text-center mt-2 mb-4">Admission Process</h4>
            <ul className="admissionProcess">
              <li>
                You can fill the registration form online at <a className='schoolLink' href='https://millenniummodelschool.tech/'>millenniummodelschool.tech</a> .
              </li>
              <li>
                Fill the registration form with all the required information
                including personal information, parent's information, contact
                information. After filling all the required details download and
                print the registration form.
              </li>
              <li>
                Parents are required to submit the registration form along with
                admission fee and following doucments to the admission counselor
                in the school
              </li>
              <ul className="requiredDocuments">
                <li>Passport Size Photo of the student</li>
                <li>Copy of Aadhar Card of the student</li>
                <li>Copy of Birth Certificate of the student</li>
                <li>Copy of Samagra ID</li>
                <li>Copy of bank passbook of any family member</li>
                <li>
                  Transfer Certificate (T.C.) and copy of marksheet of last year
                  (if the student was in any previous institution)
                </li>
              </ul>
              <li>
                After the verification of registration form by the admission
                counselor, student will be admitted in the school.
              </li>
            </ul>
          </Col>
        </Row>
        <div className="admission_upper_alert">
          <Col lg="12" className="admissionLeftBox d-flex align-items-center justify-content-center">
            <div className="text-center">
              {(currMonth >= 3 && currMonth <= 7) ? (
                <div>
                  <h1 className="my-2">Admissions Open!</h1>
                  <h4 className="my-2">
                    Session {currYear}-{currYear - 2000 + 1}
                  </h4>
                  <button onClick={handleClick} className="add_faculty_submit_btn my-2">
                    Apply Now
                  </button>
                </div>
              ) : (
                <div className='w-100'>
                  <h5 className="my-2">-- ADMISSIONS BEGIN FROM APRIL --</h5>
                </div>
              )}
            </div>
          </Col>
        </div>
      </div>
      <Footer mode="light" />
      </Fade>
    </>
  )
}

export default Admission
