/* App router */
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/homePage/Header";
import { LandingBackground } from "./components/homePage/LandingBackground";
import { SignUpPage } from "./components/SignUp";
import { LoginPage } from "./components/LoginPage";
import MapContainer from "./components/customerComponents/MapContainer";
import { setupAxiosInterceptors } from "./api/UserApi";
import { isUserLoggedIn, getUserToken } from "./services/UserService";
import { CustomerRoute } from "./routes/CustomerRoute";
import { StaffRoute } from "./routes/StaffRoute"
import FilterCarsPage from "./components/customerComponents/bookingComponents/filterCars";
import { MyBookings } from "./components/customerComponents/bookingComponents/MyBookings";
import BookingDetailsPage from "./components/customerComponents/bookingComponents/bookingDetails";
import { MyProfile } from "./components/customerComponents/myProfile/MyProfile";

/* Import admin and staff components */
import { EmployeeInfo } from "./components/staffComponents/EmployeeInfo";
import { ViewAllCustomers } from "./components/staffComponents/ViewAllCustomers";
import ViewCustomerPage from "./components/staffComponents/ViewCustomer";
import ViewAllBookingsPage from "./components/staffComponents/ViewAllBookings";
import ViewBookingPage from "./components/staffComponents/ViewBooking";
import ViewCustomerBookingsPage from "./components/staffComponents/ViewCustomerBookings";
import { ViewAllCars } from "./components/staffComponents/ViewAllCars";
import ModifyCarDetailsPage from "./components/staffComponents/ModifyCarDetails";
import { EmployeeDashboard } from "./components/staffComponents/EmployeeDashboard";
import { ViewAllEmployees } from "./components/adminComponents/ViewAllEmployees";

import { CarVerification } from "./components/staffComponents/verification/CarVerification";
import { CustomerVerification } from "./components/staffComponents/verification/CustomerVerification";
import { CarInfo } from "./components/generalComponents/CarInfo";
import { CarSearch } from "./components/customerComponents/CarSearch";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {

	useEffect(() => {
		if (isUserLoggedIn()) {
		    setupAxiosInterceptors(getUserToken());
		}
	}, []);

	return (
		<Router>
			<Header />
			<Routes>
				<Route exact path="/" element={<LandingBackground />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/locations" element={<MapContainer />} />
				{/* Customers only routes */}
				<Route element={<CustomerRoute />}>
					<Route path="/cars/:id" element={<CarInfo/>}></Route>
                    <Route path="/filter" element={<FilterCarsPage />} />
                    <Route path="/myprofile" element={<MyProfile />} />
                    <Route path="/dashboard" element={<CarSearch />} />
                    <Route path="/mybookings/:id" element={<BookingDetailsPage />} />
                    <Route path="/mybookings" element={<MyBookings />} />
                </Route>
				{/* Staff and admin only routes */}
                <Route element={<StaffRoute />}>
                    <Route path="/staff/profile" element={<EmployeeDashboard><EmployeeInfo /></EmployeeDashboard>} />
					<Route path="/admin/profile" element={<EmployeeDashboard><EmployeeInfo /></EmployeeDashboard>} />

					<Route path="/admin/view/customers" element={<EmployeeDashboard><ViewAllCustomers /></EmployeeDashboard>} />
					<Route path="/staff/view/customers" element={<EmployeeDashboard><ViewAllCustomers /></EmployeeDashboard>} />

					<Route path="/admin/view/customers/:id" element={<EmployeeDashboard><ViewCustomerPage /></EmployeeDashboard>} />
					<Route path="/staff/view/customers/:id" element={<EmployeeDashboard><ViewCustomerPage /></EmployeeDashboard>} />

                    <Route path="/admin/view/customers/:id/bookings" element={<EmployeeDashboard><ViewCustomerBookingsPage /></EmployeeDashboard>} />
					<Route path="/staff/view/customers/:id/bookings" element={<EmployeeDashboard><ViewCustomerBookingsPage /></EmployeeDashboard>} />

                    <Route path="/admin/view/bookings/:id" element={<EmployeeDashboard><ViewBookingPage /></EmployeeDashboard>} />
                    <Route path="/admin/view/bookings" element={<EmployeeDashboard><ViewAllBookingsPage /></EmployeeDashboard>} />
                    <Route path="/admin/view/cars/:id" element={<EmployeeDashboard><ModifyCarDetailsPage /></EmployeeDashboard>} />

                    <Route path="/admin/view/cars" element={<EmployeeDashboard><ViewAllCars /></EmployeeDashboard>} />
					<Route path="/staff/view/cars" element={<EmployeeDashboard><ViewAllCars /></EmployeeDashboard>} />

					<Route path="/admin/view/employees" element={<EmployeeDashboard><ViewAllEmployees/></EmployeeDashboard>}/>

					<Route path="/staff/verify/cars" element={<EmployeeDashboard><CarVerification /></EmployeeDashboard>}/>
					<Route path="/staff/verify/customers" element={<EmployeeDashboard><CustomerVerification /></EmployeeDashboard>}/>
                </Route>
			</Routes>
		</Router>
	);
}

export default App;