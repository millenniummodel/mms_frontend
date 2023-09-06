import axios from "axios";
import AlertConfirm from 'react-alert-confirm';
import 'react-alert-confirm/lib/style.css';
import reverseDate from "../../../../../utils/rverseDate";
import EditStudent from "../../EditStudent/EditStudent";
import { BASE_URL } from "../../../../../config/config";
import printTC from "../../../../../utils/printTC";
import { useAuth } from "../../../../../Hooks/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../../../Loader/Loader";
import { toast } from 'react-toastify';

const StudentProfile = ({ studentData, userType }) => {
    const { cookies } = useAuth();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const deleteHandler = async (id) => {
        try {
            const [isOk] = await AlertConfirm('Are you sure?');

            if (!isOk) return
            setLoading(true);
            const accessToken = cookies.token;
            await axios.delete(`${BASE_URL}/student/deletestudent/${id}`,
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                });
            toast.success("Student deleted successfully!!", {
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
            navigate("/search-student");

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
            return;
        }
    };

    return (
        <>
            <EditStudent studentData={studentData} />
            {loading ? (
                <Loader />
            ) : (
                <div className="student_profile_main">
                    <section className="profile_top">
                        <div className="profile_head">
                            <p className="stu_name">{studentData.name}</p>
                            <div className="profile_head_grp">
                                <h4>Admission Number : </h4>
                                <p>{studentData.admNo}</p>
                            </div>
                            <div className="profile_head_grp">
                                <h4>Class : </h4>
                                <p>{studentData.class}</p>
                            </div>
                            <div className="profile_head_grp">
                                <h4>Gender : </h4>
                                <p>{studentData.gender}</p>
                            </div>
                            <div className="profile_head_grp">
                                <h4>Category : </h4>
                                <p>{studentData.category}</p>
                            </div>
                        </div>
                        <div className="profile_pic">
                            <img src={studentData.photo} alt="" />
                        </div>
                    </section>
                    <div className="profile_bottom row g-3">
                        <div className="profile_head_grp">
                            <h4>Mother's Name : </h4>
                            <p>{studentData.mName}</p>
                        </div>
                        <div className="profile_head_grp col-md-6">
                            <h4>Father's Name : </h4>
                            <p>{studentData.fName}</p>
                        </div>
                        <div className="profile_head_grp col-md-6">
                            <h4>Date of Birth : </h4>
                            <p>{reverseDate(studentData.dob)}</p>
                        </div>
                        <div className="profile_head_grp col-md-6">
                            <h4>Roll Number : </h4>
                            <p>{studentData.rollNo}</p>
                        </div>
                        <div className="profile_head_grp">
                            <h4>Address : </h4>
                            <p>{studentData.address}</p>
                        </div>
                        <div className="profile_head_grp col-md-6">
                            <h4>Nationality : </h4>
                            <p>{studentData.nationality}</p>
                        </div>
                        <div className="profile_head_grp col-md-6">
                            <h4>Phone Number : </h4>
                            <p>{studentData.phNo}</p>
                        </div>
                        <div className="profile_head_grp col-md-6">
                            <h4>Aadhar Number : </h4>
                            <p>{studentData.aadhar}</p>
                        </div>
                        <div className="profile_head_grp col-md-6">
                            <h4>Samagra ID : </h4>
                            <p>{studentData.sssm}</p>
                        </div>
                        <div className="profile_head_grp col-md-6">
                            <h4>Date of Admission : </h4>
                            <p>{reverseDate(studentData.doa)}</p>
                        </div>
                        <div className="profile_head_grp col-md-6">
                            <h4>Class of Admission : </h4>
                            <p>{studentData.admClass}</p>
                        </div>
                        <div className="profile_head_grp col-md-6">
                            <h4>TC Taken: </h4>
                            <p>{studentData.tc}</p>
                        </div>

                        {studentData.tc === "Yes" && (
                            <>
                                <div className="profile_head_grp col-md-6">
                                    <h4>Date of leaving school : </h4>
                                    <p>{reverseDate(studentData.tcDetails.dol)}</p>
                                </div>

                                <div className="profile_head_grp col-md-6">
                                    <h4>TC issued on : </h4>
                                    <p>{reverseDate(studentData.tcDetails.issueDate)}</p>
                                </div>

                                <div className="profile_head_grp col-md-6">
                                    <h4>Student passed in last class : </h4>
                                    <p>{studentData.tcDetails.passed}</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="edit_student_btn_box d-flex gap-3 justify-content-center">
                        <button
                            className="btn btn-success"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_student_modal"
                        >
                            Edit Profile
                        </button>
                        {userType === "Admin" && (
                            <button
                                className="d-block btn btn-danger"
                                onClick={() => deleteHandler(studentData._id)}
                            >
                                Delete Profile
                            </button>
                        )}
                        {userType === "Admin" && studentData.tc === "Yes" && (
                            <button
                                className="d-block btn btn-primary text-white px-4"
                                onClick={async () => {
                                    const [conf] = await AlertConfirm("Are you sure?")
                                    if (!conf) return;
                                    printTC([studentData]);
                                }}
                            >
                                Print TC
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default StudentProfile;
