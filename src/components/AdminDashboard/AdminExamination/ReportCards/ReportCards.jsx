import React, { useCallback, useEffect, useState } from 'react'
import './ReportCards.css'
import Navbar from '../../../Navbar/Navbar'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { BASE_URL } from '../../../../config/config'
import axios from 'axios'
import Footer from '../../../Footer/Footer'
import printMarksheet from '../../../../utils/printMarksheet'
import { useAuth } from '../../../../Hooks/auth'
import { toast } from 'react-toastify';
import Loader from '../../../Loader/Loader'

const ReportCards = () => {

    const [details, setDetails] = useState({
        acadYear: "",
        cls: ""
    })

    const [acadYears, setAcadYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const { cookies } = useAuth();
    const accessToken = cookies.token;

    const fetchAcadYears = useCallback(async () => {
        try {
            setLoading(true);

            const data = await axios.get(`${BASE_URL}/result/getAcadYears`,
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                });
            setAcadYears(data.data.data);
            setLoading(false);
        } catch (err) {
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
        }
    },[accessToken]);

    useEffect(() => {
        fetchAcadYears()
    }, [fetchAcadYears])

    const handleChange = e => {
        var tmp = { ...details }
        tmp[e.target.id] = e.target.value
        setDetails(tmp)
    };

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            const accessToken = cookies.token;
            const data = await axios.get(`${BASE_URL}/result/getStudentResultByClass?yr=${details.acadYear}&cls=${details.cls}`,
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                })
            printMarksheet([data.data.data, details.acadYear])
            setLoading(false);
            toast.success("Marksheets downloaded!", {
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
                <Form onSubmit={submitHandler} className='mx-auto'>
                    <h1>Print Marksheets</h1>
                    <Container>
                        <Row>
                            <Col lg="6">
                                <FormGroup className='text-center'>
                                    <label className="mb-2" htmlFor="acadYear">
                                        Academic Year
                                    </label>
                                    <div className="facInputBox">
                                    <select
                                            className="form-select mx-auto text-center"
                                            aria-label="Default select example"
                                            id="acadYear"
                                            required
                                            onChange={handleChange}
                                            value={details.acadYear}
                                        >
                                            <option value="">--Select--</option>
                                            {acadYears.map((elem, ind)=><option key={ind} value={elem}>{elem}</option>)}
                                        </select>
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup className='text-center'>
                                    <label className="mb-2" htmlFor="cls">
                                        Class
                                    </label>
                                    <div className="facInputBox">
                                        <select
                                            className="form-select mx-auto text-center"
                                            aria-label="Default select example"
                                            id="cls"
                                            required
                                            onChange={handleChange}
                                            value={details.cls}
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

export default ReportCards
