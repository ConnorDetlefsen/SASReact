import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import Ride from "../Components/Ride";
import logo from "../Components/In-Quire.png";
import RideCheckBox from "../Components/RideCheckBoxes";
import RideDropDown from "../Components/RideDropDown";
import UserContext from "../Context/UserContext";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { Box, Container, Grid } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";

class RideMaintenance extends Component {
  static contextType = UserContext;

  state = {
    ownsRide1: true,
    ownsRide2: true,

    buyMaintenance1: false, //1 indicates first ride
    buyMinutes1: false, //read these in

    buyMaintenance2: false, //2 indicates second ride
    buyMinutes2: false,

    price: 5000,

    ride1Capacity: 4,
    ride2Capacity: 4, //read these in

    ride1Minutes: 4,
    ride2Minutes: 4,

    //selectValue1: "", these were used if we made drop down with upgrades, we are doing checkboxes instead
    //selectValue2: "",

    //update price different than the checkboxes? this is only used to read in updates but we might end up using these to make checkboxes
    /* updates: [
      //read this in to determine which updates are available
      {
        id: 1,
        value: "Weather",
      },
      {
        id: 2,
        value: "Speed",
      },
    ], */
  };
  //maybe one submit button that calls 2 functions instead of both submitting here??
  formSubmit(event) {
    event.preventDefault();
    console.log("form submitted");
  }

  handleCheckBoxChange = (e) => {
    let state = e.currentTarget.attributes.stateVar.value; //this is the state var being changed by checking box
    this.setState((initialState) => ({
      [state]: !initialState[state],
    }));
  };

  handleDropDownChange = (e) => {
    this.setState({
      [e.currentTarget.attributes.stateVar.value]: parseInt(
        e.currentTarget.value,
        10
      ),
    });
  };

  render() {
    const {
      ownsRide1,
      ownsRide2,
      buyMinutes1,
      buyMinutes2,
      buyMaintenance1,
      buyMaintenance2,
      price,
      ride1Capacity,
      ride2Capacity,
      ride1Minutes,
      ride2Minutes,
    } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Box display="flex" id="wrapper">
          <Sidebar activePage="rides" />
          <Container id="page-content-wrapper">
            <NavBar pagename="Rides" budget={this.context.currentUser.budget} />
            <Box
              px={5}
              py={4}
              className="bg-white box-shadow rounded"
              minHeight={"calc(100vh - 140px)"}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    p={1}
                    textAlign="center"
                    fontWeight="fontWeightBold"
                    className="bg-blue box-shadow rounded"
                  >
                    Buy Data
                  </Box>
                </Grid>
              </Grid>
              <br />

              <Box class="columns2">
                {ownsRide1 === true && (
                  <div class="cardData">
                    <Ride
                      rideNum="1"
                      name="California Screaming"
                      pictureLink={logo}
                    ></Ride>
                    <form class="center" onSubmit={this.formSubmit}>
                      <RideCheckBox
                        name="Maintenance"
                        price={price}
                        checked={buyMaintenance1}
                        stateVar="buyMaintenance1"
                        onChange={this.handleCheckBoxChange}
                      />
                      <br />
                      <RideCheckBox
                        name="Buy 5 Minutes"
                        price={price}
                        checked={buyMinutes1}
                        stateVar="buyMinutes1"
                        onChange={this.handleCheckBoxChange}
                      />
                      <br />
                      <RideDropDown
                        name="Capacity"
                        value={ride1Capacity}
                        onChange={this.handleDropDownChange}
                        stateVar="ride1Capacity"
                      ></RideDropDown>
                      <br />
                      <RideDropDown
                        name="Minutes"
                        value={ride1Minutes}
                        onChange={this.handleDropDownChange}
                        stateVar="ride1Minutes"
                      ></RideDropDown>
                      <br />
                      <button type="submit" className="btn btn-dark ">
                        Submit
                      </button>
                    </form>
                  </div>
                )}
                {ownsRide2 === true && (
                  <div class="cardData">
                    <Ride rideNum="2" name="Pirates of The Carribean"></Ride>
                    <form class="center" onSubmit={this.formSubmit}>
                      <RideCheckBox
                        name="Maintenance"
                        price={price}
                        checked={buyMaintenance2}
                        onChange={this.handleCheckBoxChange}
                        stateVar="buyMaintenance2"
                      />
                      <br />
                      <RideCheckBox
                        name="Buy 5 Minutes"
                        price={price}
                        checked={buyMinutes2}
                        stateVar="buyMinutes2"
                        onChange={this.handleCheckBoxChange}
                      />
                      <br />
                      <RideDropDown
                        name="Capacity"
                        value={ride2Capacity}
                        onChange={this.handleDropDownChange}
                        stateVar="ride2Capacity"
                      ></RideDropDown>
                      <br />
                      <RideDropDown
                        name="Minutes"
                        value={ride2Minutes}
                        onChange={this.handleDropDownChange}
                        stateVar="ride2Minutes"
                      ></RideDropDown>
                      <br />
                      <button type="submit" className="btn btn-dark ">
                        Submit
                      </button>
                    </form>
                  </div>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default RideMaintenance;
