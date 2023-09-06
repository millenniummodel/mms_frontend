import React from 'react'
import { Link } from 'react-router-dom'
import './AdmissionButton.css'

const AdmissionButton = () => {
  return (
    <>
        <div className="admission_open_button">
            <p>Admissions Open</p>
            <Link to="/admission">Apply Now</Link>
        </div>
    </>
  )
}

export default AdmissionButton