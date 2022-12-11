import React, { useEffect } from "react";
import style from "../assets/style/style.module.css";
import menu from "../assets/image/Menu.png";
import plus from "../assets/image/Plus.png";
import setting from "../assets/image/Settings.png";
import back from "../assets/image/back2.png";
import contact from "../assets/image/Contacts.png";
import phone from "../assets/image/phone.png";
import saved from "../assets/image/saved.png";
import invite from "../assets/image/invite.png";
import faq from "../assets/image/FAQ.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Header = () => {
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

	const onProfile = (e) => {
		e.preventDefault();
		return navigate("/profile");
	};

	const logout = (e) => {
		e.preventDefault();
		localStorage.clear();
		return navigate("/");
	};
	return (
		<>
			<div className="container-fluid row">
				<div className="col-12 d-flex">
					<div>
						<h3 className={`${style.blueColor}`}>Telegram</h3>
					</div>
					<div className={`ms-auto ${style.menus}`}>
						<button
							className={`btn`}
							type="button"
							data-bs-toggle="offcanvas"
							data-bs-target="#offcanvasWithBothOptions"
							aria-controls="offcanvasWithBothOptions">
							<img src={menu} alt="" />
						</button>
						<div
							className="offcanvas offcanvas-end"
							data-bs-scroll="true"
							tabIndex="-1"
							id="offcanvasWithBothOptions"
							aria-labelledby="offcanvasWithBothOptionsLabel">
							<div className="offcanvas-header">
								<button
									type="button"
									className="btn"
									data-bs-dismiss="offcanvas"
									aria-label="Close">
									<img src={back} alt="" />
								</button>
								<img src={setting} alt="" />
							</div>
							<div className="offcanvas-body">
								<div className="d-flex col-12 ms-4 mb-5">
									<div className="col-3">
										<img
											src={`${process.env.REACT_APP_BACKEND_URL}/${profile.profile_pic}`}
											alt=""
											className={`${style.profileImage}`}
										/>
									</div>
									<div className="col-7">
										<div
											type="button"
											onClick={onProfile}
											className={`${style.links}`}>
											<h3 className={`${style.chats}`}>{profile.fullname}</h3>
										</div>
									</div>
								</div>
								<div className="d-flex col-12 my-4">
									<div className="col-3 ms-5">
										<img
											src={contact}
											alt=""
											// className={`${style.profileImage}`}
										/>
									</div>
									<div className="col-7">
										<h4 className={`${style.chats}`}>Contacts</h4>
									</div>
								</div>
								<div className="d-flex col-12 my-4">
									<div className="col-3 ms-5">
										<img
											src={phone}
											alt=""
											// className={`${style.profileImage}`}
										/>
									</div>
									<div className="col-7">
										<h4 className={`${style.chats}`}>Calls</h4>
									</div>
								</div>
								<div className="d-flex col-12 my-4">
									<div className="col-3 ms-5">
										<img
											src={saved}
											alt=""
											// className={`${style.profileImage}`}
										/>
									</div>
									<div className="col-7">
										<h4 className={`${style.chats}`}>Saved message</h4>
									</div>
								</div>
								<div className="d-flex col-12 my-4">
									<div className="col-3 ms-5">
										<img
											src={invite}
											alt=""
											// className={`${style.profileImage}`}
										/>
									</div>
									<div className="col-7">
										<h4 className={`${style.chats}`}>Invite friends</h4>
									</div>
								</div>
								<div className="d-flex col-12 my-4">
									<div className="col-3 ms-5">
										<img
											src={faq}
											alt=""
											// className={`${style.profileImage}`}
										/>
									</div>
									<div className="col-7">
										<h4 className={`${style.chats}`}>Telegram FAQ</h4>
									</div>
								</div>
								<div>
									<button
										className="col-12 btn btn-danger"
										onClick={(e) => logout(e)}>
										Logout
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-12 my-4">
					<form className="container-fluid row">
						<input
							type="search"
							name=""
							className={`col-11 me-5 ${style.searchs}`}
							placeholder="Type your message..."
						/>
						<div className={`col-1 ${style.addMore}`}>
							<img src={plus} alt="" />
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Header;
