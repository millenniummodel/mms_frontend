import React, { useState } from 'react'
import { Col, Container, FormGroup, Row, Form } from 'reactstrap'
import Navbar from '../../components/Navbar/Navbar';
import { BASE_URL, CURRENT_YEAR, SHOW_RESULT } from '../../config/config';
import axios from 'axios';
import reverseDate from '../../utils/rverseDate';
import Footer from '../../components/Footer/Footer';
import './Result.css'
import Loader from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { Fade } from "react-awesome-reveal";


const Result = () => {

    const acadYear = CURRENT_YEAR
    const showResult = SHOW_RESULT
    const [loading, setLoading] = useState(false)
    const [studentData, setStudentData] = useState(null)
    var today = new Date().toISOString().split('T')[0];
    const [admNo, setAdmNo] = useState()
    const [dob, setDob] = useState()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            const data = await axios.get(`${BASE_URL}/result/showStudentResult?yr=${acadYear}&admNo=${admNo}&dob=${reverseDate(dob)}`)
            setStudentData(data.data.data)
            setLoading(false);
        }
        catch (err) {
            setStudentData(null)
            setLoading(false)
            if (err.response) {
                toast.error(err.response.data.message, {
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
            else {
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
        }

    }
    const marksToGrade = (marks) => {
        if (marks > 80) return "A";
        if (marks > 60) return "B";
        if (marks > 45) return "C";
        if (marks >= 33) return "D";
        if (marks >= 0) return "E"
        return "-";
    }

    return (
        <>
            <Navbar />
            <Fade>
            <section className="imgHeadingResult imgHeadingImg mb-5">
                <Container>
                    <Row>
                        <Col lg="12">
                            <h1 className="imgHeadingHead">Results {acadYear}</h1>
                        </Col>
                    </Row>
                </Container>
            </section>
            {!showResult ? <h1 className="show_result_main_cont py-5 border px-4">Results Will Be Declared Soon</h1> :
                <Container className="mb-5 show_result_main_cont">
                    <Form onSubmit={submitHandler}>
                        <Container>
                            <Row className="d-flex justify-content-center align-items-center">
                                <Col lg="4">
                                    <FormGroup className="text-center">
                                        <label className="mb-2" htmlFor="admNo">
                                            Admission Number
                                        </label>
                                        <div className="facInputBox">
                                            <input
                                                className="text-center"
                                                type="text"
                                                id="admNo"
                                                required
                                                onChange={(e) => setAdmNo(e.target.value)}
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>

                                <Col lg="4">
                                    <FormGroup className="text-center">
                                        <label className="mb-2" htmlFor="admNo">
                                            Date of Birth
                                        </label>
                                        <div className="facInputBox">
                                            <input
                                                type="date"
                                                className="text-center"
                                                id="dob"
                                                onChange={(e) => setDob(e.target.value)}
                                                max={today}
                                                required
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>

                                <Col className="add_faculty_submit_btn_box" lg="4">
                                    <button className="add_faculty_submit_btn" type="submit">
                                        Show Result
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Container>}
            {loading ? <Loader /> : studentData && (
                <Row className=" mt-5 d-flex justify-content-center align-items-center result_inner_cont">
                    <h2 className="text-center mt-5">Millennium Model School</h2>
                    <h5 className="text-center mt-2 mb-5">
                        Annual Examination Result {acadYear}
                    </h5>
                    <h6 className="result_note px-4">
                        <span>NOTE</span> - This information should not be treated as
                        marksheet.
                    </h6>
                    <Row className="my-1 d-flex align-items-center justify-content-evenly">
                        <Col lg="6">Name - {studentData.studentDetails.name}</Col>
                        <Col lg="6">Class - {studentData.cls}</Col>
                    </Row>
                    <Row className="my-1 d-flex align-items-center justify-content-evenly">
                        <Col lg="6">Admission No. - {studentData.admNo}</Col>
                        <Col lg="6">D.O.B. - {studentData.studentDetails.dob}</Col>
                    </Row>
                    <Row className="my-1 d-flex align-items-center justify-content-evenly">
                        <Col lg="6">Father's Name - {studentData.studentDetails.mName}</Col>
                        <Col lg="6">Mother's Name - {studentData.studentDetails.fName}</Col>
                    </Row>

                    <Row className="my-5">
                        <table className="text-center">
                            <tr>
                                <th>Subject</th>
                                <th>Max. Marks</th>
                                <th>Obtained</th>
                                <th>Grade</th>
                            </tr>
                            {studentData.subjects.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{val}</td>
                                        <td>{100}</td>
                                        <td>
                                            {Math.ceil(
                                                (studentData.halfYearlyObt[key] /
                                                    studentData.halfYearlyMax +
                                                    studentData.annualObt[key] / studentData.annualMax) *
                                                50
                                            )}
                                        </td>
                                        <td>
                                            {marksToGrade(
                                                Math.ceil(
                                                    (studentData.halfYearlyObt[key] /
                                                        studentData.halfYearlyMax +
                                                        studentData.annualObt[key] /
                                                        studentData.annualMax) *
                                                    50
                                                )
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </Row>
                </Row>
            )}
            <Footer />
            </Fade>
        </>

    )
}

export default Result
