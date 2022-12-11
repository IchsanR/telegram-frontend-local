import React, { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import google from "../../assets/image/google.png";
import back from "../../assets/image/back.png";
import { useState } from "react";
import axios from "axios";

const Update = () => {
	const navigate = useNavigate();

	const [profile, setProfile] = useState([]);

	const user = JSON.parse(localStorage.getItem("user"));
	const id = user.data.id;
	const [delAccout, setDelAccount] = useState([]);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`)
			.then((response) => {
				setProfile(response.data.data[0]);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const [form, setForm] = useState({
		fullname: "",
		username: "",
		bio: "",
		phone: "",
	});

	const onSubmit = (e) => {
		e.preventDefault();
		// console.log(form);
		axios
			.put(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`, form)
			.then((response) => {
				console.log(response);
				alert("Update berhasil");
				return navigate("/profile");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteAccount = (id, e) => {
		e.preventDefault();

		axios
			.delete(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`)
			.then((response) => {
				console.log(response);
				const posts = delAccout.filter((item) => item.id !== id);

				setDelAccount({ data: posts });
				alert("Data berhasil dihapus");
				localStorage.clear();
				return navigate("/");
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<Fragment>
			<Helmet>
				<title>Update Profile</title>
			</Helmet>
			<div className={`container-fluid row`}>
				<section
					className={`card position-absolute start-50 translate-middle-x col-md-5 ${style.bodys}`}>
					<div className={`card-body my-5`}>
						<div className="d-flex">
							<div className="flex-row my-auto">
								<Link to="/profile">
									<img src={back} alt="" />
								</Link>
							</div>
							<div className={`text-center mx-auto`}>
								<h1 className={`${style.title}`}>Update Profile</h1>
							</div>
						</div>
						<div className={`my-md-4 my-5`}>
							<p>Update your profile information</p>
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
									defaultValue={profile.fullname}
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
									defaultValue={profile.username}
									onChange={(e) =>
										setForm({ ...form, username: e.target.value })
									}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="bioInput" className="form-label text-secondary">
									Bio
								</label>
								<input
									type="text"
									className={`form-control ${style.inputs}`}
									id="bioInput"
									defaultValue={profile.bio}
									onChange={(e) => setForm({ ...form, bio: e.target.value })}
								/>
							</div>
							<div className="mb-5">
								<label
									htmlFor="inputPhone"
									className="form-label text-secondary">
									Phone
								</label>
								<input
									type="text"
									className={`form-control ${style.inputs}`}
									id="inputPhone"
									defaultValue={profile.phone}
									onChange={(e) => setForm({ ...form, phone: e.target.value })}
								/>
							</div>
							<button type="submit" className={`${style.buttons} col-12 mb-4`}>
								Update Profile
							</button>
						</form>
						<button
							type="button"
							className={`${style.google} col-12`}
							onClick={(e) => deleteAccount(profile.id, e)}>
							<div
								className={`container-fluid position-relative start-50 ${style.googleText}`}>
								<div className="text-center row">
									<div className="col-auto">
										<h5 className="fs-bold">Delete Account</h5>
									</div>
								</div>
							</div>
						</button>
					</div>
				</section>
			</div>
			<div className={`${style.bg}`}></div>
		</Fragment>
	);
};

export default Update;
