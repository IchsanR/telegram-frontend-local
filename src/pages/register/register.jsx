import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import google from "../../assets/image/google.png";
import back from "../../assets/image/back.png";
import { useState } from "react";
import axios from "axios";

const Register = () => {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		fullname: "",
		username: "",
		email: "",
		password: "",
	});

	const onSubmit = (e) => {
		e.preventDefault();
		if (
			form.fullname == "" ||
			form.username == "" ||
			form.email == "" ||
			form.password == ""
		) {
			alert("Semua form harus diisi");
		} else {
			axios
				.post(`${process.env.REACT_APP_BACKEND_URL}/register`, form)
				.then((response) => {
					alert("Selamat, " + form.fullname + " akun anda berhasil dibuat");
					return navigate("/");
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	return (
		<Fragment>
			<Helmet>
				<title>Register</title>
			</Helmet>
			<div className={`container-fluid row`}>
				<section
					className={`card position-absolute start-50 translate-middle-x col-md-5 ${style.bodys}`}>
					<div className={`card-body my-5`}>
						<div className="d-flex">
							<div className="flex-row my-auto">
								<Link to="/">
									<img src={back} alt="" />
								</Link>
							</div>
							<div className={`text-center mx-auto`}>
								<h1 className={`${style.title}`}>Register</h1>
							</div>
						</div>
						<div className={`my-md-4 my-5`}>
							<p>Let’s create your account!</p>
						</div>
						<form onSubmit={(e) => onSubmit(e)}>
							<div className="mb-3">
								<label
									htmlFor="nameInput"
									className="form-label text-secondary">
									Name
								</label>
								<input
									type="text"
									className={`form-control ${style.inputs}`}
									id="nameInput"
									onChange={(e) =>
										setForm({ ...form, fullname: e.target.value })
									}
								/>
							</div>
							<div className="mb-3">
								<label
									htmlFor="usernameInput"
									className="form-label text-secondary">
									Username
								</label>
								<input
									type="text"
									className={`form-control ${style.inputs}`}
									id="usernameInput"
									onChange={(e) =>
										setForm({ ...form, username: e.target.value })
									}
								/>
							</div>
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
							<div className="mb-5">
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
							<button type="submit" className={`${style.buttons} col-12`}>
								Register
							</button>
							<div className="my-md-4 my-3 text-center text-muted">
								<p>Register with</p>
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
					</div>
				</section>
			</div>
			<div className={`${style.bg}`}></div>
		</Fragment>
	);
};

export default Register;
