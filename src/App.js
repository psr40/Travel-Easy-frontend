import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import SearchDeals from './Components/Deals/SearchDeals';
import Feedback from './Components/Feedback/Feedbackform';
import BookForm from './Components/Flights/bookform';
import Bookinghistory from './Components/Flights/bookinghistory';
import Flightdetails from './Components/Flights/flightdetails';
import FlightStatus from './Components/Flights/FlightStatus';
import SearchFlight from './Components/Flights/searchflight';
import Usermiles from './Components/Flights/usermiles';
import NavigationHome from './layout/NavigationHome';
import Home from './pages/Home';
import AddUser from './Users/AddUser';
import EditUser from './Users/EditUser';
import LoginPage from './Users/LoginPage';


function App() {

  //to store the current user
  // const [loggedinUser, SetloggedInUser] = useState(null);
  // const value = useMemo(() => ({ loggedinUser, SetloggedInUser }), [loggedinUser, SetloggedInUser]);

  return (
    <div className='TRAVEL EASY'>
      {/* <UserContext.Provider value={value}> */}
        <Router>
          <NavigationHome />
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/register" element={<AddUser />} />
            <Route exact path="/loginuser" element={<LoginPage />} />
            <Route exact path="/searchFlight" element = {<SearchFlight/>}/>
            <Route exact path="/flightdetails/:id/:pc" element={<Flightdetails />} />
            <Route exact path="/bookform/:id/:pc" element={<BookForm />} />
            <Route exact path="/edituser/:id" element={<EditUser />} />
            <Route exact path="/usermiles/:id/:pc" element={<Usermiles />} />
            <Route exact path="/bookinghistory" element={<Bookinghistory />} />
            <Route exact path="/feedbackform" element={<Feedback />} />
            <Route exact path="/deals" element={<SearchDeals />} />
            <Route exact path="/flightstatus" element={<FlightStatus />} />
          </Routes>
        </Router>
      {/* </UserContext.Provider> */}

    </div>

  );
}

export default App;