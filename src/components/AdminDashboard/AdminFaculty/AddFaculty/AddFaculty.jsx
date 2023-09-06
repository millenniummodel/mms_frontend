import React, { useState } from 'react'
import './AddFaculty.css'
import { BASE_URL } from '../../../../config/config'
import axios from 'axios'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import Footer from '../../../Footer/Footer'
import Navbar from '../../../Navbar/Navbar'
import { facultyObj } from '../../../../templateObjects/templateObjects'
import 'react-alert-confirm/lib/style.css';
import AlertConfirm from 'react-alert-confirm';
import { useAuth } from '../../../../Hooks/auth'
import Loader from '../../../Loader/Loader'
import { toast } from 'react-toastify';

const AddFaculty = () => {
  const [facultyDetails, setfacultyDetails] = useState(facultyObj)
  const [loading, setLoading] = useState(false)
  const { cookies } = useAuth();

  const handleChange = e => {
    setfacultyDetails(prev => ({ ...prev, [e.target.id]: e.target.value }))
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (/^\d+$/.test(facultyDetails.facultyPhone) === false || facultyDetails.facultyPhone.length !== 10) {
      return toast.error("Invalid phone no.!", {
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
    try {
      const [isOk] = await AlertConfirm('Are you sure?');
      if (!isOk) return

      setLoading(true);
      const accessToken = cookies.token;
      await axios.post(`${BASE_URL}/faculty`, facultyDetails,
        {
          headers: {
            token: `Bearer ${accessToken}`
          }
        });
      setLoading(false);
      toast.success("Faculty added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);


    } catch (err) {
      setLoading(false);
      return toast.error("Something went wrong!", {
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


  }
  return (
    <>
      <Navbar />
      {loading ? <Loader /> : <Container className="add_faculty_main_cont">
        <Form onSubmit={submitHandler}>
          <h1>Add Faculty</h1>
          <Container>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="mb-2" htmlFor="facultyName">
                    Name
                  </label>
                  <div className="facInputBox">
                    <input
                      type="text"
                      id="facultyName"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="mb-2" htmlFor="facultyEducation">
                    Education
                  </label>
                  <div className="facInputBox">
                    <input
                      type="text"
                      id="facultyEducation"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="mb-2" htmlFor="facultyDesignation">
                    Designation
                  </label>
                  <div className="facInputBox">
                    <select
                      className="form-select"
                      id="facultyDesignation"
                      required
                      onChange={handleChange}
                    >
                      <option value="">--Select--</option>
                      <option value={"Pre-Primary School Teacher"}>Pre-Primary School Teacher</option>
                      <option value={"Primary School Teacher"}>Primary School Teacher</option>
                      <option value={"Middle School Teacher"}>Middle School Teacher</option>
                      <option value={"High School Teacher"}>High School Teacher</option>
                    </select>
                  </div>
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="mb-2" htmlFor="facultyExperience">
                    Experience
                  </label>
                  <div className="facInputBox">
                    <input
                      type="number"
                      id="facultyExperience"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="mb-2" htmlFor="facultyImage">
                    Image Link
                  </label>
                  <div className="facInputBox">
                    <input
                      type="text"
                      id="facultyImage"
                      onChange={handleChange}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="mb-2" htmlFor="facultyPhone">
                    Phone Number
                  </label>
                  <div className="facInputBox">
                    <input
                      type="text"
                      id="facultyPhone"
                      onChange={handleChange}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="add_faculty_submit_btn_box" lg="12">
                <button className="add_faculty_submit_btn" type="submit">
                  Add
                </button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Container>}
      <Footer mode="dark" />
    </>

  )
}

export default AddFaculty
