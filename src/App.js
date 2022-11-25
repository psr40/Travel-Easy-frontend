import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddUser from './Users/AddUser';
import SearchFlight from './Components/Flights/searchflight';
import Flightdetails from './Components/Flights/Flightdetails';
import BookForm from './Components/Flights/bookform';
import EditUser from './Users/EditUser';
import Usermiles from './Components/Flights/Usermiles';
import Bookinghistory from './Components/Flights/bookinghistory';
import React from 'react';
import Feedback from './Components/Feedback/Feedbackform';
import SearchDeal from './Components/Deals/SearchDeals';
import LoginPage from './Users/LoginPage';
import FlightStatus from './Components/Flights/FlightStatus';
import Dealsdetails from './Components/Deals/Dealsdetails';
import FeedbackSuccess from './Components/Feedback/FeedbackSuccess';


function App() {

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/register" element={<AddUser />} />
          <Route exact path="/loginuser" element={<LoginPage />} />
          <Route exact path="/searchFlight" element={<SearchFlight />} />
          <Route exact path="/flightdetails/:id/:pc" element={<Flightdetails />} />
          <Route exact path="/dealsdetails/:id" element={<Dealsdetails />} />

          <Route exact path="/bookform" element={<BookForm />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/usermiles/:id" element={<Usermiles />} />
          <Route exact path="/bookinghistory" element={<Bookinghistory />} />
          <Route exact path="/feedbackform" element={<Feedback />} />
          <Route exact path="/SearchDeals" element={<SearchDeal />} />
          <Route exact path="/flightstatus" element={<FlightStatus />} />

          <Route exact path="/feedbacksuccess" element={<FeedbackSuccess />} />
          
        </Routes>

      </Router>


    </div>

  );
}

export default App;