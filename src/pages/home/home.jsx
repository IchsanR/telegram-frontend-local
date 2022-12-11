import React, { Fragment, useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import style from "./style.module.css";
import style1 from "../../assets/style/style.module.css";
import viewed from "../../assets/image/viewed.png";
import back from "../../assets/image/back.png";
import menu from "../../assets/image/prmenu.png";

const Home = () => {
	const [socketio, setSocketIo] = useState(null);
	const [listchat, setListchat] = useState([]);
	const user = JSON.parse(localStorage.getItem("user"));
	const self = user.data;

	useEffect(() => {
		const socket = io(process.env.REACT_APP_BACKEND_URL);
		socket.on("send-message-response", (response) => {
			// set receiver
			const receiver = JSON.parse(localStorage.getItem("receiver"));
			// Kondisi nampilkan data receiver
			if (
				receiver.username === response[0].sender ||
				receiver.username === response[0].receiver
			) {
				setListchat(response);
			}
		});
		setSocketIo(socket);
	}, []);

	const [message, setMessage] = useState();
	const onSubmitMessage = (e) => {
		e.preventDefault();
		const user = JSON.parse(localStorage.getItem("user"));
		const receiver = JSON.parse(localStorage.getItem("receiver"));

		// list history saat submit message
		const payload = {
			sender: user.data.username,
			receiver: receiver.username,
			message,
		};

		setListchat([...listchat, payload]);

		const data = {
			sender: user.data.id,
			receiver: activeReceiver.id,
			message,
		};

		socketio.emit("send-message", data);

		setMessage("");
	};

	const [list, setList] = useState([]);
	// console.log(list);
	const [login, setLogin] = useState({});
	console.log(login);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		setLogin(user);
		axios
			.get(`${process.env.REACT_APP_BACKEND_URL}/user`)
			.then((response) => {
				console.log(response);
				setList(response.data.data.rows);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const [activeReceiver, setActiveReceiver] = useState({});
	const [activeChat, setActiveChat] = useState(1);
	const [mobile, setMobile] = useState(1);
	const onMobile = (e) => {
		e.preventDefault();
		setMobile(1);
	};
	const selectReceiver = (item) => {
		//TAMBAHAN MERESET CHAT
		setListchat([]);
		setActiveChat(2);
		setMobile(2);
		setActiveReceiver(item);

		// set RECEIVER
		localStorage.setItem("receiver", JSON.stringify(item));
		socketio.emit("join-room", login.data);

		const data = {
			sender: login.data.id,
			receiver: item.id,
		};

		socketio.emit("chat-history", data);
	};

	return (
		<Fragment>
			<Helmet>
				<title>Home</title>
			</Helmet>

			<main className="container-fluid row">
				<section className={`col-md-4 ${style.leftPanel}`}>
					<div className=" my-4">
						<Header />
					</div>
					<div className={`my-3 overflow-auto ${style1.chatList}`}>
						<div className="container-fluid row">
							{list.map((item, index) =>
								item.id !== login.id ? (
									item.id == self.id ? null : (
										<div key={index}>
											<div
												className={`d-flex col-12 mb-3`}
												type="button"
												onClick={() => selectReceiver(item)}>
												<div className="col-2 me-5">
													<img
														src={`${process.env.REACT_APP_BACKEND_URL}/${item.profile_pic}`}
														alt=""
														className={`${style1.profileImage}`}
													/>
												</div>
												<div className={`col-8 pt-2`}>
													<h3>{item.fullname}</h3>
													<p className={`${style1.chats}`}>Tap to open chat</p>
												</div>
												<div className="col-2">
													{/* <p className="pt-3">12.04</p>
													<img
														src={viewed}
														alt=""
														className={`${style1.viewed}`}
													/> */}
												</div>
											</div>
										</div>
									)
								) : null
							)}
						</div>
					</div>
				</section>

				<section className={`col-md-8 ${style.rightPanel}`}>
					{activeChat == 1 ? null : (
						<>
							<section className={`container-fluid row`}>
								<div className={`col-md-12 row py-md-4`}>
									<div className={`col-1 d-flex my-auto ${style1.pp}`}>
										<img
											src={back}
											alt=""
											className={`${style1.backButtons}`}
										/>
									</div>
									<div className="col-md-1">
										<img
											src={`${process.env.REACT_APP_BACKEND_URL}/${activeReceiver.profile_pic}`}
											alt=""
											className={`${style1.profileImageHeaders}`}
										/>
									</div>
									<div className="col-md-9">
										<h4>{activeReceiver.fullname}</h4>
									</div>
									<div className="col-md-1 my-auto">
										<button type="button" className="btn">
											<img src={menu} alt="" className="" />
										</button>
									</div>
								</div>
							</section>

							<section
								className={`overflow-auto container-fluid ${style.chatMessage}`}
								id="box">
								<div className="row">
									{listchat.map((item, index) => (
										<div key={index}>
											{item.sender == login.data.username ? (
												<div className="container-fluid d-flex flex-row-reverse">
													<p className={`p-3 mb-3 ${style.messageSend}`}>
														{item.message}
													</p>
												</div>
											) : (
												<div className="container-fluid">
													<p className={`p-3 mb-3 ${style.messageRecieve}`}>
														{item.message}
													</p>
												</div>
											)}
										</div>
									))}
								</div>

								<div id="main-root" />
							</section>

							<section className={`container-fluid row`}>
								<form
									className="d-flex col-md-12 py-3 px-md-4"
									onSubmit={onSubmitMessage}>
									<input
										className={`col-10 ${style.messageInput}`}
										type="text"
										onChange={(e) => setMessage(e.target.value)}
										value={message}
									/>
									<button
										type="submit"
										className={`ms-4 col-2 ${style.sendButton}`}>
										Send
									</button>
								</form>
							</section>
						</>
					)}
				</section>
			</main>
		</Fragment>
	);
};

export default Home;
