import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { BASE_URL } from '../../../../config/config';
import axios from 'axios';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import Navbar from '../../../Navbar/Navbar';
import Footer from '../../../Footer/Footer';
import './AddMultipleStudents.css'
import 'react-alert-confirm/lib/style.css';
import AlertConfirm from 'react-alert-confirm';
import { useAuth } from '../../../../Hooks/auth';
import Loader from '../../../Loader/Loader';
import { toast } from 'react-toastify';


const AddMultipleStudents = () => {
    const [excelData, setExcelData] = useState(null);
    const [admNos, setAdmNos] = useState([]);
    const { cookies } = useAuth();
    const [loading, setLoading] = useState(false)

    const handleFileChange = (e) => {

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            const tmp=convertToJson(jsonData)
            setExcelData(tmp.result);
            setAdmNos(tmp.admNos)
        };

        reader.readAsBinaryString(file);
    };

    const submitHandler = async (e) => {
        e.preventDefault()
        const [isOk] = await AlertConfirm('Are you sure?');
        if (!isOk) return

        try {
            setLoading(true);
            const accessToken = cookies.token;
            await axios.post(`${BASE_URL}/student/insertmultiplestudents`, {
                studentsData: {excelData, admNos},
            },
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                });
                setLoading(false);
                toast.success("Students added!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
            window.location.reload();
        }
        catch (err) {
            setLoading(false);
            return toast.error(err.response.data, {
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

    const convertToJson = (data) => {
        var result = []
        var admNos=[]
        var headers = data[0];
        const tcDetails = {
            dol: "",
            issueDate: "",
            passed: "",
            certificateNo: ""
        }

        for (var i = 1; i < data.length; i++) {
            var obj = {};
            var f = 0;
            for (var j = 0; j < headers.length; j++) {
                if (data[i][j]) f = 1;
                obj[headers[j]] = data[i][j];
            }
            obj["tcDetails"] = tcDetails
            if (f) { 
                result.push(obj); 
                admNos.push(obj.admNo)
            }
        }
        return {result, admNos}
    }

    return (
        <>
            <Navbar />

            {loading ? <Loader /> : <Container className="d-flex justify-content-center">
                <Row className="search_multiple_student_main_cont">
                    <Form className="search-form" onSubmit={submitHandler}>
                        <h1>Add Multiple Students</h1>
                        <Container>
                            <Row>
                                <FormGroup>
                                    <div className="fileInputBox ">
                                        <input
                                            type="file"
                                            accept=".xlsx,.xls"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </div>
                                </FormGroup>
                            </Row>
                            <Row>
                                <Col lg="4" className="add_faculty_submit_btn_box mx-auto mt-4">
                                    <button className="add_faculty_submit_btn" type="submit">
                                        Add
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>

                </Row>
            </Container>}
            <Footer mode="dark" />
        </>

    )
}

export default AddMultipleStudents
