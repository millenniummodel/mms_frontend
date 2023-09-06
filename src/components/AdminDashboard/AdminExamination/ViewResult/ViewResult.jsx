import React, {useState } from "react";
import axios from "axios";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { BASE_URL, CURRENT_YEAR } from "../../../../config/config";
import { useAuth } from "../../../../Hooks/auth";
import EditResult from "../EditResult/EditResult";
import Footer from "../../../Footer/Footer";
import Navbar from "../../../Navbar/Navbar";
import { randomResultValue } from "../../../../templateObjects/templateObjects";
import './ViewResult.css'
import { toast } from 'react-toastify';
import Loader from "../../../Loader/Loader";


const ViewResult = () => {
  const [Results, setResults] = useState([]);
  const [resultData, setresultData] = useState(randomResultValue);
  const [searchClass, setSearchClass] = useState("")
  const { cookies } = useAuth();
  const [loading, setLoading] = useState(false)
  const fetchAgain = (e) => {
    fetchResults(e)
  }
  const searchYear = CURRENT_YEAR

  const fetchResults = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const accessToken = cookies.token
      var data = [];
      data = await axios.get(
        `${BASE_URL}/result/getStudentResultByClass?yr=${searchYear}&cls=${searchClass}`,
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );
      setResults(data.data.data);
      setLoading(false);
    }
    catch (err) {
      setResults([])
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

  return (
    <>
      <EditResult resultData={resultData} acadYear={searchYear} fetchAgain={fetchAgain} />
      <Navbar />
      <Container>
        <Row className="search_result_main_cont">
          <Form className="search-form" onSubmit={fetchResults}>
            <h1>Current Year Result</h1>
            <Container>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label className="mb-2" htmlFor="searchYear">
                      Academic Year:
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="searchYear"
                        value={searchYear}
                        disabled
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="mb-2" htmlFor="searchClass">
                      Class:
                    </label>
                    <div className="">
                      <select
                        className="form-select"
                        id="searchClass"
                        onChange={(e) => setSearchClass(e.target.value)}
                        required
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
                <Col className="add_faculty_submit_btn_box mt-4">
                  <button className="add_faculty_submit_btn" type="submit">
                    Search
                  </button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Row>
        {loading ? <Loader /> : Results.length ? (
          <Row className="big_screen_ress">
            <div className="search_student_list_main mx-auto">
              <Row className="search_student_list_head">
                <Col lg="2">Admission No.</Col>
                <Col lg="5">Student's Name</Col>
                <Col lg="3">Class</Col>
                <Col lg="2">Edit Result</Col>
              </Row>
              {Results.map((result , ind) => {
                return (
                  <Row  key={ind} className="search_student_list_cont">
                    <Col lg="2">{result.admNo}</Col>
                    <Col lg="5">{result.studentDetails.name}</Col>
                    <Col lg="3">{result.cls}</Col>
                    <Col lg="2">
                      <i
                        title="Edit"
                        className="fa-solid fa-pen-to-square"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_result_modal"
                        onClick={() => setresultData(result)}
                      ></i>
                    </Col>
                  </Row>
                );
              })}
            </div>
          </Row>
        ) : (
          <></>
        )}

        {loading ? <Loader /> : Results.length ? (
          <Row className="small_screen_ress">
            <div className="search_student_list_main mx-auto">
              {Results.map((result, ind) => {
                return (
                  <div key={ind} className='my-4'>
                    <div className="">

                      <div className='d-flex'>
                        <div className='res_res_headers'>Adm. No</div><div className=' res_res_list'>{result.admNo}</div>
                      </div>

                      <div className='d-flex'>
                        <div className=' res_res_headers'>Name</div><div className=' res_res_list'>{result.studentDetails.name}</div>
                      </div>

                      <div className='d-flex'>
                        <div className=' res_res_headers'>Class</div><div className=' res_res_list'>{result.cls}</div>
                      </div>

                      <div className='d-flex'>
                        <div className=' res_res_headers'>Edit</div><div className=' res_res_list'>
                          <i
                            title="Edit"
                            className="fa-solid fa-pen-to-square"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_result_modal"
                            onClick={() => setresultData(result)}
                          ></i>
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          </Row>
        ) : (
          <></>
        )}
      </Container>
      <Footer mode="dark" />
    </>
  );
};

export default ViewResult;
