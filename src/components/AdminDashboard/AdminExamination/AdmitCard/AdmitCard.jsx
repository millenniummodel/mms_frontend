import React, { useState } from 'react'
import './AdmitCard.css'
import Footer from '../../../Footer/Footer'
import Navbar from '../../../Navbar/Navbar'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import printAdmitCard from '../../../../utils/printAdmitCard'
import { toast } from 'react-toastify';
import { BASE_URL, CURRENT_YEAR } from '../../../../config/config'
import axios from 'axios'
import reverseDate from '../../../../utils/rverseDate'
import { useAuth } from '../../../../Hooks/auth'
import Loader from '../../../Loader/Loader'

const AdmitCard = () => {

    const [examDetails, setexamDetails] = useState({
        examName: "",
        date1: "",
        date2: "",
        date3: "",
        date4: "",
        date5: "",
        date6: "",
        subject11: "",
        subject12: "",
        subject13: "",
        subject14: "",
        subject15: "",
        subject16: "",
        subject21: "",
        subject22: "",
        subject23: "",
        subject24: "",
        subject25: "",
        subject26: "",
        subject31: "",
        subject32: "",
        subject33: "",
        subject34: "",
        subject35: "",
        subject36: "",
        time1: "",
        time2: "",
        time3: ""
    })
    const {cookies}=useAuth()
    const [loading, setLoading] = useState(false)

    const handleChange = e => {
        setexamDetails(prev => ({ ...prev, [e.target.id]: e.target.value }))
    };

    const submitHandler = async (e) => {
        e.preventDefault()

        const examDetailss = {
            "examName": examDetails.examName,
            "date": [reverseDate(examDetails.date1), reverseDate(examDetails.date2), reverseDate(examDetails.date3), reverseDate(examDetails.date4), reverseDate(examDetails.date5), reverseDate(examDetails.date6)],
            "Nursery": [examDetails.subject11, examDetails.subject12, examDetails.subject13, examDetails.subject14, examDetails.subject15, examDetails.subject16, examDetails.time1],
            "LKG": [examDetails.subject11, examDetails.subject12, examDetails.subject13, examDetails.subject14, examDetails.subject15, examDetails.subject16, examDetails.time1],
            "UKG": [examDetails.subject11, examDetails.subject12, examDetails.subject13, examDetails.subject14, examDetails.subject15, examDetails.subject16, examDetails.time1],
            "1st": [examDetails.subject21, examDetails.subject22, examDetails.subject23, examDetails.subject24, examDetails.subject25, examDetails.subject26, examDetails.time2],
            "2nd": [examDetails.subject21, examDetails.subject22, examDetails.subject23, examDetails.subject24, examDetails.subject25, examDetails.subject26, examDetails.time2],
            "3rd": [examDetails.subject21, examDetails.subject22, examDetails.subject23, examDetails.subject24, examDetails.subject25, examDetails.subject26, examDetails.time2],
            "4th": [examDetails.subject21, examDetails.subject22, examDetails.subject23, examDetails.subject24, examDetails.subject25, examDetails.subject26, examDetails.time2],
            "5th": [examDetails.subject31, examDetails.subject32, examDetails.subject33, examDetails.subject34, examDetails.subject34, examDetails.subject36, examDetails.time3],
            "6th": [examDetails.subject31, examDetails.subject32, examDetails.subject33, examDetails.subject34, examDetails.subject34, examDetails.subject36, examDetails.time3],
            "7th": [examDetails.subject31, examDetails.subject32, examDetails.subject33, examDetails.subject34, examDetails.subject34, examDetails.subject36, examDetails.time3],
            "8th": [examDetails.subject31, examDetails.subject32, examDetails.subject33, examDetails.subject34, examDetails.subject34, examDetails.subject36, examDetails.time3]
        }
        try {
            setLoading(true);
            const accessToken = cookies.token
            const data = await axios.get(`${BASE_URL}/student/getcurrentstudents`,
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                })
            const students = data.data
            printAdmitCard([examDetailss, students])
            setLoading(false);
            toast.success("Admit cards downloaded!", {
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
        catch (err) {
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
            {loading?<Loader/>:<Container className="admin_admit_card_main my-3 ">
                <Row>
                    <Form onSubmit={submitHandler}>
                        <Container>
                            <Col lg='12'>
                                <h1>Admit Card - {CURRENT_YEAR}</h1>
                            </Col>
                            <Row className='d-flex align-items-center justify-content-center'>
                                <Col lg='6'>
                                    <FormGroup >
                                        <div className='inputBox1 mb-5'>
                                            <input type='text' placeholder='Exam Name' id='examName' onChange={handleChange} required />
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="admin_timetable_box">



                                <Col lg='3'>
                                    <Row className='gap-2 text-center time_table_details'>
                                        <Col lg='12' className='mb-2'>
                                            Date
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="date1">Date 1</label> */}
                                                <div className='inputBox1'>
                                                    <input type='date' id='date1' required onChange={handleChange} />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="date2">Date 2</label> */}
                                                <div className='inputBox1'>
                                                    <input type='date' id='date2' required onChange={handleChange} />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="date3">Date 3</label> */}
                                                <div className='inputBox1'>
                                                    <input type='date' id='date3' required onChange={handleChange} />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="date4">Date 4</label> */}
                                                <div className='inputBox1'>
                                                    <input type='date' id='date4' required onChange={handleChange} />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="date5">Date 5</label> */}
                                                <div className='inputBox1'>
                                                    <input type='date' id='date5' required onChange={handleChange} />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="date6">Date 6</label> */}
                                                <div className='inputBox1'>
                                                    <input type='date' id='date6' required onChange={handleChange} />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg='3'>
                                    <Row className='gap-2 text-center time_table_details'>
                                        <Col lg='12' className='mb-2'>
                                            Nursery to UKG
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="subject11">Subject 1</label> */}
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject11' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi [O]'}>Hindi [O]</option>
                                                        <option value={'Hindi [W]'}>Hindi [W]</option>
                                                        <option value={'English [O]'}>English [O]</option>
                                                        <option value={'English [W]'}>English [W]</option>
                                                        <option value={'Maths [O]'}>Maths [O]</option>
                                                        <option value={'Maths [W]'}>Maths [W]</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="subject12">Subject 2</label> */}
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject12' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi [O]'}>Hindi [O]</option>
                                                        <option value={'Hindi [W]'}>Hindi [W]</option>
                                                        <option value={'English [O]'}>English [O]</option>
                                                        <option value={'English [W]'}>English [W]</option>
                                                        <option value={'Maths [O]'}>Maths [O]</option>
                                                        <option value={'Maths [W]'}>Maths [W]</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="subject13">Subject 3</label> */}
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject13' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi [O]'}>Hindi [O]</option>
                                                        <option value={'Hindi [W]'}>Hindi [W]</option>
                                                        <option value={'English [O]'}>English [O]</option>
                                                        <option value={'English [W]'}>English [W]</option>
                                                        <option value={'Maths [O]'}>Maths [O]</option>
                                                        <option value={'Maths [W]'}>Maths [W]</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="subject14">Subject 4</label> */}
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject14' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi [O]'}>Hindi [O]</option>
                                                        <option value={'Hindi [W]'}>Hindi [W]</option>
                                                        <option value={'English [O]'}>English [O]</option>
                                                        <option value={'English [W]'}>English [W]</option>
                                                        <option value={'Maths [O]'}>Maths [O]</option>
                                                        <option value={'Maths [W]'}>Maths [W]</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="subject15">Subject 5</label> */}
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject15' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi [O]'}>Hindi [O]</option>
                                                        <option value={'Hindi [W]'}>Hindi [W]</option>
                                                        <option value={'English [O]'}>English [O]</option>
                                                        <option value={'English [W]'}>English [W]</option>
                                                        <option value={'Maths [O]'}>Maths [O]</option>
                                                        <option value={'Maths [W]'}>Maths [W]</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="subject16">Subject 6</label> */}
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject16' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi [O]'}>Hindi [O]</option>
                                                        <option value={'Hindi [W]'}>Hindi [W]</option>
                                                        <option value={'English [O]'}>English [O]</option>
                                                        <option value={'English [W]'}>English [W]</option>
                                                        <option value={'Maths [O]'}>Maths [O]</option>
                                                        <option value={'Maths [W]'}>Maths [W]</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>

                                        <Col lg='12'>
                                            <FormGroup >
                                                <div className='inputBox1'>
                                                    <input type='text' placeholder='Time' id='time1' onChange={handleChange} required />
                                                </div>
                                            </FormGroup>

                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg='3'>
                                    <Row className='gap-2 text-center time_table_details'>
                                        <Col lg='12' className='mb-2'>
                                            1st to 4th
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="subject21">Subject 1</label> */}
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject21' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi'}>Hindi</option>
                                                        <option value={'English'}>English</option>
                                                        <option value={'Mathematics'}>Mathematics</option>
                                                        <option value={'Ev.S'}>Ev.S</option>
                                                        <option value={'GK + Computer'}>GK + Computer</option>
                                                        <option value={'Conversation'}>Conversation</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="subject22">Subject 2</label> */}
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject22' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi'}>Hindi</option>
                                                        <option value={'English'}>English</option>
                                                        <option value={'Mathematics'}>Mathematics</option>
                                                        <option value={'Ev.S'}>Ev.S</option>
                                                        <option value={'GK + Computer'}>GK + Computer</option>
                                                        <option value={'Conversation'}>Conversation</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="subject23">Subject 3</label> */}
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject23' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi'}>Hindi</option>
                                                        <option value={'English'}>English</option>
                                                        <option value={'Mathematics'}>Mathematics</option>
                                                        <option value={'Ev.S'}>Ev.S</option>
                                                        <option value={'GK + Computer'}>GK + Computer</option>
                                                        <option value={'Conversation'}>Conversation</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="subject24">Subject 4</label> */}
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject24' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi'}>Hindi</option>
                                                        <option value={'English'}>English</option>
                                                        <option value={'Mathematics'}>Mathematics</option>
                                                        <option value={'Ev.S'}>Ev.S</option>
                                                        <option value={'GK + Computer'}>GK + Computer</option>
                                                        <option value={'Conversation'}>Conversation</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="subject25">Subject 5</label> */}
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject25' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi'}>Hindi</option>
                                                        <option value={'English'}>English</option>
                                                        <option value={'Mathematics'}>Mathematics</option>
                                                        <option value={'Ev.S'}>Ev.S</option>
                                                        <option value={'GK + Computer'}>GK + Computer</option>
                                                        <option value={'Conversation'}>Conversation</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                {/* <label className='mb-2' htmlFor="subject26">Subject 6</label> */}
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject26' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi'}>Hindi</option>
                                                        <option value={'English'}>English</option>
                                                        <option value={'Mathematics'}>Mathematics</option>
                                                        <option value={'Ev.S'}>Ev.S</option>
                                                        <option value={'GK + Computer'}>GK + Computer</option>
                                                        <option value={'Conversation'}>Conversation</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup >
                                                <div className='inputBox1'>
                                                    <input type='text' placeholder='Time' id='time2' onChange={handleChange} required />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg='3'>
                                    <Row className='gap-2 text-center time_table_details'>
                                        <Col lg='12' className='mb-2'>
                                            5th to 8th
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject31' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi'}>Hindi</option>
                                                        <option value={'English'}>English</option>
                                                        <option value={'Mathematics'}>Mathematics</option>
                                                        <option value={'Science'}>Science</option>
                                                        <option value={'So. Science'}>So. Science</option>
                                                        <option value={'Sanskrit'}>Sanskrit</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject32' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi'}>Hindi</option>
                                                        <option value={'English'}>English</option>
                                                        <option value={'Mathematics'}>Mathematics</option>
                                                        <option value={'Science'}>Science</option>
                                                        <option value={'So. Science'}>So. Science</option>
                                                        <option value={'Sanskrit'}>Sanskrit</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject33' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi'}>Hindi</option>
                                                        <option value={'English'}>English</option>
                                                        <option value={'Mathematics'}>Mathematics</option>
                                                        <option value={'Science'}>Science</option>
                                                        <option value={'So. Science'}>So. Science</option>
                                                        <option value={'Sanskrit'}>Sanskrit</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject34' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi'}>Hindi</option>
                                                        <option value={'English'}>English</option>
                                                        <option value={'Mathematics'}>Mathematics</option>
                                                        <option value={'Science'}>Science</option>
                                                        <option value={'So. Science'}>So. Science</option>
                                                        <option value={'Sanskrit'}>Sanskrit</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject35' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi'}>Hindi</option>
                                                        <option value={'English'}>English</option>
                                                        <option value={'Mathematics'}>Mathematics</option>
                                                        <option value={'Science'}>Science</option>
                                                        <option value={'So. Science'}>So. Science</option>
                                                        <option value={'Sanskrit'}>Sanskrit</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject36' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        <option value={'Hindi'}>Hindi</option>
                                                        <option value={'English'}>English</option>
                                                        <option value={'Mathematics'}>Mathematics</option>
                                                        <option value={'Science'}>Science</option>
                                                        <option value={'So. Science'}>So. Science</option>
                                                        <option value={'Sanskrit'}>Sanskrit</option>
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup >
                                                <div className='inputBox1'>
                                                    <input type='text' placeholder='Time' id='time3' onChange={handleChange} required />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='text-center'>
                                    <button className='submitBtn1' type="submit">Print</button>
                                </Col>
                            </Row>

                        </Container>
                    </Form>
                </Row>
            </Container>}
            <Footer mode='dark' />
        </>
    )
}

export default AdmitCard
