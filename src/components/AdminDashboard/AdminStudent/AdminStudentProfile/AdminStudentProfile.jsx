import React, { useCallback, useEffect, useState } from 'react'
import { studentObj } from '../../../../templateObjects/templateObjects';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, CURRENT_YEAR, CRYPTO_SEC } from '../../../../config/config';
import reverseDate from '../../../../utils/rverseDate';
import Footer from '../../../Footer/Footer';
import StudentProfile from './StudentProfile/StudentProfile';
import StudentResult from './StudentResult/StudentResult';
import './AdminStudentProfile.css'
import Navbar from '../../../Navbar/Navbar';
import { useAuth } from '../../../../Hooks/auth';
import CryptoJS from "crypto-js";
import Loader from '../../../Loader/Loader';
import { toast } from 'react-toastify';


const AdminStudentProfile = () => {
    const [studentData, setStudentData] = useState(studentObj);
    const [section, setSection] = useState("profile");
    const [resultYear, setResultYear] = useState(CURRENT_YEAR);
    const [activeId, setActiveId] = useState(-1);
    const [yearArray, setYearArray] = useState([]);
    const { id } = useParams();
    const { cookies } = useAuth();
    const [loading, setLoading] = useState(false)

    const bytes = CryptoJS.AES.decrypt(cookies.type, CRYPTO_SEC)
    const userType = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const accessToken = cookies.token;

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const yearData = await axios.get(`${BASE_URL}/result/getAcadYears`,
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                });
            setYearArray(yearData.data.data)
            const data = await axios.get(`${BASE_URL}/student/getstudentbyid/${id}`,
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                });
            data.data.dob = reverseDate(data.data.dob);
            data.data.doa = reverseDate(data.data.doa);
            data.data.tcDetails.dol = reverseDate(data.data.tcDetails.dol);
            data.data.tcDetails.issueDate = reverseDate(data.data.tcDetails.issueDate);
            setStudentData(data.data);
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
    },[accessToken,id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const activeStyle = {
        backgroundColor: "#ff8700",
        color: "white",
    };
    const activeResultYearStyle = {
        backgroundColor: "#faa13b",
        color: "white",
    };
    const handleSidebarResultClick = (elem, ind) => {
        setSection("result")
        setResultYear(elem);
        setActiveId(ind);
    };

    const [sideBarDisplay, setSideBarDisplay] = useState("none")
    const openSide = () => {
        if (sideBarDisplay === "none") setSideBarDisplay("flex");
        else setSideBarDisplay("none");
    };
    const closeSide = () => {
        if (sideBarDisplay === "none") setSideBarDisplay("flex");
        else setSideBarDisplay("none");
    }
    return (
        <>
            <Navbar />
            <div className="student_main_cont">
                <div className={`sideBarToggle`} onClick={openSide}>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className={`student_sidebar d-${sideBarDisplay}`}>
                    <div className={`sideBarClose d-${sideBarDisplay}`}>
                        <i className="fa-solid fa-xmark" onClick={closeSide}></i>
                    </div>
                    <div
                        onClick={() => {
                            setSection("profile")
                            closeSide()
                        }}
                        style={section === "profile" ? activeStyle : {}}
                        className="side_cat"
                    >
                        Profile
                    </div>
                    <div className="accordion accordion-flush">
                        <div className="accordion-item">
                            <div className="accordion-header">
                                <button
                                    className=" side_cat"
                                    onClick={() => setSection("result")}
                                    style={section === "result" ? activeStyle : {}}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#sidebar_accordian"
                                    aria-controls="sidebar_accordian"
                                >
                                    Results
                                </button>
                            </div>
                            <div
                                id="sidebar_accordian"
                                className="accordion-collapse collapse"
                            >
                                <div className="accordion-body">
                                    {yearArray.map((elem, ind) => {
                                        return (
                                            <div key={ind}>
                                                <div
                                                    className="sidebar_year_list"
                                                    onClick={() => {
                                                        handleSidebarResultClick(elem, ind)
                                                        closeSide()
                                                    }}
                                                    style={activeId === ind ? activeResultYearStyle : {}}
                                                >
                                                    {elem}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`student_sidebar sidebar1`}>
                    <div
                        onClick={() => setSection("profile")}
                        style={section === "profile" ? activeStyle : {}}
                        className="side_cat"
                    >
                        Profile
                    </div>
                    <div className="accordion accordion-flush">
                        <div className="accordion-item">
                            <div className="accordion-header">
                                <button
                                    className=" side_cat"
                                    onClick={() => setSection("result")}
                                    style={section === "result" ? activeStyle : {}}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#sidebar_accordian"
                                    aria-controls="sidebar_accordian"
                                >
                                    Results
                                </button>
                            </div>
                            <div
                                id="sidebar_accordian"
                                className="accordion-collapse collapse"
                            >
                                <div className="accordion-body">
                                    {yearArray.map((elem, ind) => {
                                        return (
                                            <div key={ind}>
                                                <div
                                                    className="sidebar_year_list"
                                                    onClick={() => handleSidebarResultClick(elem, ind)}
                                                    style={activeId === ind ? activeResultYearStyle : {}}
                                                >
                                                    {elem}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <div className="student_body">
                        <div className={section === "profile" ? "d-flex" : "d-none"}>
                            <StudentProfile studentData={studentData} userType={userType} />
                        </div>
                        <div
                            className={
                                section === "result" && activeId > -1 ? "d-flex" : "d-none"
                            }
                        >
                            {section === "result" && (
                                <StudentResult
                                    acadYear={resultYear}
                                    admNo={studentData.admNo}
                                    userType={userType}
                                />
                            )}
                        </div>
                        <div
                            className={
                                section === "result" && activeId === -1
                                    ? "d-block text-center mt-5"
                                    : "d-none"
                            }
                        >
                            <h1>Choose the year to display the result</h1>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>

    );

}

export default AdminStudentProfile
