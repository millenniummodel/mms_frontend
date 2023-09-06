import React, { useState } from 'react'
import './UpdateClasses.css'
import { BASE_URL } from '../../../../config/config'
import axios from 'axios'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { useAuth } from '../../../../Hooks/auth'
import Footer from '../../../Footer/Footer'
import Loader from '../../../Loader/Loader'
import { toast } from 'react-toastify';
import Navbar from '../../../Navbar/Navbar'


const UpdateClasses = () => {
    const [studentDetails, setstudentDetails] = useState({
        failed: ""
    })
    const { cookies } = useAuth();
    const [loading, setLoading] = useState(false)


    const handleChange = e => {
        setstudentDetails(prev => ({ ...prev, [e.target.id]: e.target.value }))
    };

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            const accessToken = cookies.token;
            await axios.put(`${BASE_URL}/student/updateclass`, studentDetails,
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                });
                toast.success("Classes & Roll No. updated!", {
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
            <Navbar/>
            {loading ? <Loader /> : <Container className="add_student_main_cont my-0">
                <Form onSubmit={submitHandler}>
                    <h1>Update Classes</h1>
                    <Container>
                        <Row>
                            <Col lg="12">
                                <FormGroup className="text-center">
                                    <label className="mb-2" htmlFor="failed">
                                        Admission number of failed students{" "}
                                        <span>(separated by space)</span>
                                    </label>
                                    <div className="facInputBox">
                                        <input type="text" id="failed" onChange={handleChange} />
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col className="add_faculty_submit_btn_box" lg="12">
                                <button className="add_faculty_submit_btn" type="submit">
                                    Update
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

export default UpdateClasses
