import React, { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { useState } from "react";
import axios from "axios";
import back from "../../assets/image/back.png";
import lock from "../../assets/image/lock.png";
import bell from "../../assets/image/notif.png";
import chart from "../../assets/image/data.png";
import paper from "../../assets/image/Chat.png";
import laptop from "../../assets/image/Device.png";

const Profile = () => {
	const navigate = useNavigate();
	const [profile, setProfile] = useState([]);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		const id = user.data.id;
		axios
			.get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`)
			.then((response) => {
				setProfile(response.data.data[0]);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<Fragment>
			<Helmet>
				<title>Profile</title>
			</Helmet>
			<div className={`container-fluid row`}>
				<section
					className={`card position-absolute start-50 translate-middle-x col-md-5 ${style.bodys}`}>
					<div className={`card-body my-5`}>
						<div className="d-flex">
							<div className="flex-row my-auto">
								<Link to="/home">
									<img src={back} alt="" />
								</Link>
							</div>
							<div className={`text-center mx-auto`}>
								<h1 className={`${style.title}`}>@{profile.username}</h1>
							</div>
						</div>
						<div className="d-flex col-12 my-4">
							<div className="me-4">
								<img
									src={`${process.env.REACT_APP_BACKEND_URL}/${profile.profile_pic}`}
									alt=""
									className={`${style.profilePic}`}
								/>
							</div>
							<Link className={`${style.links}`} to="/update-image">
								<div type="button">
									<h3 className="text-dark">{profile.fullname}</h3>
									<p className={`text-secondary`}>{profile.phone}</p>
								</div>
							</Link>
						</div>
						<div className={`${style.borderBottom}`}>
							<h4>Account</h4>
							<Link className={`${style.links}`} to="/update">
								<p className="text-dark">{profile.phone}</p>
								<p className="text-secondary">Tap to change phone number</p>
							</Link>
						</div>
						<div className={`my-4 ${style.borderBottom}`}>
							<Link className={`${style.links}`} to="/update">
								<h5 className="text-dark">@{profile.username}</h5>
								<p className="text-secondary">Username</p>
							</Link>
						</div>
						<div>
							<h5>{profile.bio}</h5>
							<p className="text-secondary">Bio</p>
						</div>
						<div className="my-4">
							<h4>Setting</h4>
							<div className="d-flex my-3">
								<div className="col-1">
									<img src={bell} alt="" />
								</div>
								<p className="mx-4 fs-5">Notification and Sounds</p>
							</div>
							<div className="d-flex my-3">
								<div className="col-1">
									<img src={lock} alt="" />
								</div>
								<p className="mx-4 fs-5">Privacy and Security</p>
							</div>
							<div className="d-flex my-3">
								<div className="col-1">
									<img src={chart} alt="" />
								</div>
								<p className="mx-4 fs-5">Data and Stronge</p>
							</div>
							<div className="d-flex my-3">
								<div className="col-1">
									<img src={paper} alt="" />
								</div>
								<p className="mx-4 fs-5">Chat settings</p>
							</div>
							<div className="d-flex my-3">
								<div className="col-1">
									<img src={laptop} alt="" />
								</div>
								<p className="mx-4 fs-5">Devices</p>
							</div>
						</div>
					</div>
				</section>
			</div>
			<div className={`${style.bg}`}></div>
		</Fragment>
	);
};

export default Profile;
