import React from 'react'
import './Home.css'
import Notice from '../../components/Notice/Notice'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import image from '../../assets/images/loginImg.png'
import AdmissionButton from '../../components/AdmissionButton/AdmissionButton'
import { Fade } from "react-awesome-reveal";

const Home = () => {
    const d = new Date();
    const currMonth = d.getMonth()
    return (
        <>
            <Navbar />
            <Fade>
            <div className="banner">
                <div className="nameBox">
                    <div className="title">
                        Millennium Model School
                    </div>
                    <div className="headline">Where Learning Becomes Passion</div>
                </div>
            </div>


            <div className="home_abt">
                <div className="abt_parts abt_left">
                    <h3>Welcome</h3>
                    <p>We believe that every student has the potential to succeed and thrive. Our dedicated team of educators is committed to providing an exceptional educational experience that fosters intellectual growth, critical thinking, and character development.
                    </p>
                    <p>Our school is not just a place of learning, but a second home where students feel safe, inspired, and encouraged to explore their passions.</p>
                </div>
                <div className="img_gallery">
                    <img src={image} alt="" />
                </div>
            </div>


            <div className="topBanner">
                <div className="topBanner_head col-md-3">
                    <p className="topBanner_welcome">You are welcome</p>
                    <p>Discover what do we offer</p>
                </div>
                <div className="topBanner_cat col-md-2">
                    <i className="fa-solid fa-graduation-cap"></i>
                    <p className='topbanner_cat_head'>Quality Education</p>
                </div>
                <div className="topBanner_cat col-md-2">
                    <i className="fa-solid fa-person-chalkboard"></i>
                    <p className='topbanner_cat_head'>Experienced
                        Faculties</p>
                </div>
                <div className="topBanner_cat col-md-2">
                    <i className="fa-solid fa-puzzle-piece"></i>
                    <p className='topbanner_cat_head'>Co-Curricular Activities</p>
                </div>
                <div className="topBanner_cat col-md-2">
                    <i className="fa-solid fa-book"></i>
                    <p className='topbanner_cat_head'>Advanced Curriculum</p>
                </div>
            </div>

            <Notice />
            <Footer />
            {(currMonth >= 3 && currMonth <= 7) && <AdmissionButton />}
            </Fade>
        </>
    )
}

export default Home
