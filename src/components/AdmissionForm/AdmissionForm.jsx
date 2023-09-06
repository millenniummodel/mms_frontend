import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import VerifyForm from './VerifyForm'
import './AdmissionForm.css'
import { studentAdmObj } from '../../templateObjects/templateObjects';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { toast } from 'react-toastify';
import { Fade } from "react-awesome-reveal";


const AdmissionForm = () => {

    const d = new Date();
    const currMonth = d.getMonth()
    const currYear = d.getFullYear()


    const [verify, setVerify] = useState(false)
    const [studentDetails, setStudentDetails] = useState(studentAdmObj)

    const submitHandler = (e) => {
        e.preventDefault()
        if (
            /^\d+$/.test(studentDetails.phone) === false || studentDetails.phone.length !== 10) {
            return toast.error("Invalid phone number!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        if (
            studentDetails.alternatePhone !== "" &&
            (/^\d+$/.test(studentDetails.alternatePhone) === false ||
                studentDetails.alternatePhone.length !== 10)){
            return toast.error("Invalid alternate phone number!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }

        if (/^\d+$/.test(studentDetails.aadhar) === false || studentDetails.aadhar.length !== 12) {
            return toast.error("Invalid aaadhar number!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }

        if (
            /^\d+$/.test(studentDetails.samagraID) === false || studentDetails.samagraID.length !== 9) {
            return toast.error("Invalid Samagra ID!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        setVerify(true)
    }

    var today = new Date().toISOString().split('T')[0];

    const handleChange = e => {
        setStudentDetails(prev => ({ ...prev, [e.target.id]: e.target.value }))
    };

    const editDetails = () => {
        setVerify(false);
    }

    return (
        <>
        <Fade>
            {(currMonth >= 3 && currMonth <= 7) ? (
                <div> 
                    {!verify && (
                        <>
                            <Navbar />
                            <div id="admForm_main">
                                <Container className="admission_form_main_cont">
                                    <Form className="admissionForm" onSubmit={submitHandler}>
                                        <h1>Admission Form</h1>
                                        <h6 className="text-center">Session {currYear} - {currYear + 1}</h6>
                                        <Container>
                                            <Row>
                                                <h4 className="detailType my-4">Student's Details</h4>
                                            </Row>
                                            <Row className="w-100">
                                                <Col lg="10" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="studentName">
                                                            Student's Name<span>*</span>
                                                        </label>
                                                        <div className="inputBox">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={studentDetails.studentName}
                                                                id="studentName"
                                                                required
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="class">
                                                            Admission for Class<span>*</span>
                                                        </label>
                                                        <div className="inputBox">
                                                            <select
                                                                className="form-select"
                                                                aria-label="Default select example"
                                                                id="class"
                                                                value={studentDetails.class}
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
                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="gender">
                                                            Gender<span>*</span>
                                                        </label>
                                                        <div className="inputBox">
                                                            <select
                                                                className="form-select"
                                                                aria-label="Default select example"
                                                                id="gender"
                                                                value={studentDetails.gender}
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
                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="category">
                                                            Category<span>*</span>
                                                        </label>
                                                        <div className="inputBox">
                                                            <select
                                                                className="form-select"
                                                                aria-label="Default select example"
                                                                id="category"
                                                                value={studentDetails.category}
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
                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="dob">
                                                            Date of birth<span>*</span>
                                                        </label>
                                                        <div className="inputBox">
                                                            <input
                                                                className="form-control"
                                                                type="date"
                                                                max={today}
                                                                id="dob"
                                                                value={studentDetails.dob}
                                                                required
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="aadhar">
                                                            Aadhar Number<span>*</span>
                                                        </label>
                                                        <div className="inputBox">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                id="aadhar"
                                                                required
                                                                value={studentDetails.aadhar}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="samagraID">
                                                            Samagra ID<span>*</span>
                                                        </label>
                                                        <div className="inputBox">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                id="samagraID"
                                                                required
                                                                value={studentDetails.samagraID}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Container>

                                        <Container>
                                            <Row>
                                                <h4 className="detailType my-4">Parent's Details</h4>
                                            </Row>
                                            <Row className="w-100">
                                                <Col lg="10" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="fatherName">
                                                            Father's Name<span>*</span>
                                                        </label>
                                                        <div className="inputBox">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                id="fatherName"
                                                                value={studentDetails.fatherName}
                                                                required
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="10" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="motherName">
                                                            Mother's Name<span>*</span>
                                                        </label>
                                                        <div className="inputBox">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                id="motherName"
                                                                value={studentDetails.motherName}
                                                                required
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="fatherOccupation">
                                                            Father's Occupation
                                                        </label>
                                                        <div className="inputBox">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                id="fatherOccupation"
                                                                value={studentDetails.fatherOccupation}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="fatherIncome">
                                                            Father's Income (in Rs.)
                                                        </label>
                                                        <div className="inputBox">
                                                            <input
                                                                className="form-control"
                                                                type="number"
                                                                id="fatherIncome"
                                                                value={studentDetails.fatherIncome}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="motherOccupation">
                                                            Mother's Occupation
                                                        </label>
                                                        <div className="inputBox">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="motherOccupation"
                                                                value={studentDetails.motherOccupation}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="motherIncome">
                                                            Mother's Income (in Rs.)
                                                        </label>
                                                        <div className="inputBox">
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                id="motherIncome"
                                                                value={studentDetails.motherIncome}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Container>

                                        <Container>
                                            <Row>
                                                <h4 className="detailType my-4">Contact Details</h4>
                                            </Row>
                                            <Row className="w-100">
                                                <Col lg="10" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="permanentAddress">
                                                            Permanent Address<span>*</span>
                                                        </label>
                                                        <div className="inputBox">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="permanentAddress"
                                                                required
                                                                value={studentDetails.permanentAddress}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                <Col lg="10" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="localAddress">
                                                            Local Address
                                                        </label>
                                                        <div className="inputBox">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="localAddress"
                                                                value={studentDetails.localAddress}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="phone">
                                                            Phone Number<span>*</span>
                                                        </label>
                                                        <div className="inputBox">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="phone"
                                                                required
                                                                value={studentDetails.phone}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="alternatePhone">
                                                            Alternate Phone Number
                                                        </label>
                                                        <div className="inputBox">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="alternatePhone"
                                                                value={studentDetails.alternatePhone}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Container>

                                        <Container>
                                            <Row>
                                                <h4 className="detailType my-4">Additional Details</h4>
                                            </Row>
                                            <Row className="w-100">
                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="religion">
                                                            Religion
                                                        </label>
                                                        <div className="inputBox">
                                                            <select
                                                                className="form-select"
                                                                aria-label="Default select example"
                                                                id="religion"
                                                                value={studentDetails.religion}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">--Select--</option>
                                                                <option value={"Hindu"}>Hindu</option>
                                                                <option value={"Islam"}>Islam</option>
                                                                <option value={"Jain"}>Jain</option>
                                                                <option value={"Sikh"}>Sikh</option>
                                                                <option value={"Parsi"}>Parsi</option>
                                                            </select>
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="caste">
                                                            Caste
                                                        </label>
                                                        <div className="inputBox">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="caste"
                                                                value={studentDetails.caste}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="nationality">
                                                            Nationality
                                                        </label>
                                                        <div className="inputBox">
                                                            <select
                                                                className="form-select"
                                                                aria-label="Default select example"
                                                                id="nationality"
                                                                value={studentDetails.nationality}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">--Select--</option>
                                                                <option value={"Indian"}>Indian</option>
                                                                <option value={"Other"}>Other</option>
                                                            </select>
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="motherTounge">
                                                            Mother Tounge
                                                        </label>
                                                        <div className="inputBox">
                                                            <select
                                                                className="form-select"
                                                                aria-label="Default select example"
                                                                id="motherTounge"
                                                                value={studentDetails.motherTounge}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">--Select--</option>
                                                                <option value={"Hindi"}>Hindi</option>
                                                                <option value={"English"}>English</option>
                                                                <option value={"Urdu"}>Urdu</option>
                                                                <option value={"Other"}>Other</option>
                                                            </select>
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Container>

                                        <Container>
                                            <Row>
                                                <h4 className="detailType my-4">
                                                    Previous Institution Details
                                                </h4>
                                            </Row>
                                            <Row className="w-100">
                                                <Col lg="6" className="admissionFormElement">
                                                    <FormGroup>
                                                        <label className="mb-2" htmlFor="previousInstitution">
                                                            Any previous institution?<span>*</span>
                                                        </label>
                                                        <div className="inputBox">
                                                            <select
                                                                className="form-select"
                                                                aria-label="Default select example"
                                                                id="previousInstitution"
                                                                value={studentDetails.previousInstitution}
                                                                required
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">--Select--</option>
                                                                <option value={"No"}>No</option>
                                                                <option value={"Yes"}>Yes</option>
                                                            </select>
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                <Col lg="12" className="admissionFormElement">
                                                    {studentDetails.previousInstitution === "Yes" && (
                                                        <FormGroup>
                                                            <label
                                                                className="mb-2"
                                                                htmlFor="previousInstitutionName"
                                                            >
                                                                Name of the previous institution
                                                            </label>
                                                            <div className="inputBox">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="previousInstitutionName"
                                                                    onChange={handleChange}
                                                                    value={studentDetails.previousInstitutionName}
                                                                />
                                                            </div>
                                                        </FormGroup>
                                                    )}
                                                </Col>
                                            </Row>
                                        </Container>

                                        <Container className="instruction mt-4">
                                            <Row className="mb-4">
                                                <Col lg="12">
                                                    <h4>Instructions</h4>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="12">
                                                    <ul className="instructions">
                                                        <li>
                                                            All fields marked with <span>*</span> are mandatory.
                                                        </li>
                                                        <li>
                                                            After filling all the required details download and
                                                            print the admission form.
                                                        </li>
                                                        <li>
                                                            Parents are required to submit the registration form
                                                            along with admission fee and following doucments to
                                                            the admission counselor in the school -
                                                        </li>
                                                        <ul className="reqDoc">
                                                            <li>Passport Size Photo of the student</li>
                                                            <li>Copy of Aadhar Card of the student</li>
                                                            <li>Copy of Birth Certificate of the student</li>
                                                            <li>Copy of Samagra ID</li>
                                                            <li>Copy of bank passbook of any family member</li>
                                                            <li>
                                                                Transfer Certificate (T.C.) and copy of marksheet
                                                                of last year (if the student was in any previous
                                                                institution)
                                                            </li>
                                                        </ul>
                                                        <li>
                                                            Incomplete admission form will not be accepted.
                                                        </li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="add_faculty_submit_btn_box">
                                                    <button className="add_faculty_submit_btn" type="submit">
                                                        Continue
                                                    </button>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Form>
                                </Container>
                            </div>
                            <Footer />
                        </>
                    )}

                    {(verify && <VerifyForm toBack={editDetails} studentDetails={studentDetails} />
                    )}
                </div>
            ) : (
                <div>
                    <h2 className="my-5 text-center loader">Admission will start from April</h2>
                </div>
            )}
            </Fade>
        </>
    )
}

export default AdmissionForm
