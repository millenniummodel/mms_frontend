import React from 'react'
import './ContactUs.css'
import { Col, Container, Row } from 'reactstrap';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import contact from '../../assets/images/contact_us.png'
import { toast } from 'react-toastify';
import { Fade } from "react-awesome-reveal";

import {
  EMAIL_PUBLIC_KEY,
  EMAIL_SERVICE_ID,
  EMAIL_TEMPLATE_ID,
} from "../../config/config";
import emailjs from "emailjs-com";

const ContactUs = () => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, e.target, EMAIL_PUBLIC_KEY)
      .then(
        (result) => {
          toast.success("Message sent successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
        (error) => {
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      );
    e.target.reset();
  };
  return (
    <>
      <Navbar />
      <Fade>
      <section className="imgHeadingContacts imgHeadingImg">
        <Container>
          <Row>
            <Col lg="12">
              <h1 className="imgHeadingHead">Contact us</h1>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="contact_main_cont">
        <div className="contact_upper_cont">
          <div className="address_map">
            <iframe title='Map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3643.1240516105204!2d78.08112467544213!3d24.061935678459104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3979678bd2b7e55b%3A0x216132c20b2b6013!2sMillennium%20Model%20School!5e0!3m2!1sen!2sin!4v1691687388183!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className="contact_info_main">
            <h2 className="cont_info_box cont_info_title">Millenium Model School</h2>
            <div className="cont_info_box">
              <h5 className="cont_info_head">Office Hours:</h5>
              <div className="cont_info_details">11:30 AM - 3:00 PM</div>
            </div>
            <div className="cont_info_box">
              <h5 className="cont_info_head">Address:</h5>
              <div className="cont_info_details">Khajrod Road, Mandi Bamora, Sagar District, Madhya Pradesh - 464240</div>
            </div>
            <div className="cont_info_box">
              <h5 className="cont_info_head">Phone Number:</h5>
              <div className="cont_info_details">+91-8770719148, +91-8982352628</div>
            </div>
            <div className="cont_info_box">
              <h5 className="cont_info_head">Email:</h5>
              <div className="cont_info_details">millenniummodel2000@gmail.com</div>
            </div>
          </div>
        </div>
        <div className="contact_cont">
          <div className="contact_form">
            <h4 className="mb-3 text-center">Drop an Email</h4>
            <form onSubmit={handleOnSubmit}>

              <div className="mb-3">
                <label
                  htmlFor="contactemail"
                  className="form-label"
                >
                  Email Address:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="contactemail"
                  placeholder="Your Email Address"
                  name="from_email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contactname" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contactname"
                  placeholder="Your Name"
                  name="from_name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="contactmessage" className="form-label">
                  Message:
                </label>
                <textarea
                  className="form-control"
                  id="contactmessage"
                  rows="5"
                  defaultValue={""}
                  style={{ height: "100%" }}
                  name="message"
                />
              </div>
              <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>

          <div className="contact_form_img1">
            <img src={contact} alt="" />
          </div>
        </div>
      </div>
      <Footer mode="light" />
      </Fade>
    </>
  );
};


export default ContactUs
