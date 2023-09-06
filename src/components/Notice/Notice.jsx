import React, { useEffect, useState } from 'react'
import './Notice.css'
import axios from 'axios'
import { BASE_URL } from '../../config/config'
import reverseDate from '../../utils/rverseDate'
import Loader from '../../components/Loader/Loader'
import { toast } from 'react-toastify';
import { Fade } from "react-awesome-reveal";


const Notice = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchNotices = async () => {
        try {
            setLoading(true);
            const data = await axios.get(`${BASE_URL}/notice/getTopNotices`);
            setNotices(data.data.data);
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
    };
    useEffect(() => {
        fetchNotices();
    }, []);
    return (
        <>
        <Fade>
            <div className="notice_main">
                <div className="notice_right">
                    <h2>Notice board</h2>
                    <p className="notice_head_content">
                        From academic updates to extracurricular activities, our Notice
                        Board keeps you connected to all the happenings in our vibrant
                        school community. Check back regularly to ensure you never miss a
                        beat and stay engaged with the latest news and updates.
                    </p>
                </div>
                <div className="notice notice_box">
                    <div className="noticelist">
                        {loading ? <Loader /> : notices.map((elem) => {
                            var datee
                            if (elem.createdAt) datee = reverseDate(elem.createdAt.split('T')[0])
                            const today = new Date()
                            const d = new Date(elem.createdAt)
                            const timeDifference = today - d;
                            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
                            var display = "none"
                            if (daysDifference <= 7) {
                                display = "inline"
                            }
                            return (
                                <div key={elem._id} className="ind_notice">
                                    <p className="ind_notice_head pb-1">
                                        {elem.heading}
                                        <span className={`badge d-${display}`}>New</span>
                                    </p>
                                    <div className="ind_notice_bottom">
                                        <p>&gt;&gt; {datee}</p>
                                        <a href={elem.link} target='_blank' rel="noreferrer">View More ...</a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            </Fade>
        </>
    );

}

export default Notice