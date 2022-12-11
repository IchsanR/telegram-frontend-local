import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import Forgot from "../pages/forgot/forgot";
import Home from "../pages/home/home";
import Profile from "../pages/profile/profile";
import Update from "../pages/update/update";
import UpdateImage from "../pages/update/updateImage/UpdateImage";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgot" element={<Forgot />} />
				<Route path="/home" element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/update" element={<Update />} />
				<Route path="/update-image" element={<UpdateImage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
