import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import './Faculties.css'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import { BASE_URL } from '../../config/config'
import Footer from '../../components/Footer/Footer'
import Loader from '../../components/Loader/Loader'
import { toast } from 'react-toastify';
import { Fade } from "react-awesome-reveal";


const Faculties = () => {

  const [faculties, setFaculties] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await axios.get(`${BASE_URL}/faculty`)
      setFaculties(data.data.data)
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

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Navbar />
      <Fade>
      <section className="imgHeadingFaculty imgHeadingImg">
        <Container>
          <Row>
            <Col lg="12">
              <h1 className="imgHeadingHead">Faculties</h1>
            </Col>
          </Row>
        </Container>
      </section>
      {loading ? <Loader /> : <div className="facpage_main_cont">
        {faculties.map((i) => {
          return <div key={i._id}>
            <div className="facpage_facbox">
              <img src={i.facultyImg} alt="" />
              <div className="facpage_facinfo">
                <p className="facdetail_name">{i.facultyName}</p>
                <div className="facdetail_desig">{i.facultyDesignation}</div>
                <div className="facpage_facinfo_detail_main">
                  <p className="facdetail_title">Experience:</p>
                  <p className="facdetail_content">{i.facultyExperience} Years</p>
                </div>
                <div className="facpage_facinfo_detail_main">
                  <p className="facdetail_title">Education:</p>
                  <p className="facdetail_content">{i.facultyEducation}</p>
                </div>
              </div>
            </div>
          </div>
        })}
      </div>}
      <Footer mode="dark" />
      </Fade>
    </>
  );

}

export default Faculties
