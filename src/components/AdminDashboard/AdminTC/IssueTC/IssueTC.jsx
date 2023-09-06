import React, { useState } from 'react'
import { BASE_URL } from '../../../../config/config'
import axios from 'axios'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import './IssueTC.css'
import Navbar from '../../../Navbar/Navbar'
import Footer from '../../../Footer/Footer'
import reverseDate from '../../../../utils/rverseDate'
import printTC from '../../../../utils/printTC'
import { toast } from 'react-toastify';
import { useAuth } from '../../../../Hooks/auth'
import Loader from '../../../Loader/Loader'


const IssueTC = () => {

    var today = new Date().toISOString().split('T')[0];
    const {cookies}=useAuth()
    const [loading, setLoading] = useState(false)

    const [studentDetails, setstudentDetails] = useState({
        passedStudents: "",
        failedStudents: "",
        dol: "",
        issueDate: ""
    })

    const handleChange = e => {
        setstudentDetails(prev => ({ ...prev, [e.target.id]: e.target.value }))
    };

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            studentDetails.dol = reverseDate(studentDetails.dol)
            studentDetails.issueDate = reverseDate(studentDetails.issueDate)
            const accessToken = cookies.token
            const data = await axios.put(`${BASE_URL}/tc/issuetc`, studentDetails,
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                })
            printTC(data.data.data)
            toast.success("TC downloaded!", {
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
        }
        catch (err) {
            setLoading(false);
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
            return
        }

    }

    return (
        <>
            <Navbar />
            {loading?<Loader/>:<Container className="add_student_main_cont">
                <Form onSubmit={submitHandler}>
                    <h1>Issue TC</h1>
                    <Container>
                        <Row>
                            <Col lg="12">
                                <FormGroup className='text-center'>
                                    <label className="mb-2" htmlFor="passedStudents">
                                        Admission number of passed students <span>(separated by space)</span>
                                    </label>
                                    <div className="facInputBox">
                                        <input
                                            type="text"
                                            id="passedStudents"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col lg="12">
                                <FormGroup className='text-center'>
                                    <label className="mb-2" htmlFor="failedStudents">
                                        Admission number of failed students <span>(separated by space)</span>
                                    </label>
                                    <div className="facInputBox">
                                        <input
                                            type="text"
                                            id="failedStudents"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col lg="6">
                                <FormGroup className='text-center'>
                                    <label htmlFor="dol" className="col-form-label">
                                        Date of leaving school:
                                    </label>
                                    <div className="">

                                        <input
                                            type="date"
                                            className="form-control"
                                            id="dol"
                                            onChange={handleChange}
                                            max={today}
                                            required
                                        />
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col lg="6">
                                <FormGroup className='text-center'>
                                    <label htmlFor="issueDate" className="col-form-label">
                                        TC Issue Date:
                                    </label>
                                    <div className="">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="issueDate"
                                            onChange={handleChange}
                                            max={today}
                                            required
                                        />
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col className="add_faculty_submit_btn_box" lg='12'>
                                <button className="add_faculty_submit_btn" type="submit">
                                    Print
                                </button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Container>}
            <Footer />
        </>
    )
}

export default IssueTC
