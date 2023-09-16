import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Faculties from '../pages/Faculties/Faculties'
import Admission from '../pages/Admission/Admission'
import AdmissionForm from '../components/AdmissionForm/AdmissionForm'
import Student from '../components/Student/Student'
import Login from '../pages/Login/Login'
import SchoolTimings from '../components/SchoolTimings/SchoolTimings'
import SearchStudent from '../components/AdminDashboard/AdminStudent/SearchStudent/SearchStudent'
import GetFaculties from '../components/AdminDashboard/AdminFaculty/GetFaculties/GetFaculties'
import AddFaculty from '../components/AdminDashboard/AdminFaculty/AddFaculty/AddFaculty'
import AddStudent from '../components/AdminDashboard/AdminStudent/AddStudent/AddStudent'
import DashBoard from '../components/AdminDashboard/DashBoard/DashBoard'
import UpdateClasses from '../components/AdminDashboard/AdminStudent/UpdateClasses/UpdateClasses'
import AdmitCard from '../components/AdminDashboard/AdminExamination/AdmitCard/AdmitCard'
import GeneralInfo from '../pages/GeneralInfo/GeneralInfo'
import AddMultipleStudents from '../components/AdminDashboard/AdminStudent/AddMultipleStudents/AddMultipleStudents'
import IssueTC from '../components/AdminDashboard/AdminTC/IssueTC/IssueTC'
import MissionVision from '../components/MissionVision/MissionVision'
import PrincipalMessage from '../components/PrincipalMessage/PrincipalMessage'
import ContactUs from '../components/ContactUs/ContactUs'
import Error403 from '../pages/Error403/Error403'
import Register from '../components/AdminDashboard/AdminUser/Register/Register'
import ReportCards from '../components/AdminDashboard/AdminExamination/ReportCards/ReportCards'
import Result from '../pages/Result/Result'
import AdminStudentProfile from '../components/AdminDashboard/AdminStudent/AdminStudentProfile/AdminStudentProfile'
import GetUsers from '../components/AdminDashboard/AdminUser/GetUsers/GetUsers'
import GetNotices from '../components/AdminDashboard/AdminNotice/GetNotices/GetNotices'
import AddNotice from '../components/AdminDashboard/AdminNotice/AddNotice/AddNotice'
import UniformCode from '../components/UniformCode/UniformCode'
import { ProtectRoutes } from "../Hooks/protectRoutes";
import { ProtectAdminRoutes } from '../Hooks/protectAdminRoutes'
import Error404 from '../pages/Error404/Error404'
import ViewResult from '../components/AdminDashboard/AdminExamination/ViewResult/ViewResult'




const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/student" element={<Student />} />
      <Route path="/login" element={<Login />} />
      <Route path='/faculties' element={<Faculties />} />
      <Route path="/mission-vision" element={<MissionVision />} />
      <Route path="/contacts" element={<ContactUs />} />
      <Route path='/admission' element={<Admission />} />
      <Route path='/admission/apply' element={<AdmissionForm />} />
      <Route path="/error-403" element={<Error403 />} />
      <Route path="/result" element={<Result />} />
      <Route path="/uniform-code" element={<UniformCode />} />
      <Route path="/principal-message" element={<PrincipalMessage />} />
      <Route path="/school-timings" element={<SchoolTimings />} />
      <Route path="/general-information" element={<GeneralInfo/>} />


      <Route element={<ProtectRoutes />}>

        <Route path="dashboard" element={<DashBoard />} />
        <Route path="/admit-card" element={<AdmitCard />} />
        <Route path="/search-student" element={<SearchStudent />} />
        <Route path="/admin-student-profile/:id" element={<AdminStudentProfile />} />
        <Route path="/view-result" element={<ViewResult />} />

      </Route>


      <Route element={<ProtectAdminRoutes />}>

        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update-classes" element={<UpdateClasses />} />
        <Route path="/add-faculty" element={<AddFaculty />} />
        <Route path="/add-multiple-students" element={<AddMultipleStudents />} />
        <Route path="/get-faculties" element={<GetFaculties />} />
        <Route path="/get-users" element={<GetUsers />} />
        <Route path="/add-notice" element={<AddNotice />} />
        <Route path="/get-notices" element={<GetNotices />} />

        <Route path="/report-cards" element={<ReportCards />} />
        <Route path="/issue-tc" element={<IssueTC />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}

export default Routers
