import React, { useState } from 'react'
import './AddStudent.css'
import { BASE_URL } from '../../../../config/config'
import axios from 'axios'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import Navbar from '../../../Navbar/Navbar'
import Footer from '../../../Footer/Footer'
import reverseDate from '../../../../utils/rverseDate'
import { studentObj } from '../../../../templateObjects/templateObjects'
import 'react-alert-confirm/lib/style.css';
import AlertConfirm from 'react-alert-confirm';
import { useAuth } from '../../../../Hooks/auth'
import Loader from '../../../Loader/Loader'
import { toast } from 'react-toastify';



const AddStudent = () => {
    var today = new Date().toISOString().split('T')[0];
    const { cookies } = useAuth();

    const [studentDetails, setstudentDetails] = useState(studentObj);
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setstudentDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (/^\d+$/.test(studentDetails.phNo) === false || studentDetails.phNo.length !== 10) {
            return toast.error("Invalid phone number!", {
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
        if (studentDetails.aadhar.length !== '-' && (/^\d+$/.test(studentDetails.aadhar) === false || studentDetails.aadhar.length !== 12)) {
            return toast.error("Invalid aadhar number!", {
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
        if (studentDetails.sssm !== '-' && (/^\d+$/.test(studentDetails.sssm) === false || studentDetails.sssm.length !==9)) {
            return toast.error("Invalid samagra ID", {
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
            studentDetails.dob = reverseDate(studentDetails.dob);
            studentDetails.doa = reverseDate(studentDetails.doa);
            const accessToken = cookies.token;
            await axios.post(`${BASE_URL}/student/createstudent`, studentDetails,
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                });
            toast.success("Student added successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            setLoading(false);
            setTimeout(() => {
                window.location.reload();
            }, [1000]);

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
            {loading ? (
                <Loader />
            ) : (
                <Container className="add_student_main_cont">
                    <Form onSubmit={submitHandler}>
                        <h1>Add Student</h1>
                        <Container>
                            <Row>
                                <Col lg="4">
                                    <FormGroup>
                                        <label className="mb-2" htmlFor="name">
                                            Name
                                        </label>
                                        <div className="facInputBox">
                                            <input
                                                type="text"
                                                id="name"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label className="mb-2" htmlFor="fName">
                                            Father's Name
                                        </label>
                                        <div className="facInputBox">
                                            <input
                                                type="text"
                                                id="fName"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label className="mb-2" htmlFor="mName">
                                            Mother's Name
                                        </label>
                                        <div className="facInputBox">
                                            <input
                                                type="text"
                                                id="mName"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label className="mb-2" htmlFor="dob">
                                            Date of Birth
                                        </label>
                                        <div className="facInputBox">
                                            <input
                                                type="date"
                                                max={today}
                                                id="dob"
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label className="mb-2" htmlFor="address">
                                            Address
                                        </label>
                                        <div className="facInputBox">
                                            <input
                                                type="text"
                                                id="address"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label className="mb-2" htmlFor="phNo">
                                            Phone Number
                                        </label>
                                        <div className="facInputBox">
                                            <input
                                                type="text"
                                                id="phNo"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label className="mb-2" htmlFor="photo">
                                            Student's Image Link
                                        </label>
                                        <div className="facInputBox">
                                            <input type="text" id="photo" onChange={handleChange} />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label className="mb-2" htmlFor="class">
                                            Class
                                        </label>
                                        <div className="facInputBox">
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                id="class"
                                                required
                                                onChange={handleChange}
                                            >
                                                <option value="">--Select--</option>
                                                <option value={"Nursery"}>Nursery</option>
                                                <option value={"LKG"}>LKG</option>
                                                <option value={"UKG"}>UKG</option>
                                                <option value={"1st"}>1st</option>
                                                <option value={"2nd"}>2nd</option>
                                                <option value={"3rd"}>3rd</option>
                                                <option value={"4th"}>4th</option>
                                                <option value={"5th"}>5th</option>
                                                <option value={"6th"}>6th</option>
                                                <option value={"7th"}>7th</option>
                                                <option value={"8th"}>8th</option>
                                            </select>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label className="mb-2" htmlFor="admNo">
                                            Admission Number
                                        </label>
                                        <div className="facInputBox">
                                            <input
                                                type="text"
                                                id="admNo"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label className="mb-2" htmlFor="category">
                                            Category
                                        </label>
                                        <div className="facInputBox">
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                id="category"
                                                required
                                                onChange={handleChange}
                                            >
                                                <option value="">--Select--</option>
                                                <option value={"General"}>General</option>
                                                <option value={"OBC"}>OBC</option>
                                                <option value={"SC"}>SC</option>
                                                <option value={"ST"}>ST</option>
                                            </select>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label className="mb-2" htmlFor="gender">
                                            Gender
                                        </label>
                                        <div className="facInputBox">
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                id="gender"
                                                required
                                                onChange={handleChange}
                                            >
                                                <option value="">--Select--</option>
                                                <option value={"Male"}>Male</option>
                                                <option value={"Female"}>Female</option>
                                                <option value={"Other"}>Other</option>
                                            </select>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label className="mb-2" htmlFor="aadhar">
                                            Aadhar Number
                                        </label>
                                        <div className="facInputBox">
                                            <input
                                                type="text"
                                                id="aadhar"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label className="mb-2" htmlFor="sssm">
                                            Samagra Id
                                        </label>
                                        <div className="facInputBox">
                                            <input
                                                type="text"
                                                id="sssm"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label className="mb-2" htmlFor="doa">
                                            Date of Admission
                                        </label>
                                        <div className="facInputBox">
                                            <input
                                                type="date"
                                                max={today}
                                                id="doa"
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label className="mb-2" htmlFor="admClass">
                                            Class of Admission
                                        </label>
                                        <div className="facInputBox">
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                id="admClass"
                                                required
                                                onChange={handleChange}
                                            >
                                                <option value="">--Select--</option>
                                                <option value={"Nursery"}>Nursery</option>
                                                <option value={"LKG"}>LKG</option>
                                                <option value={"UKG"}>UKG</option>
                                                <option value={"1st"}>1st</option>
                                                <option value={"2nd"}>2nd</option>
                                                <option value={"3rd"}>3rd</option>
                                                <option value={"4th"}>4th</option>
                                                <option value={"5th"}>5th</option>
                                                <option value={"6th"}>6th</option>
                                                <option value={"7th"}>7th</option>
                                                <option value={"8th"}>8th</option>
                                            </select>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label className="mb-2" htmlFor="nationality">
                                            Nationality
                                        </label>
                                        <div className="facInputBox">
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                id="nationality"
                                                required
                                                onChange={handleChange}
                                            >
                                                <option value="">--Select--</option>
                                                <option value={"Indian"}>Indian</option>
                                                <option value={"Other"}>Other</option>
                                            </select>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col className="add_faculty_submit_btn_box" lg="12">
                                    <button className="add_faculty_submit_btn" type="submit">
                                        Add
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Container>
            )}
            <Footer mode="dark" />
        </>

    )
}

export default AddStudent
