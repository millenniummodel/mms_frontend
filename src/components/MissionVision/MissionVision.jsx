import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Col, Container, Row } from 'reactstrap'
import Footer from '../Footer/Footer'
import './MissionVision.css'
import { Fade } from "react-awesome-reveal";

const MissionVision = () => {
    return (
        <>
            <Navbar />
            <Fade>
            <section className='imgHeadingMission imgHeadingImg mb-5'>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <h1 className='imgHeadingHead'>Mission and Vision</h1>
                        </Col>
                    </Row>
                </Container>
            </section>
            <div className="mission_main_cont">
                <div className="mission">
                    <h3>Mission</h3>
                    <p>At Millenium Model School, our mission is to provide a nurturing and inclusive learning environment that empowers students to achieve their fullest potential. We are dedicated to fostering a passion for lifelong learning, cultivating critical thinking skills, and nurturing creativity. Through personalized education, a diverse curriculum, and a commitment to character development, we aim to shape responsible global citizens who contribute positively to society.</p>
                </div>
                <div className="mission">
                    <h3>Vision</h3>
                    <p>Our vision is to be a premier institution known for excellence in education and character development. We aspire to cultivate a community of learners who embrace challenges, demonstrate resilience, and strive for excellence in all aspects of their lives. By fostering a culture of collaboration, innovation, and continuous improvement, we aim to empower our students to become compassionate leaders who drive positive change in a rapidly evolving world.</p>
                </div>
            </div>
            <Footer />

            </Fade>
        </>
    )
}

export default MissionVision
