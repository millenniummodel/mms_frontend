import React, { useEffect, useState } from "react";
import logo from '../../assets/images/logo1.png'
import { Link } from "react-router-dom";
import './Navbar.css'
import { useAuth } from "../../Hooks/auth";
import AlertConfirm from "react-alert-confirm";
import 'react-alert-confirm/lib/style.css';


const Navbar = ({ userType = "User" }) => {
	const [open, setOpen] = useState("none");
	const openNav = () => {
		if (open === "none") setOpen("block");
		else setOpen("none");
	};
	const { logout, cookies } = useAuth();
	const [loggedIn, setLoggedIn] = useState(false);
	useEffect(() => {
		cookies.token || userType === "Student"
			? setLoggedIn(true)
			: setLoggedIn(false);
	}, [userType, cookies]);

	const handleLogOut = async (e) => {
		e.preventDefault();
		try {
			const [conf] = await AlertConfirm("Are you sure you want to LogOut?");

			if (conf) {
				logout();
			}
		} catch (err) {
			alert("Something went wrong!")
		}
	};
	return (
		<>
			<nav className="sticky-top">
				<a href="/" className="logo">
					<img className="logo_img" src={logo} alt="" />
				</a>
				<div className="group">
					<ul className="navigation">
						<li>
							<Link to="/" className="navList">
								Home
							</Link>
						</li>
						<li className="dropdown">
							<a href="/" className="dropdown-toggle navList">
								Academics
							</a>
							<ul className="dropdown-menu">
								<li>
									<Link className="dropdown-item" to="/school-timings">
										School Timings
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/">
										Fee Structure
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/uniform-code">
										Uniform Code
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/admission">
										Admission
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/result">
										Result
									</Link>
								</li>
							</ul>
						</li>
						<li className="dropdown">
							<a href="/" className="dropdown-toggle navList">
								About Us
							</a>
							<ul className="dropdown-menu">
								<li>
									<Link className="dropdown-item" to="/mission-vision">
										Mission and Vision
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/principal-message">
										Principal's Message
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/faculties">
										Faculties
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/general-information">
										General Information
									</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link to="/contacts" className="navList">
								Contact Us
							</Link>
						</li>
					</ul>
					<div className="btnGroup">
						{!loggedIn && !cookies.token && (
							<Link to="/login" className="loginBtn">
								Login
							</Link>
						)}
						{(cookies.token || loggedIn) && (
							<div
								className="logoutBtn"
								title="Logout"
								onClick={handleLogOut}
								data-bs-toggle="tooltip"
								data-bs-placement="top"
								data-bs-title="Logout"
							>
								<i className="fa-solid fa-arrow-right-from-bracket"></i>
							</div>
						)}
						{cookies.token && (
							<div className="logoutBtn" title="Dashboard">
								<Link to="/dashboard">
									<i className="fa-solid fa-table-columns"></i>
								</Link>
							</div>
						)}
					</div>
					<div className="menuToggle" onClick={openNav}>
						<i className="fa-solid fa-bars"></i>
					</div>
				</div>
			</nav>
			<div className={`openNav d-${open} sticky-top`}>
				<ul className="">
					<li>
						<Link to="/" className="navList">
							Home
						</Link>
					</li>
					<div className="accordion accordion-flush">
						<div className="accordion-item">
							<div className="accordion-header">
								<button
									className="navList"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#academics_accordian"
									aria-controls="academics_accordian"
								>
									Academics
								</button>
							</div>
							<div
								id="academics_accordian"
								className="accordion-collapse collapse"
							>
								<div className="accordion-body">
									<ul className="mob-dropdown-menu">
										<li>
											<Link className="mob-dropdown-item" to="/school-timings">
												School Timings
											</Link>
										</li>
										<li>
											<Link className="mob-dropdown-item" to="/">
												Fee Structure
											</Link>
										</li>
										<li>
											<Link className="mob-dropdown-item" to="/uniform-code">
												Uniform Code
											</Link>
										</li>
										<li>
											<Link className="mob-dropdown-item" to="/admission">
												Admission
											</Link>
										</li>
										<li>
											<Link className="mob-dropdown-item" to="/result">
												Result
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="accordion accordion-flush">
						<div className="accordion-item">
							<div className="accordion-header">
								<button
									className="navList"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#about_accordian"
									aria-controls="about_accordian"
								>
									About Us
								</button>
							</div>
							<div id="about_accordian" className="accordion-collapse collapse">
								<div className="accordion-body">
									<ul className="mob-dropdown-menu">
										<li>
											<Link className="mob-dropdown-item" to="/mission-vision">
												Mission and Vision
											</Link>
										</li>
										<li>
											<Link
												className="mob-dropdown-item"
												to="/principal-message"
											>
												Principal's Message
											</Link>
										</li>
										<li>
											<Link className="mob-dropdown-item" to="/faculties">
												Faculties
											</Link>
										</li>
										<li>
											<Link className="mob-dropdown-item" to="/general-information">
												General Information
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<li>
						<Link to="/contacts" className="navList">
							Contact Us
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
};

export default Navbar;
