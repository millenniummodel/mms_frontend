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
import AlertConfirm from 'react-alert-confirm'



const AdmitCard = () => {

    const [examDetails, setexamDetails] = useState({
        examName: "",
        cls: "",
        date1: "",
        date2: "",
        date3: "",
        date4: "",
        date5: "",
        date6: "",
        subject1: "",
        subject2: "",
        subject3: "",
        subject4: "",
        subject5: "",
        subject6: "",
        stime: "",
        etime: ""
    })

    const clsMap={"":0,"Nursery":0, "LKG":0, "UKG":0, "1st":1, "2nd":1, "3rd":1, "4th":1, "5th":1, "6th":2, "7th":2, "8th":2}

    const subjects=[["English [O]", "English[W]", "Hindi [O]", "Hindi [W]","Maths [O]", "Maths [W]"],
                    ['Hindi', 'English', 'Mathematics', 'Ev.S', 'GK + Computer', 'Conversation'],
                    ['Hindi', 'English', 'Mathematics', 'Science', 'So. Science', 'Sanskrit']
                ]
    const { cookies } = useAuth()
    const [loading, setLoading] = useState(false)

    const handleChange = e => {
        setexamDetails(prev => ({ ...prev, [e.target.id]: e.target.value }))
    };

    const submitHandler = async (e) => {
        e.preventDefault()

        const examDetailss = {
            "examName": examDetails.examName,
            "cls": examDetails.cls,
            "date": [reverseDate(examDetails.date1), reverseDate(examDetails.date2), reverseDate(examDetails.date3), reverseDate(examDetails.date4), reverseDate(examDetails.date5), reverseDate(examDetails.date6)],
            "subjects": [examDetails.subject1, examDetails.subject2, examDetails.subject3, examDetails.subject4, examDetails.subject5, examDetails.subject6],
            "time": examDetails.stime + " to " + examDetails.etime
        }
        const [conf] = await AlertConfirm("Are you sure?")
        if (!conf) return;
        try {
            setLoading(true);
            const accessToken = cookies.token
            const data = await axios.get(`${BASE_URL}/student/admitcard/students/${examDetails.cls}`,
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                })
            const students = data.data
            if (!students.length) {
                setLoading(false);
                return toast.error("No student found!", {
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
            {loading && <Loader />}
            {<Container className="admin_admit_card_main my-3 ">
                <Row>
                    <Form onSubmit={submitHandler}>
                        <Container>
                            <Col lg='12'>
                                <h1>Admit Card - {CURRENT_YEAR}</h1>
                            </Col>
                            <Row className='d-flex align-items-center justify-content-center'>
                                <Col lg='8'>
                                    <FormGroup >
                                        <div className='inputBox1 mb-5'>
                                            <input type='text' placeholder='Exam Name' id='examName' onChange={handleChange} required />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg='3'>
                                    <FormGroup>
                                        <div className='inputBox1 mb-5'>
                                            <select
                                                className="form-select"
                                                id="cls"
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">CLASS</option>
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
                            </Row>
                            <Row className="admin_timetable_box">



                                <Col lg='6'>
                                    <Row className='gap-2 text-center time_table_details'>
                                        <Col lg='12' className='mb-2'>
                                            Date
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <input type='date' id='date1' required onChange={handleChange} />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <input type='date' id='date2' required onChange={handleChange} />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <input type='date' id='date3' required onChange={handleChange} />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <input type='date' id='date4' required onChange={handleChange} />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <input type='date' id='date5' required onChange={handleChange} />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <input type='date' id='date6' required onChange={handleChange} />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg='6'>
                                    <Row className='gap-2 text-center time_table_details'>
                                        <Col lg='12' className='mb-2'>
                                            Subjects
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject1' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        {subjects[clsMap[examDetails["cls"]]].map((sub, idx)=>{
                                                            return <option key={idx} value={sub}>{sub}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject2' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        {subjects[clsMap[examDetails["cls"]]].map((sub, idx)=>{
                                                            return <option key={idx} value={sub}>{sub}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject3' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        {subjects[clsMap[examDetails["cls"]]].map((sub, idx)=>{
                                                            return <option key={idx} value={sub}>{sub}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject4' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        {subjects[clsMap[examDetails["cls"]]].map((sub, idx)=>{
                                                            return <option key={idx} value={sub}>{sub}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject5' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        {subjects[clsMap[examDetails["cls"]]].map((sub, idx)=>{
                                                            return <option key={idx} value={sub}>{sub}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col lg='12'>
                                            <FormGroup>
                                                <div className='inputBox1'>
                                                    <select className="form-select" aria-label="Default select example" id='subject6' required onChange={handleChange}>
                                                        <option value="">--Select--</option>
                                                        {subjects[clsMap[examDetails["cls"]]].map((sub, idx)=>{
                                                            return <option key={idx} value={sub}>{sub}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </FormGroup>
                                        </Col>


                                    </Row>
                                </Col>


                            </Row>
                            <Row>
                            <Col lg='6'>
                                    <FormGroup >
                                        {/* <label htmlFor='time' className='text-align-center mb-2'><h3>Time</h3></label> */}
                                        <div className='inputBox1 d-flex justify-content-center align-items-center mt-4'>
                                            <input type='text' id='stime' placeholder='Start Time' onChange={handleChange} required />
                                        </div>
                                    </FormGroup>

                                </Col>
                                <Col lg='6'>
                                    <FormGroup >
                                        {/* <label htmlFor='time' className='text-align-center mb-2'><h3>Time</h3></label> */}
                                        <div className='inputBox1 d-flex justify-content-center align-items-center mt-4'>
                                            <input type='text' id='etime' placeholder='End Time' onChange={handleChange} required />
                                        </div>
                                    </FormGroup>

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

// const AdmitCard = () => {

//     const [examDetails, setexamDetails] = useState({
//         examName: "",
//         date1: "",
//         date2: "",
//         date3: "",
//         date4: "",
//         date5: "",
//         date6: "",
//         subject11: "",
//         subject12: "",
//         subject13: "",
//         subject14: "",
//         subject15: "",
//         subject16: "",
//         subject21: "",
//         subject22: "",
//         subject23: "",
//         subject24: "",
//         subject25: "",
//         subject26: "",
//         subject31: "",
//         subject32: "",
//         subject33: "",
//         subject34: "",
//         subject35: "",
//         subject36: "",
//         time1: "",
//         time2: "",
//         time3: ""
//     })
//     const { cookies } = useAuth()
//     const [loading, setLoading] = useState(false)

//     const handleChange = e => {
//         setexamDetails(prev => ({ ...prev, [e.target.id]: e.target.value }))
//     };

//     const submitHandler = async (e) => {
//         e.preventDefault()

//         const examDetailss = {
//             "examName": examDetails.examName,
//             "date": [reverseDate(examDetails.date1), reverseDate(examDetails.date2), reverseDate(examDetails.date3), reverseDate(examDetails.date4), reverseDate(examDetails.date5), reverseDate(examDetails.date6)],
//             "Nursery": [examDetails.subject11, examDetails.subject12, examDetails.subject13, examDetails.subject14, examDetails.subject15, examDetails.subject16, examDetails.time1],
//             "LKG": [examDetails.subject11, examDetails.subject12, examDetails.subject13, examDetails.subject14, examDetails.subject15, examDetails.subject16, examDetails.time1],
//             "UKG": [examDetails.subject11, examDetails.subject12, examDetails.subject13, examDetails.subject14, examDetails.subject15, examDetails.subject16, examDetails.time1],
//             "1st": [examDetails.subject21, examDetails.subject22, examDetails.subject23, examDetails.subject24, examDetails.subject25, examDetails.subject26, examDetails.time2],
//             "2nd": [examDetails.subject21, examDetails.subject22, examDetails.subject23, examDetails.subject24, examDetails.subject25, examDetails.subject26, examDetails.time2],
//             "3rd": [examDetails.subject21, examDetails.subject22, examDetails.subject23, examDetails.subject24, examDetails.subject25, examDetails.subject26, examDetails.time2],
//             "4th": [examDetails.subject21, examDetails.subject22, examDetails.subject23, examDetails.subject24, examDetails.subject25, examDetails.subject26, examDetails.time2],
//             "5th": [examDetails.subject31, examDetails.subject32, examDetails.subject33, examDetails.subject34, examDetails.subject34, examDetails.subject36, examDetails.time3],
//             "6th": [examDetails.subject31, examDetails.subject32, examDetails.subject33, examDetails.subject34, examDetails.subject34, examDetails.subject36, examDetails.time3],
//             "7th": [examDetails.subject31, examDetails.subject32, examDetails.subject33, examDetails.subject34, examDetails.subject34, examDetails.subject36, examDetails.time3],
//             "8th": [examDetails.subject31, examDetails.subject32, examDetails.subject33, examDetails.subject34, examDetails.subject34, examDetails.subject36, examDetails.time3]
//         }
//         const [conf] = await AlertConfirm("Are you sure?")
//         if (!conf) return;
//         try {
//             setLoading(true);
//             const accessToken = cookies.token
//             const data = await axios.get(`${BASE_URL}/student/getcurrentstudents`,
//                 {
//                     headers: {
//                         token: `Bearer ${accessToken}`
//                     }
//                 })
//             const students = data.data
//             if (!students.length) {
//                 setLoading(false);
//                 return toast.error("No student found!", {
//                     position: "top-right",
//                     autoClose: 3000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 });
//             }
//             printAdmitCard([examDetailss, students])
//             setLoading(false);
//             toast.success("Admit cards downloaded!", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//         }
//         catch (err) {
//             setLoading(false);
//             return toast.error("Something went wrong!", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//         }

//     }
//     return (
//         <>
//             <Navbar />
//             {loading ? <Loader /> : <Container className="admin_admit_card_main my-3 ">
//                 <Row>
//                     <Form onSubmit={submitHandler}>
//                         <Container>
//                             <Col lg='12'>
//                                 <h1>Admit Card - {CURRENT_YEAR}</h1>
//                             </Col>
//                             <Row className='d-flex align-items-center justify-content-center'>
//                                 <Col lg='6'>
//                                     <FormGroup >
//                                         <div className='inputBox1 mb-5'>
//                                             <input type='text' placeholder='Exam Name' id='examName' onChange={handleChange} required />
//                                         </div>
//                                     </FormGroup>
//                                 </Col>
//                             </Row>
//                             <Row className="admin_timetable_box">



//                                 <Col lg='3'>
//                                     <Row className='gap-2 text-center time_table_details'>
//                                         <Col lg='12' className='mb-2'>
//                                             Date
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <input type='date' id='date1' required onChange={handleChange} />
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <input type='date' id='date2' required onChange={handleChange} />
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <input type='date' id='date3' required onChange={handleChange} />
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <input type='date' id='date4' required onChange={handleChange} />
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <input type='date' id='date5' required onChange={handleChange} />
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <input type='date' id='date6' required onChange={handleChange} />
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                     </Row>
//                                 </Col>

//                                 <Col lg='3'>
//                                     <Row className='gap-2 text-center time_table_details'>
//                                         <Col lg='12' className='mb-2'>
//                                             Nursery to UKG
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject11' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi [O]'}>Hindi [O]</option>
//                                                         <option value={'Hindi [W]'}>Hindi [W]</option>
//                                                         <option value={'English [O]'}>English [O]</option>
//                                                         <option value={'English [W]'}>English [W]</option>
//                                                         <option value={'Maths [O]'}>Maths [O]</option>
//                                                         <option value={'Maths [W]'}>Maths [W]</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject12' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi [O]'}>Hindi [O]</option>
//                                                         <option value={'Hindi [W]'}>Hindi [W]</option>
//                                                         <option value={'English [O]'}>English [O]</option>
//                                                         <option value={'English [W]'}>English [W]</option>
//                                                         <option value={'Maths [O]'}>Maths [O]</option>
//                                                         <option value={'Maths [W]'}>Maths [W]</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject13' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi [O]'}>Hindi [O]</option>
//                                                         <option value={'Hindi [W]'}>Hindi [W]</option>
//                                                         <option value={'English [O]'}>English [O]</option>
//                                                         <option value={'English [W]'}>English [W]</option>
//                                                         <option value={'Maths [O]'}>Maths [O]</option>
//                                                         <option value={'Maths [W]'}>Maths [W]</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject14' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi [O]'}>Hindi [O]</option>
//                                                         <option value={'Hindi [W]'}>Hindi [W]</option>
//                                                         <option value={'English [O]'}>English [O]</option>
//                                                         <option value={'English [W]'}>English [W]</option>
//                                                         <option value={'Maths [O]'}>Maths [O]</option>
//                                                         <option value={'Maths [W]'}>Maths [W]</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject15' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi [O]'}>Hindi [O]</option>
//                                                         <option value={'Hindi [W]'}>Hindi [W]</option>
//                                                         <option value={'English [O]'}>English [O]</option>
//                                                         <option value={'English [W]'}>English [W]</option>
//                                                         <option value={'Maths [O]'}>Maths [O]</option>
//                                                         <option value={'Maths [W]'}>Maths [W]</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject16' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi [O]'}>Hindi [O]</option>
//                                                         <option value={'Hindi [W]'}>Hindi [W]</option>
//                                                         <option value={'English [O]'}>English [O]</option>
//                                                         <option value={'English [W]'}>English [W]</option>
//                                                         <option value={'Maths [O]'}>Maths [O]</option>
//                                                         <option value={'Maths [W]'}>Maths [W]</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>

//                                         <Col lg='12'>
//                                             <FormGroup >
//                                                 <div className='inputBox1'>
//                                                     <input type='text' placeholder='Time' id='time1' onChange={handleChange} required />
//                                                 </div>
//                                             </FormGroup>

//                                         </Col>
//                                     </Row>
//                                 </Col>

//                                 <Col lg='3'>
//                                     <Row className='gap-2 text-center time_table_details'>
//                                         <Col lg='12' className='mb-2'>
//                                             1st to 4th
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject21' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi'}>Hindi</option>
//                                                         <option value={'English'}>English</option>
//                                                         <option value={'Mathematics'}>Mathematics</option>
//                                                         <option value={'Ev.S'}>Ev.S</option>
//                                                         <option value={'GK + Computer'}>GK + Computer</option>
//                                                         <option value={'Conversation'}>Conversation</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject22' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi'}>Hindi</option>
//                                                         <option value={'English'}>English</option>
//                                                         <option value={'Mathematics'}>Mathematics</option>
//                                                         <option value={'Ev.S'}>Ev.S</option>
//                                                         <option value={'GK + Computer'}>GK + Computer</option>
//                                                         <option value={'Conversation'}>Conversation</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject23' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi'}>Hindi</option>
//                                                         <option value={'English'}>English</option>
//                                                         <option value={'Mathematics'}>Mathematics</option>
//                                                         <option value={'Ev.S'}>Ev.S</option>
//                                                         <option value={'GK + Computer'}>GK + Computer</option>
//                                                         <option value={'Conversation'}>Conversation</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject24' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi'}>Hindi</option>
//                                                         <option value={'English'}>English</option>
//                                                         <option value={'Mathematics'}>Mathematics</option>
//                                                         <option value={'Ev.S'}>Ev.S</option>
//                                                         <option value={'GK + Computer'}>GK + Computer</option>
//                                                         <option value={'Conversation'}>Conversation</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject25' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi'}>Hindi</option>
//                                                         <option value={'English'}>English</option>
//                                                         <option value={'Mathematics'}>Mathematics</option>
//                                                         <option value={'Ev.S'}>Ev.S</option>
//                                                         <option value={'GK + Computer'}>GK + Computer</option>
//                                                         <option value={'Conversation'}>Conversation</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject26' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi'}>Hindi</option>
//                                                         <option value={'English'}>English</option>
//                                                         <option value={'Mathematics'}>Mathematics</option>
//                                                         <option value={'Ev.S'}>Ev.S</option>
//                                                         <option value={'GK + Computer'}>GK + Computer</option>
//                                                         <option value={'Conversation'}>Conversation</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup >
//                                                 <div className='inputBox1'>
//                                                     <input type='text' placeholder='Time' id='time2' onChange={handleChange} required />
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                     </Row>
//                                 </Col>

//                                 <Col lg='3'>
//                                     <Row className='gap-2 text-center time_table_details'>
//                                         <Col lg='12' className='mb-2'>
//                                             5th to 8th
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject31' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi'}>Hindi</option>
//                                                         <option value={'English'}>English</option>
//                                                         <option value={'Mathematics'}>Mathematics</option>
//                                                         <option value={'Science'}>Science</option>
//                                                         <option value={'So. Science'}>So. Science</option>
//                                                         <option value={'Sanskrit'}>Sanskrit</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject32' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi'}>Hindi</option>
//                                                         <option value={'English'}>English</option>
//                                                         <option value={'Mathematics'}>Mathematics</option>
//                                                         <option value={'Science'}>Science</option>
//                                                         <option value={'So. Science'}>So. Science</option>
//                                                         <option value={'Sanskrit'}>Sanskrit</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject33' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi'}>Hindi</option>
//                                                         <option value={'English'}>English</option>
//                                                         <option value={'Mathematics'}>Mathematics</option>
//                                                         <option value={'Science'}>Science</option>
//                                                         <option value={'So. Science'}>So. Science</option>
//                                                         <option value={'Sanskrit'}>Sanskrit</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject34' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi'}>Hindi</option>
//                                                         <option value={'English'}>English</option>
//                                                         <option value={'Mathematics'}>Mathematics</option>
//                                                         <option value={'Science'}>Science</option>
//                                                         <option value={'So. Science'}>So. Science</option>
//                                                         <option value={'Sanskrit'}>Sanskrit</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject35' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi'}>Hindi</option>
//                                                         <option value={'English'}>English</option>
//                                                         <option value={'Mathematics'}>Mathematics</option>
//                                                         <option value={'Science'}>Science</option>
//                                                         <option value={'So. Science'}>So. Science</option>
//                                                         <option value={'Sanskrit'}>Sanskrit</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup>
//                                                 <div className='inputBox1'>
//                                                     <select className="form-select" aria-label="Default select example" id='subject36' required onChange={handleChange}>
//                                                         <option value="">--Select--</option>
//                                                         <option value={'Hindi'}>Hindi</option>
//                                                         <option value={'English'}>English</option>
//                                                         <option value={'Mathematics'}>Mathematics</option>
//                                                         <option value={'Science'}>Science</option>
//                                                         <option value={'So. Science'}>So. Science</option>
//                                                         <option value={'Sanskrit'}>Sanskrit</option>
//                                                     </select>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg='12'>
//                                             <FormGroup >
//                                                 <div className='inputBox1'>
//                                                     <input type='text' placeholder='Time' id='time3' onChange={handleChange} required />
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                     </Row>
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col className='text-center'>
//                                     <button className='submitBtn1' type="submit">Print</button>
//                                 </Col>
//                             </Row>

//                         </Container>
//                     </Form>
//                 </Row>
//             </Container>}
//             <Footer mode='dark' />
//         </>
//     )
// }

export default AdmitCard
