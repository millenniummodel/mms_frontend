import React from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import principalImg from '../../assets/images/principal.jpg'
import './PrincipalMessage.css'
import { Col, Container, Row } from 'reactstrap'
import { Fade } from "react-awesome-reveal";

const PrincipalMessage = () => {
    return (
        <>
            <Navbar />
            <Fade>
            <section className="imgHeadingPrincipal imgHeadingImg">
                <Container>
                    <Row>
                        <Col lg="12">
                            <h1 className='imgHeadingHead'>Principal's Message</h1>
                        </Col>
                    </Row>
                </Container>
            </section>
            <div className="principal_main_cont">
                <div className="principal_left_cont">
                    <img src={principalImg} alt="" />
                    <h4>Pramod Jakheria</h4>
                </div>
                <div className="principal_right_cont">
                    <p className='fw-bold'> Dear Students, Parents, and Guardians,</p>
                    <p>Welcome to Millennium Model School, a place where learning comes to life and dreams take flight!</p>
                    <p>As the proud principal of this remarkable institution, I am thrilled to welcome you to our vibrant community of learners. At Millennium Model School, we are committed to nurturing not only academic excellence but also personal growth, character development, and a strong sense of community.</p>
                    <p>Our dedicated team of educators strives to create a safe, inclusive, and stimulating environment where each student's unique talents are recognized and celebrated. We believe in fostering a love for learning, critical thinking, and creativity that will empower our students to navigate a rapidly changing world with confidence.</p>
                    <p>Collaboration and open communication are at the heart of our approach. We encourage parents and guardians to actively engage with us in your child's educational journey. Together, we can ensure that each student reaches their highest potential and achieves their aspirations.</p>
                    <p>As we embark on another exciting academic year, I invite you to explore our website, learn more about our programs, faculty, and facilities, and become a part of the Millennium Model School family. Feel free to reach out with any questions or to schedule a visit. We look forward to partnering with you in creating a bright and promising future for our students.</p>
                    <p className='mt-2'>Warm regards,</p>
                    <div className='mt-2 text-end'>
                        <p className='principal_right_name'>Pramod Jhakeria</p>
                        <p>Principal</p>
                    </div>
                </div>
            </div>
            <Footer mode="dark" />
            </Fade>
        </>
    )
}



export default PrincipalMessage
