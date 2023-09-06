import React, { useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import axios from "axios";
import { BASE_URL } from "../../../../config/config";
import Navbar from "../../../Navbar/Navbar";
import Footer from "../../../Footer/Footer";
import 'react-alert-confirm/lib/style.css';
import AlertConfirm from 'react-alert-confirm';
import { toast } from 'react-toastify';
import { useAuth } from "../../../../Hooks/auth";
import Loader from "../../../Loader/Loader";


const AddNotice = () => {
  const [noticeDetails, setNoticeDetails] = useState({
    heading: "",
    link: ""
  });
  const [loading, setLoading] = useState(false)
  const { cookies } = useAuth();

  const handleChange = (e) => {
    setNoticeDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const [isOk] = await AlertConfirm('Are you sure?');
      if (!isOk) return
      setLoading(true);
      const accessToken = cookies.token;
      await axios.post(`${BASE_URL}/notice`, noticeDetails,
        {
          headers: {
            token: `Bearer ${accessToken}`
          }
        });
      toast.success("Notice added successfully!", {
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
      setTimeout(() => {
        window.location.reload();
      }, [1500]);

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
      <Navbar />
      {loading ? <Loader /> : <Container className="add_faculty_main_cont">
        <Form onSubmit={submitHandler}>
          <h1>Add Notice</h1>
          <Container>
            <Row>
              <Col lg="12">
                <FormGroup>
                  <label className="mb-2" htmlFor="heading">
                    Headline
                  </label>
                  <input
                    type="text"
                    id="heading"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col lg="12">
                <FormGroup>
                  <label className="mb-2" htmlFor="link">
                    PDF Link
                  </label>
                  <input
                    type="text"
                    id="link"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="add_faculty_submit_btn_box" lg="12">
                <button className="add_faculty_submit_btn" type="submit">
                  Add
                </button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Container>}
      <Footer />
    </>

  );
};

export default AddNotice;
