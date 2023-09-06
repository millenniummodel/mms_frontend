import React, { useCallback, useEffect, useState } from 'react'
import './DashBoard.css'
import StudentChart from './StudentChart'
import Footer from '../../Footer/Footer'
import { Link } from 'react-router-dom'
import Navbar from '../../Navbar/Navbar'
import CountUp, { useCountUp } from 'react-countup';
import axios from 'axios'
import { BASE_URL, CRYPTO_SEC, CURRENT_YEAR } from "../../../config/config";
import CryptoJS from "crypto-js";
import { useAuth } from ".././../../Hooks/auth";
import { toast } from 'react-toastify';
import Loader from '../../Loader/Loader'
import AlertConfirm from 'react-alert-confirm'



const DashBoard = () => {
    const [studentData, setStudentData] = useState({});
    const [userType, setuserType] = useState("");
    const { cookies } = useAuth();
    const [loading, setLoading] = useState(false)
    
    
    const fetchData = useCallback(async () => {
        try {
            const accessToken = cookies.token;
            const bytes = CryptoJS.AES.decrypt(cookies.type, CRYPTO_SEC);
            const decryptedType = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            setuserType(decryptedType);

            const data = await axios.get(
                `${BASE_URL}/student/countstudents`,
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                });
            setStudentData(data.data);
        } catch (err) {
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
    },[cookies]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const handleCreateAcadYear = async (e) => {
        e.preventDefault()
        try {
            const accessToken = cookies.token
            const [conf]=await AlertConfirm("Are you sure?")
            if(!conf) return
            setLoading(true);
            await axios.post(`${BASE_URL}/result/createAcadYear`, { acadYear: CURRENT_YEAR },
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                })
            toast.success("New academic year created successfully!", {
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

        }
    }

    return (
        <>
            <Navbar loggedIn={true} />
            {loading ? <Loader /> : <div className="admin_main_cont">
                <header>
                    <div className="topBanner_admin">
                        <div className="topBanner_head  topBanner_admin_head col-md-3">
                            <p className="fs-1">{userType} DASHBOARD</p>
                        </div>
                        <div className="topBanner_admin_cat col-md-2">
                            <i className="fa-solid fa-child"></i>
                            <p className="topbanner_cat_admin_head">Students</p>
                        </div>
                        <div className="topBanner_admin_cat col-md-2">
                            <i className="fa-solid fa-person-chalkboard"></i>
                            <p className="topbanner_cat_admin_head"> Faculties</p>
                        </div>
                        <div className="topBanner_admin_cat col-md-2">
                            <i className="fa-solid fa-book"></i>
                            <p className="topbanner_cat_admin_head">Examination</p>
                        </div>
                        <div className="topBanner_admin_cat col-md-2">
                            <i className="fa-solid fa-file"></i>
                            <p className="topbanner_cat_admin_head">Transfer Certificate</p>
                        </div>
                    </div>
                </header>
                <div className="admin_stats_main">
                    <div className="student_chart">
                        <StudentChart count={studentData.count} />
                    </div>
                    <div className="chart_grp">
                        <div className="stats_small_box total_students_stats">
                            <p className="stats_title">Total Students Enrolled</p>
                            <p className="stats_cnt">
                                <CountUp start={0} end={studentData.totalStudents} delay={0}>
                                    {({ countUpRef }) => (
                                        <div>
                                            <span ref={countUpRef} />
                                        </div>
                                    )}
                                </CountUp>
                            </p>
                        </div>
                        <div className="stats_small_box curr_students_stats">
                            <p className="stats_title">Current Students</p>
                            <p className="stats_cnt">
                                <CountUp start={0} end={studentData.currStudents} delay={0}>
                                    {({ countUpRef }) => (
                                        <div>
                                            <span ref={countUpRef} />
                                        </div>
                                    )}
                                </CountUp>
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        userType === "Admin" ? `d-flex admin_student_main` : "d-none"
                    }
                >
                    <div className="admin_cat_box">
                        <div className="admin_cat_head">STUDENTS</div>
                        <div className="admin_links_box_grp">
                            <div className="admin_links_box">
                                <Link to="/add-student">Add Student</Link>
                            </div>

                            <div className="admin_links_box">
                                <Link to={`/search-student`}>Search student</Link>
                            </div>
                            <div className="admin_links_box">
                                <Link to="/add-multiple-students">Add multiple Students</Link>
                            </div>
                            <div className="admin_links_box">
                                <Link to="/update-classes">Update Classes</Link>
                            </div>
                        </div>
                    </div>

                    <div className="admin_cat_box">
                        <div className="admin_cat_head">USERS</div>
                        <div className="admin_links_box_grp">
                            <div className="admin_links_box">
                                <Link to="/add-faculty">Add Faculty</Link>
                            </div>
                            <div className="admin_links_box">
                                <Link to="/get-faculties">Get all faculties</Link>
                            </div>
                            <div className="admin_links_box">
                                <Link to="/register">Register User</Link>
                            </div>
                            <div className="admin_links_box">
                                <Link to="/get-users">Get All User</Link>
                            </div>
                        </div>
                    </div>

                    <div className="admin_cat_box">
                        <div className="admin_cat_head">TC & NOTICES</div>
                        <div className="admin_links_box_grp">
                            <div className="admin_links_box">
                                <Link to="/issue-tc">Issue TC</Link>
                            </div>
                            <div className="admin_links_box">
                                <Link to="/add-notice">Add Notice</Link>
                            </div>
                            <div className="admin_links_box">
                                <Link to="/get-notices">Get All Notices</Link>
                            </div>
                        </div>
                    </div>

                    <div className="admin_cat_box">
                        <div className="admin_cat_head">EXAMINATION</div>
                        <div className="admin_links_box_grp">
                            <div className="admin_links_box">
                                <Link to="/admit-card">Admit Card</Link>
                            </div>
                            <div className="admin_links_box">
                                <Link to="/report-cards">Report Card</Link>
                            </div>
                            <div className="admin_links_box">
                                <Link to="/view-result">View/Edit Result</Link>
                            </div>
                            <div className="admin_links_box">
                                <div onClick={handleCreateAcadYear}>Create Acad Year</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        userType === "Faculty" ? `d-flex admin_user_main` : "d-none"
                    }
                >
                    <div className="admin_user_perm_box">
                        <Link to={`/search-student`}>Search student</Link>
                    </div>
                    <div className="admin_user_perm_box">
                        <Link to="/admit-card">Admit Card</Link>
                    </div>
                    <div className="admin_user_perm_box">
                        <Link to="/view-result">View/Edit Result</Link>
                    </div>
                </div>
                <Footer mode="light" />
            </div>}
        </>
    );

}

export default DashBoard
