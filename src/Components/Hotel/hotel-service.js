
var hotels = require('./hotelOffers.json');

export function getNoOfGuest() {
    let guest = [];
    for (let i = 1; i <= 20; i++) {
        guest.push({ "label": i });
    }
    return guest;
}

export function getNoOfRoom() {
    let room = [];
    for (let i = 1; i <= 20; i++) {
        room.push({ "label": i });
    }
    return room;
}



export function getFilterStrategies() {
    return [
        {
            label: "Price: Low to high",
            id: "lth",
        },
        {
            label: "Price: High to Low",
            id: "htl",
        }
    ]
}

export function getHotelById(id){
    // TODO make a REST call to backend and get data for testing using JSON file
    let jsondata =  JSON.parse(JSON.stringify(hotels));
    console.log("json data = ",jsondata);
    let result = jsondata.data.filter((obj) => obj.hotelId === id);
    console.log("result = ",result);
    return result;
}

export function getHotelByRequest(request){
    // TODO make a REST call to backend and get data for testing using JSON file
    let jsondata =  JSON.parse(JSON.stringify(hotels));
   // console.log("json data = ",jsondata);
    let result = jsondata.data.filter((obj) => obj.hotel.cityCode.toLowerCase() === request.destination.toLowerCase());
  // console.log("result = ",result);
    return result;
}

