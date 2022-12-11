import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import google from "../../assets/image/google.png";
import { useState } from "react";
import axios from "axios";

const Login = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const onSubmit = (e) => {
		e.preventDefault();

		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/login`, form)
			.then((response) => {
				const result = response.data;
				localStorage.setItem("user", JSON.stringify(result.data));
				localStorage.setItem("token", response.data.data.token);
				alert("Selamat datang " + response.data.data.data.fullname);
				return navigate("/home");
			})
			.catch((error) => {
				alert("Login error email atau password salah");
			});
	};

	return (
		<Fragment>
			<Helmet>
				<title>Login</title>
			</Helmet>
			<div className={`container-fluid row`}>
				<section
					className={`card position-absolute start-50 translate-middle-x col-md-5 ${style.bodys}`}>
					<div className={`card-body`}>
						<div className={`text-center mt-5`}>
							<h1 className={`${style.title}`}>Login</h1>
						</div>
						<div className={`my-md-4 my-5`}>
							<p>Hi, welcome back</p>
						</div>
						<form onSubmit={(e) => onSubmit(e)}>
							<div className="mb-3">
								<label
									htmlFor="emailInput"
									className="form-label text-secondary">
									Email address
								</label>
								<input
									type="email"
									className={`form-control ${style.inputs}`}
									id="emailInput"
									onChange={(e) => setForm({ ...form, email: e.target.value })}
								/>
							</div>
							<div className="mb-3">
								<label
									htmlFor="exampleInputPassword1"
									className="form-label text-secondary">
									Password
								</label>
								<input
									type="password"
									className={`form-control ${style.inputs}`}
									id="exampleInputPassword1"
									onChange={(e) =>
										setForm({ ...form, password: e.target.value })
									}
								/>
							</div>
							<div className="d-flex flex-row-reverse">
								<Link className={`${style.links} my-md-4 my-3`}>
									Forgot Password
								</Link>
							</div>
							<button type="submit" className={`${style.buttons} col-12`}>
								Login
							</button>
							<div className="my-md-4 my-3 text-center text-muted">
								<p>Login with</p>
							</div>
							<button type="submit" className={`${style.google} col-12`}>
								<div
									className={`container-fluid position-relative start-50 ${style.googleText}`}>
									<div className="text-center row">
										<div className="col-auto">
											<img src={google} alt="" className="" />
										</div>
										<div className="col-auto">
											<h5 className="fs-bold">Google</h5>
										</div>
									</div>
								</div>
							</button>
						</form>
						<div className="text-center my-3 my-md-4">
							<p>
								Don’t have an account?{" "}
								<span>
									<Link
										className={`${style.signup} ${style.links}`}
										to="/register">
										Sign Up
									</Link>
								</span>
							</p>
						</div>
					</div>
				</section>
			</div>
			<div className={`${style.bg}`}></div>
		</Fragment>
	);
};

export default Login;
