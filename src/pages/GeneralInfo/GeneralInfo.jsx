import React from 'react'
import './GeneralInfo.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Col, Container, Row } from 'reactstrap'
import { Fade } from "react-awesome-reveal";


const GeneralInfo = () => {
    return (
        <>
            <Navbar />
            <Fade>
            <section className='imgHeadingGeneralInfo imgHeadingImg mb-5'>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <h1 className='imgHeadingHead'>General Information</h1>
                        </Col>
                    </Row>
                </Container>
            </section>
            
            <Row className='general_info_main'>
                <div className='general_info_row'><div className='general_info_left'>School Name</div> <div className='general_info_right'>Millennium Model School</div></div>
                <div className='general_info_row'><div className='general_info_left'>DISE Code</div> <div className='general_info_right'>23110414101</div></div>
                <div className='general_info_row'><div className='general_info_left'>District</div> <div className='general_info_right'>Sagar, Madhya Pradesh</div></div>
                <div className='general_info_row'><div className='general_info_left'>Address</div> <div className='general_info_right'>Khajrod road, Mandi Bamora</div></div>
                <div className='general_info_row'><div className='general_info_left'>Email</div> <div className='general_info_right'>millenniummodel2000@gmail.com</div></div>
                <div className='general_info_row'><div className='general_info_left'>Phone No.</div> <div className='general_info_right'>9926336071, 8982352628</div></div>
            </Row>
            <Footer mode="dark" />
            </Fade>
        </>
    )
}

export default GeneralInfo
