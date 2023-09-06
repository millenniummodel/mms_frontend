import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";
import AlertConfirm from 'react-alert-confirm';
import 'react-alert-confirm/lib/style.css';
import { Link } from "react-router-dom";
import Navbar from "../../../Navbar/Navbar";
import Footer from "../../../Footer/Footer";
import reverseDate from "../../../../utils/rverseDate";
import EditNotice from "../EditNotice/EditNotice";
import { BASE_URL } from "../../../../config/config";
import { toast } from 'react-toastify';
import { useAuth } from "../../../../Hooks/auth";
import Loader from "../../../Loader/Loader";
import './GetNotices.css'

const GetNotices = () => {
  const [notices, setnotices] = useState([]);
  const [noticeData, setnoticeData] = useState({});
  const { cookies } = useAuth();
  const [loading, setLoading] = useState(false)
  const accessToken = cookies.token;


  const fetchnotices = useCallback(async () => {
    try {
      setLoading(true);
      const data = await axios.get(`${BASE_URL}/notice`,
        {
          headers: {
            token: `Bearer ${accessToken}`
          }
        });
      setnotices(data.data.data);
      setLoading(false);
    }
    catch (err) {
      setLoading(false);
      return toast.error("Something went wrong", {
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
    fetchnotices();
  }, [fetchnotices]);

  const deleteHandler = async (id) => {
    try {
      const [isOk] = await AlertConfirm('Are you sure?');
      if (!isOk) return
      setLoading(true);
      const accessToken = cookies.token;
      await axios.delete(`${BASE_URL}/notice/${id}`,
        {
          headers: {
            token: `Bearer ${accessToken}`
          }
        });
      toast.success("Notice deleted!", {
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
      fetchnotices();

    } catch (err) {
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
  };

  return (
    <>
      <EditNotice noticeData={noticeData} />
      <Navbar />
      {loading ? <Loader /> : <Container>
        <Row className="big_screen_notice_res">
          <div className="search_student_list_main mx-auto">
            <Row>
              <h1 className="all-fac-head">All notices</h1>
            </Row>
            <Row className="search_student_list_head">
              <Col lg="6">Headline</Col>
              <Col lg="3">Date Created</Col>
              <Col lg="1">View</Col>
              <Col lg="1">Edit</Col>
              <Col lg="1">Delete</Col>
            </Row>
            {notices.map((result) => {
              var datee
              if (result.createdAt) datee = reverseDate(result.createdAt.split('T')[0])
              return (
                <Row key={result._id} className="search_student_list_cont admin_fac_result">
                  <Col lg="6">{result.heading}</Col>
                  <Col lg="3">{datee}</Col>
                  <Col lg="1">
                    <Link
                      target="_blank"
                      to={`${result.link}`}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </Link>
                  </Col>
                  <Col lg="1">
                    <i
                      title="Edit"
                      className="fa-solid fa-pen-to-square"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_notice_modal"
                      onClick={() => setnoticeData(result)}
                    ></i>
                  </Col>
                  <Col lg="1">
                    <i
                      title="Delete"
                      className="fa-solid fa-trash ms-4"
                      onClick={() => deleteHandler(result._id)}
                    ></i>
                  </Col>
                </Row>
              );
            })}
          </div>
        </Row>
      </Container>}

      {loading ? <Loader /> : <Container>
        <Row className="small_screen_notice_res">
          <div className="search_student_list_main mx-auto">
            <Row>
              <h1 className="all-fac-head">All notices</h1>
            </Row>
            {notices.map((result) => {
              var datee
              if (result.createdAt) datee = reverseDate(result.createdAt.split('T')[0])
              return (
                <div key={result._id} className='my-4'>
                  <div className="">

                    <div className='d-flex'>
                      <div className='notice_res_headers'>Headline</div><div className=' notice_res_list'>{result.heading}</div>
                    </div>

                    <div className='d-flex'>
                      <div className=' notice_res_headers'>Date Created</div><div className=' notice_res_list'>{datee}</div>
                    </div>

                    <div className='d-flex'>
                      <div className=' notice_res_headers'>View</div><div className=' notice_res_list'>
                        <Link
                          target="_blank"
                          to={`${result.link}`}
                        >
                          <i className="fa-solid fa-eye"></i>
                        </Link>
                      </div>
                    </div>

                    <div className='d-flex'>
                      <div className=' notice_res_headers'>Edit</div><div className=' notice_res_list'>
                        <i
                          title="Edit"
                          className="fa-solid fa-pen-to-square"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_notice_modal"
                          onClick={() => setnoticeData(result)}
                        ></i>
                      </div>
                    </div>

                    <div className='d-flex'>
                      <div className=' notice_res_headers'>Delete</div><div className=' notice_res_list'>
                        <i
                          title="Delete"
                          className="fa-solid fa-trash ms-4"
                          onClick={() => deleteHandler(result._id)}
                        ></i>
                      </div>
                    </div>
                  </div>

                </div>
              );

            })}
          </div>
        </Row>
      </Container>}
      <Footer mode="dark" />
    </>

  );
};

export default GetNotices;
