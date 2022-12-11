import React, { Fragment, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import edits from "../../../assets/image/edit.png";
import back from "../../../assets/image/back.png";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const UpdateImage = () => {
	const navigate = useNavigate();
	const [profile, setProfile] = useState([]);
	const fileInput = useRef(null);
	const [addImage, setAddImage] = useState();

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

	const handleClick = (e) => {
		fileInput.current.click();
	};

	const handleChange = (e) => {
		const fileUploaded = e.target.files[0];
		document.getElementById("updatePics").innerHTML = fileUploaded.name;
		setAddImage(fileUploaded);
	};

	const updatePhoto = (e) => {
		e.preventDefault();
		const user = JSON.parse(localStorage.getItem("user"));
		const id = user.data.id;

		let inputImage = new FormData();
		inputImage.append("profile_pic", addImage);

		// console.log(addImage);

		axios
			.put(`${process.env.REACT_APP_BACKEND_URL}/user/image/${id}`, inputImage)
			.then((response) => {
				console.log(response);
				alert("Photo berhasil diganti");
				return navigate(`/profile`);
			})
			.catch((error) => {
				console.log(error);
			});
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
								<Link to="/profile">
									<img src={back} alt="" />
								</Link>
							</div>
							<div className={`text-center mx-auto`}>
								<h1 className={`${style.title}`}>Update Image</h1>
							</div>
						</div>
						<div>
							<form onSubmit={(e) => updatePhoto(e)}>
								<div className="d-flex">
									<img
										src={`${process.env.REACT_APP_BACKEND_URL}/${profile.profile_pic}`}
										alt=""
										className={`${style.profilePic}  mx-auto`}
									/>
								</div>
								<div
									className={`${style.editPicture} d-flex my-3`}
									type="button">
									<div className="mx-auto">
										<input
											style={{ display: "none" }}
											id="updatePics"
											type="file"
											ref={fileInput}
											onChange={handleChange}
										/>
										<div className="d-flex">
											<div className="mx-4">
												<img src={edits} alt="Edit" />
											</div>
											<div className="mx-2">
												<p
													className={`py-2 ${style.text} ${style.textAddress}`}
													onClick={handleClick}>
													Edit
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="text-center">
									<h3>{profile.fullname}</h3>
								</div>
								<button type="submit" className={`${style.google} col-12 my-3`}>
									<div
										className={`container-fluid position-relative start-50 my-3 ${style.googleText}`}>
										<div className="text-center row">
											<div className="col-auto">
												<h5 className="fs-bold">Update Image</h5>
											</div>
										</div>
									</div>
								</button>
							</form>
						</div>
					</div>
				</section>
			</div>
			<div className={`${style.bg}`}></div>
		</Fragment>
	);
};

export default UpdateImage;
