import React from "react";
import rocket from "../../assets/images/rocket404.png";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Fade } from "react-awesome-reveal";

const Error404 = () => {
  return (
    <>
      <Navbar />
      <Fade>
      <div className="error_403">
        <div className="err_main_cont">
          <img src={rocket} alt="" />
          <div className="error_403_inner">
            <h1>Error - 404</h1>
            <h3>Not Found</h3>
            <p>The page You Requested doesn't Exists!!</p>
          </div>
        </div>
      </div>
      <Footer mode="light" />
      </Fade>
    </>
  );
};

export default Error404;
