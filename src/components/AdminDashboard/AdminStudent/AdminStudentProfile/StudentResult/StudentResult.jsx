import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import AlertConfirm from 'react-alert-confirm';
import 'react-alert-confirm/lib/style.css';
import { BASE_URL } from "../../../../../config/config";
import Loader from "../../../../Loader/Loader";
import { values } from "../../../../../templateObjects/templateObjects";
import printMarksheet from "../../../../../utils/printMarksheet";
import { useAuth } from "../../../../../Hooks/auth";
import { toast } from 'react-toastify';


const StudentResult = ({ acadYear, admNo, userType }) => {
    const [resultData, setResultData] = useState({});
    const [loading, setLoading] = useState(true);
    const [halfYearlyData, setHalfYearlyData] = useState([]);
    const [annualData, setAnnualData] = useState({});
    const [attendence, setAttendence] = useState('-');
    const [valuesData, setValuesData] = useState({});
    const { cookies } = useAuth();
    const accessToken = cookies.token;

    const fetchdata = useCallback(async () => {
        setLoading(true);
        try {
            const data = await axios.get(
                `${BASE_URL}/result/getStudentResult?yr=${acadYear}&admNo=${admNo}`,
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                });
            setResultData(data.data.data);
            setHalfYearlyData(data.data.data.halfYearlyObt);
            setAnnualData(data.data.data.annualObt);
            setAttendence(data.data.data.attendence);
            setValuesData(data.data.data.values);
            setLoading(false);
        } catch (err) {
            setResultData(null)
            setLoading(false)
        }
    },[accessToken, acadYear, admNo]);

    useEffect(() => {
        fetchdata();
    }, [admNo, acadYear,fetchdata]);

    const handleResultUpdate = async () => {
        try {
            const [isOk] = await AlertConfirm('Are you sure?');
            if (!isOk) return
            setLoading(true);
            const accessToken = cookies.token;
            await axios.put(`${BASE_URL}/result/updateStudentResult`, {
                year: acadYear,
                admNo: admNo,
                halfYearlyMarks: halfYearlyData,
                annualMarks: annualData,
                values: valuesData,
                attendence: attendence
            },
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                })
            setLoading(false);
            fetchdata()
            toast.success("Result updated successfully!", {
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
        }
    }

    const handleHalfYearlyChange = (e, ind) => {
        var temp = [...halfYearlyData];
        temp[ind] = e.target.value;
        setHalfYearlyData(temp);
    };

    const handleAnnualChange = (e, ind) => {
        var temp = [...annualData];
        temp[ind] = e.target.value;
        setAnnualData(temp);
    };

    const handleValuesChange = (e, ind) => {
        var temp = [...valuesData];
        temp[ind] = e.target.value;
        setValuesData(temp);
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : !resultData ? (
                <h1 className="loader">No records found</h1>
            ) : (
                <div className="student_profile_main">
                    <section className="profile_head">
                        <p className="stu_name">{resultData.studentDetails.name}</p>
                        <div className="row g-2">
                            <div className="profile_head_grp col-md-6">
                                <h4>Admission Number : </h4>
                                <p>{resultData.admNo}</p>
                            </div>
                            <div className="profile_head_grp col-md-6">
                                <h4>Class : </h4>
                                <p>{resultData.cls}</p>
                            </div>
                            <div className="profile_head_grp col-md-6">
                                <h4>Year : </h4>
                                <p>{acadYear}</p>
                            </div>
                        </div>
                    </section>
                    <section className="admin_result_main_cont mt-3">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="false"
                                        aria-controls="collapseOne"
                                    >
                                        Half Yearly Examinations
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse">
                                    <div className="accordion-body">
                                        <div className="result_list_head">
                                            <div className="result_list_item_part">Subjects</div>
                                            <div className="result_list_item_part">Maximum Marks</div>
                                            <div className="result_list_item_part">
                                                Obtained Marks
                                            </div>
                                        </div>
                                        {resultData.subjects.map((val, ind) => {
                                            return (
                                                <div key={ind} className="result_list_item">
                                                    <div className="result_list_item_part">{val}</div>
                                                    <div className="result_list_item_part">
                                                        {resultData.halfYearlyMax}
                                                    </div>
                                                    <div className="result_list_item_part">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={halfYearlyData[ind]}
                                                            onChange={(e) => handleHalfYearlyChange(e, ind)}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                    >
                                        Annual Examinations
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse">
                                    <div className="accordion-body">
                                        <div className="result_list_head">
                                            <div className="result_list_item_part">Subjects</div>
                                            <div className="result_list_item_part">Maximum Marks</div>
                                            <div className="result_list_item_part">
                                                Obtained Marks
                                            </div>
                                        </div>
                                        {resultData.subjects.map((val, ind) => {
                                            return (
                                                <div key={ind} className="result_list_item">
                                                    <div className="result_list_item_part">{val}</div>
                                                    <div className="result_list_item_part">
                                                        {resultData.annualMax}
                                                    </div>
                                                    <div className="result_list_item_part">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={annualData[ind]}
                                                            onChange={(e) => handleAnnualChange(e, ind)}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree"
                                        aria-expanded="false"
                                        aria-controls="collapseThree"
                                    >
                                        Values
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse">
                                    <div className="accordion-body">
                                        <div className="result_list_head">
                                            <div className="result_list_item_part">Values</div>
                                            <div className="result_list_item_part">Grade</div>
                                        </div>
                                        {values.map((val, ind) => {
                                            return (
                                                <div key={ind} className="result_list_item">
                                                    <div className="result_list_item_part">{val}</div>
                                                    <div className="result_list_item_part">
                                                        <select
                                                            value={valuesData[ind]}
                                                            className="form-control form-select"
                                                            onChange={(e) => handleValuesChange(e, ind)}
                                                        >
                                                            <option value={"A"}>A</option>
                                                            <option value={"B"}>B</option>
                                                            <option value={"C"}>C</option>
                                                            <option value={"D"}>D</option>
                                                            <option value={"E"}>E</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <div className="result_attendence mt-3">
                                            <div className="result_attendence_head">Attendence:</div>
                                            <div className="result_attendence_count">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={attendence}
                                                    onChange={(e) => setAttendence(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="add_faculty_submit_btn_box mt-4">
                        <button
                            className="add_faculty_submit_btn"
                            onClick={handleResultUpdate}
                        >
                            Update Result
                        </button>
                        {userType === "Admin" && (
                            <button
                                className="add_faculty_submit_btn ms-3 "
                                onClick={async () => {
                                    const [conf] = await AlertConfirm("Are you sure?")
                                    if (!conf) return;
                                    printMarksheet([[resultData], acadYear]);
                                }}
                            >
                                Print Marksheet
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default StudentResult;
