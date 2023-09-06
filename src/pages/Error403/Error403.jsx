import React from "react";
import astro from "../../assets/images/astronaut.png";
import "./Error403.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Fade } from "react-awesome-reveal";

const Error403 = () => {
    return (
        <>
            <Navbar />
            <Fade>
            <div className="error_403">
                <div className="err_main_cont">
                    <img src={astro} alt="" />
                    <div className="error_403_inner">
                        <h1>Error - 403</h1>
                        <h3>Access Denied</h3>
                        <p>You Do not have this permission.</p>
                    </div>
                </div>
            </div>
            <Footer mode="light" />

            </Fade>
        </>
    );
};

export default Error403;