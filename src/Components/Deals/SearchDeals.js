import React from "react";
import InputSearch from "../Common/searchbar";
import Button from "../Common/button";
import "../Flights/flight-form.css";
import CustomDatePicker from "../Common/date-picker";
import Card from "@mui/material/Card";
import "../Flights/searchflight.css";
import { useState } from "react";
import BasicTextFields from "../Common/textfield";
import "../Flights/flightlist.css";
import DealsList from "./dealslist";
import SelectDropdown from "../Common/dropdown";
import { getDeals, getAirports, getFilterStrategies } from "./deals-service";
import Information from "../Flights/information";
import {
  getLocations,
  getFlights,
} from "../../services/flight/amadeus-api-service";
var flightsJsonData = require("../DummyDataFiles/FlightsDummy/FlightSearchData.json");

function SearchDeal() {
  const [source, setSource] = useState("");
  //const [airports, setAirports] = useState(getAirports());
  const [fromLocations, setFromLocations] = useState([]);
  const [toLocations, setToLocations] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  const [destination, setDestination] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [value, setValue] = useState("");
  const DATE_FORMAT = "YYYY-MM-DD";
  const [deals, setDeals] = useState([]);

  const [showList, setShowList] = useState(false);
  const [filterBy, setFilterBy] = useState("");

  const onFilterSelected = (type) => {
    setFilterBy(type);
    fetchDeals();
  };

  const onSourceSelected = (location) => {
    setSource(location);
    validateForm();
  };

  const onDestinationSelected = (location) => {
    setDestination(location);
    validateForm();
  };

  const handleDepartureDate = (deptDate) => {
    setDepartureDate(deptDate);
    validateForm();
  };

  const handleReturnDate = (rtDate) => {
    setReturnDate(rtDate);
    validateForm();
  };

  const handleMinPrice = (minPrice) => {
    setMinPrice(minPrice.target.value);
    validateForm();
  };

  const handleMaxPrice = (maxPrice) => {
    setMaxPrice(maxPrice.target.value);
    validateForm();
  };

  const validateForm = () => {
    let buttonVal = disableSearchBtn();
    setDisableButton(buttonVal);
  };

  const fetchDeals = async () => {
    let request = {
      source: source,
      destination: destination,
      departureDate: departureDate,
      returnDate: returnDate,
      minPrice: minPrice,
      maxPrice: maxPrice,
      filterBy: filterBy,
    };
    let response = await getDealsSearchReq(request);
    console.log("response from 108 in search flight : ", response);
    let deals = response;

    console.log("deals", deals);
    setDeals(deals);
    setShowList(true);
  };

  function getDealsSearchReq(request) {
    // TODO make a REST call to backend and get data for testing using JSON file

    let data = JSON.parse(JSON.stringify(flightsJsonData));
    console.log("Data:", data, "Request:", request);
    if (request.filterBy && request.filterBy === "Price: High to Low") {
      data = data.sort((a, b) => a.deals_price - b.deals_price);
    } else if (request.filterBy && request.filterBy === "Price: Low to high") {
      data = data.sort((a, b) => b.deals_price - a.deals_price);
    }
    return data.data.filter(
      (obj) =>
        (obj.deals_price > request.minPrice) &&
        (obj.deals_price < request.maxPrice )&&
       (obj.departureCityName === request.source.address.cityName) &&
        (obj.arrivalCityName === request.destination.address.cityName)
    );
  }
  const disableSearchBtn = () => {
    if (
      source !== "" &&
      destination !== "" &&
      departureDate !== "" &&
      returnDate !== "" &&
      minPrice !== "" &&
      maxPrice !== ""
    ) {
      return false;
    }
    return true;
  };

  const canLocationBeSearched = (value, reason) => {
    return value && value.length >= 5 && reason != "reset";
  };

  const searchSourceLocations = async (event, value, reason) => {
    if (canLocationBeSearched(value, reason)) {
      let results = await getLocations(value);
      let data = results.data.data;
      setFromLocations(data);
    }
  };

  const searchDestinationLocations = async (event, value, reason) => {
    if (canLocationBeSearched(value, reason)) {
      let results = await getLocations(value);
      let data = results.data.data;
      setToLocations(data);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Card className="mrgn">
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex">
                  <div className="p-2 mt-2">
                    <InputSearch
                      value={source}
                      input={fromLocations}
                      onInputChange={searchSourceLocations}
                      onChange={onSourceSelected}
                      label="From"
                      className=""
                    />
                  </div>
                  <div className="p-2 mt-2">
                    <InputSearch
                      value={destination}
                      input={toLocations}
                      onInputChange={searchDestinationLocations}
                      onChange={onDestinationSelected}
                      label="To"
                      className="mt-2"
                    />
                  </div>

                  <div className="p-2 mt-2">
                    <CustomDatePicker
                      value={value}
                      onChange={handleDepartureDate}
                      disablePast
                      format={DATE_FORMAT}
                      label="Departure"
                      className="mt-2"
                    />
                  </div>
                  <div className="p-2 mt-2">
                    <CustomDatePicker
                      value={value}
                      onChange={handleReturnDate}
                      disablePast
                      format={DATE_FORMAT}
                      label="Return"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="d-flex">
                  <div className="p-2 mt-2">
                    <BasicTextFields
                      value={minPrice}
                      onChange={handleMinPrice}
                      label="MinPrice"
                      variant="outlined"
                      id="outline-basic"
                    />
                  </div>
                  <div className="p-2 mt-2">
                    <BasicTextFields
                      value={maxPrice}
                      onChange={handleMaxPrice}
                      label="MaxPrice"
                      className="mt-2"
                      type={"text"}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flt-rt">
              <Button
                disabled={disableButton}
                onClick={fetchDeals}
                btname="Explore Deals"
              />
            </div>
          </Card>
        </div>
        <div className="col-md-12 mt-3">
          {showList ? (
            <div>
             <SelectDropdown
                label="Sort By"
                value={getFilterStrategies()}
                onChange={onFilterSelected}
          />
              <DealsList deals={deals} />
            </div>
          ) : (
            <Information />
          )}
        </div>
      </div>
    </div>
  );
}

SearchDeal.propTypes = {};

export default SearchDeal;
