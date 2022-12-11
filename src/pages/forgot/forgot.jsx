import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import google from "../../assets/image/google.png";
import back from "../../assets/image/back.png";

const Forgot = () => {
	return (
		<Fragment>
			<Helmet>
				<title>Reset Password</title>
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
								<h1 className={`${style.title}`}>Forgot Password</h1>
							</div>
						</div>
						<div className={`my-md-4 my-5`}>
							<p>You’ll get messages soon on your e-mail</p>
						</div>
						<form>
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
								/>
							</div>
							<button type="submit" className={`${style.buttons} col-12`}>
								Send email
							</button>
						</form>
					</div>
				</section>
			</div>
			<div className={`${style.bg}`}></div>
		</Fragment>
	);
};

export default Forgot;
