import React from 'react'
import './UniformCode.css'
import { Col, Container, Row } from 'reactstrap'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import mShirt from '.././../assets/uniforms/maroonShirt.jpg'
import mTunic from '.././../assets/uniforms/maroonTunic.jpeg'
import sweater from '.././../assets/uniforms/sweater.jpg'
import wPant from '.././../assets/uniforms/whitePant.jpg'
import wShirt from '.././../assets/uniforms/whiteShirt.jpg'
import wTunic from '.././../assets/uniforms/whiteTunic.jpg'
import mPant from '.././../assets/uniforms/maroonPant.jpg'
import { Fade } from "react-awesome-reveal";

const UniformCode = () => {
    return (
        <>
            <Navbar />
            <Fade>
            <section className="imgHeadingUniform imgHeadingImg">
                <Container>
                    <Row>
                        <Col lg="12">
                            <h1 className="imgHeadingHead">Uniform Code</h1>
                        </Col>
                    </Row>
                </Container>
            </section>
            <div className="uniform_section">
                <h2>Monday, Tuesday, Wednesday, Friday, Saturday</h2>
                <section className="uniform_main">
                    <div className="uniform_main_img">
                        <div>
                            <img src={mShirt} alt='Not available' />
                        </div>

                        <div>
                            <img src={mPant} alt='Not available' />
                        </div>

                        <div>
                            <img src={sweater} alt='Not available' />
                        </div>
                    </div>
                    <div className="uniform_main_content">
                        <h3 className="uniform_title">For Boys:</h3>
                        <ul>
                            <li>Full Sleeves White Maroon Checks Shirt</li>
                            <li>Maroon Full Pants</li>
                            <li>School Tie</li>
                            <li>Black Socks</li>
                            <li>Black Shoes</li>
                            <li>Maroon Sweater (Winter)</li>
                        </ul>
                    </div>
                </section>
                <section className="uniform_main uniform_main_even">
                    <div className="uniform_main_content">
                        <h3 className="uniform_title">For Girls:</h3>
                        <ul>
                            <li>Full Sleeves White Maroon Checks Shirt</li>
                            <li>Maroon Tunic</li>
                            <li>School Tie</li>
                            <li>Black Socks</li>
                            <li>Black Shoes</li>
                            <li>Maroon Sweater (Winter)</li>
                        </ul>
                    </div>
                    <div className="uniform_main_img">
                        <div>
                            <img src={mShirt} alt='Not available' />
                        </div>

                        <div>
                            <img src={mTunic} alt='Not available' />
                        </div>

                        <div>
                            <img src={sweater} alt='Not available' />
                        </div>
                    </div>
                </section>
            </div>
            <div className="uniform_section">
                <h2>Thursday</h2>
                <section className="uniform_main">
                    <div className="uniform_main_img">
                        <div>
                            <img src={wShirt} alt='Not available' />
                        </div>

                        <div>
                            <img src={wPant} alt='Not available' />
                        </div>

                        <div>
                            <img src={sweater} alt='Not available' />
                        </div>
                    </div>
                    <div className="uniform_main_content">
                        <h3 className="uniform_title">For Boys:</h3>
                        <ul>
                            <li>Full Sleeves White Shirt</li>
                            <li>White Full Pants</li>
                            <li>School Tie</li>
                            <li>White Socks</li>
                            <li>White Shoes</li>
                            <li>Maroon Sweater (Winter)</li>
                        </ul>
                    </div>
                </section>
                <section className="uniform_main uniform_main_even mb-5">
                    <div className="uniform_main_content">
                        <h3 className="uniform_title">For Girls:</h3>
                        <ul>
                            <li>Full Sleeves White Shirt</li>
                            <li>White Tunic</li>
                            <li>School Tie</li>
                            <li>White Socks</li>
                            <li>White Shoes</li>
                            <li>Maroon Sweater (Winter)</li>
                        </ul>
                    </div>
                    <div className="uniform_main_img">
                        <div>
                            <img src={wShirt} alt='Not available' />
                        </div>

                        <div>
                            <img src={wTunic} alt='Not available' />
                        </div>

                        <div>
                            <img src={sweater} alt='Not available' />
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
            </Fade>
        </>
    )
}

export default UniformCode
