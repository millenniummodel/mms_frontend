import React from 'react'
import { Col, Container, Form, Row } from 'reactstrap'
import './VerifyForm.css'
import printAdmissionForm from '../../utils/printAdmissionForm'

const VerifyForm = (props) => {

    const handleBack = () => {
        props.toBack()
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        printAdmissionForm(props.studentDetails)
    }

    return (
        <>
            <div className="verifyform_main_cont">
                <Container className="verifyMainBox">
                    <Container id="admissionForm">
                        <Row>
                            <Col lg="12">
                                <h5 className="text-center mb-4">Verify Details</h5>
                            </Col>
                        </Row>
                        <Row className="detailsToVerify">
                            <Col lg="6">
                                <span>Student's Name : </span>
                                {props.studentDetails.studentName}
                            </Col>
                            <Col lg="6">
                                <span>Gender : </span>
                                {props.studentDetails.gender}
                            </Col>

                            <Col lg="6">
                                <span>Date of Birth : </span>
                                {props.studentDetails.dob}
                            </Col>
                            <Col lg="6">
                                <span>Class : </span>
                                {props.studentDetails.class}
                            </Col>

                            <Col lg="6">
                                <span>Father's Name : </span>
                                {props.studentDetails.fatherName}
                            </Col>
                            <Col lg="6">
                                <span>Mother's Name : </span>
                                {props.studentDetails.motherName}
                            </Col>

                            <Col lg="6">
                                <span>Aadhar Number : </span>
                                {props.studentDetails.aadhar}
                            </Col>
                            <Col lg="6">
                                <span>Samagra ID : </span>
                                {props.studentDetails.samagraID}
                            </Col>

                            <Col lg="12">
                                <span>Permanent Address : </span>
                                {props.studentDetails.permanentAddress}
                            </Col>
                            <Col lg="12">
                                <span>Local Address : </span>
                                {props.studentDetails.localAddress !== ""
                                    ? props.studentDetails.localAddress
                                    : "--------"}
                            </Col>

                            <Col lg="6">
                                <span>Phone No. : </span>
                                {props.studentDetails.phone}
                            </Col>
                            <Col lg="6">
                                <span>Alternate Phone No. : </span>
                                {props.studentDetails.alternatePhone !== ""
                                    ? props.studentDetails.alternatePhone
                                    : "--------"}
                            </Col>

                            <Col lg="6">
                                <span>Father's Occupation : </span>
                                {props.studentDetails.fatherOccupation !== ""
                                    ? props.studentDetails.fatherOccupation
                                    : "--------"}
                            </Col>
                            <Col lg="6">
                                <span>Father's Income : </span>
                                {props.studentDetails.fatherIncome !== ""
                                    ? props.studentDetails.fatherIncome
                                    : "--------"}
                            </Col>

                            <Col lg="6">
                                <span>Mother's Occupation : </span>
                                {props.studentDetails.motherOccupation !== ""
                                    ? props.studentDetails.motherOccupation
                                    : "--------"}
                            </Col>
                            <Col lg="6">
                                <span>Mother's Income : </span>
                                {props.studentDetails.motherIncome !== ""
                                    ? props.studentDetails.motherIncome
                                    : "--------"}
                            </Col>

                            <Col lg="6">
                                <span>Category : </span>
                                {props.studentDetails.category !== ""
                                    ? props.studentDetails.category
                                    : "--------"}
                            </Col>
                            <Col lg="6">
                                <span>Religion : </span>
                                {props.studentDetails.religion !== ""
                                    ? props.studentDetails.religion
                                    : "--------"}
                            </Col>

                            <Col lg="6">
                                <span>Caste : </span>
                                {props.studentDetails.caste !== ""
                                    ? props.studentDetails.caste
                                    : "--------"}
                            </Col>
                            <Col lg="6">
                                <span>Nationality : </span>
                                {props.studentDetails.nationality !== ""
                                    ? props.studentDetails.nationality
                                    : "--------"}
                            </Col>

                            <Col lg="6">
                                <span>motherTounge : </span>
                                {props.studentDetails.motherTounge !== ""
                                    ? props.studentDetails.motherTounge
                                    : "--------"}
                            </Col>
                            <Col lg="6">
                                <span>Any previous institution? : </span>
                                {props.studentDetails.previousInstitution}
                            </Col>

                            {props.studentDetails.previousInstitution === "Yes" && (
                                <Col lg="12">
                                    <span>Name of previous institution : </span>
                                    {props.studentDetails.previousInstitutionName !== ""
                                        ? props.studentDetails.previousInstitutionName
                                        : "--------"}
                                </Col>
                            )}
                        </Row>
                    </Container>

                    <Container className="declaration ">
                        <Row className="mb-2">
                            <Col lg="12">
                                <h5>Declaration</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Form onSubmit={handleSubmit}>
                                <Col lg="12">
                                    <div>
                                        <input type="checkbox" required /> I declare that all the
                                        above information is correct and true and I understand that
                                        any incorrect information will cancel the admission in this
                                        school.
                                    </div>
                                </Col>
                                <Col lg="12" className="text-center handleBtns mt-4">
                                    <button
                                        className="add_faculty_submit_btn mx-3"
                                        onClick={handleBack}
                                    >
                                        Edit Details
                                    </button>
                                    <button className="verify_submit_btn mx-3" type="submit">
                                        Submit
                                    </button>
                                </Col>
                            </Form>
                        </Row>
                    </Container>
                </Container>
            </div>
        </>
    );
}

export default VerifyForm
