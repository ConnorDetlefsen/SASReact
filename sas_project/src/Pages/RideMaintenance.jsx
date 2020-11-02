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
    price: 5000,

    duration: 14,
    cartCapacity: 4,

    ride1Capacity: 4,
    ride2Capacity: 4,
    ride3Capacity: 4,
    ride4Capacity: 4,

    ride1Minutes: 4,
    ride2Minutes: 4,
    ride3Minutes: 4,
    ride4Minutes: 4,

    rides: [],
    team: [],
    ride1: null,
    ride2: null,
    ride3: null,
    ride4: null,

    waterproof1: null,
    waterproof2: null,
    waterproof3: null,
    waterproof4: null,

    enclosure1: null,
    enclosure2: null,
    enclosure3: null,
    enclosure4: null,

    engineering_report1: null,
    engineering_report2: null,
    engineering_report3: null,
    engineering_report4: null,

    buyMinutes: false,
  };

  async componentDidMount() {
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        this.context.currentUser.budget = res.data.budget; //updates the context
      });

    http
      .get(config.apiEndpoint + "/rides/" + this.context.currentUser.teamID)
      .then((res) => {
        if (res.data[0]) {
          this.setState({
            ride1: res.data[0],
            waterproof1: res.data[0].waterproof,
            enclosure1: res.data[0].enclosure,
            engineering_report1: res.data[0].engineering_report,

            //put all upgrades here
          });
        }
        if (res.data[1]) {
          this.setState({
            ride2: res.data[1],
            waterproof2: res.data[1].waterproof,
            enclosure2: res.data[1].enclosure,
            engineering_report2: res.data[1].engineering_report,
          });
        }
        if (res.data[2]) {
          this.setState({
            ride3: res.data[2],
            waterproof3: res.data[2].waterproof,
            enclosure3: res.data[2].enclosure,
            engineering_report3: res.data[2].engineering_report,
          });
        }
        if (res.data[3]) {
          this.setState({
            ride4: res.data[3],
            waterproof4: res.data[3].waterproof,
            enclosure4: res.data[3].enclosure,
            engineering_report4: res.data[3].engineering_report,
          });
        }
      });
  }

  //maybe one submit button that calls 2 functions instead of both submitting here??
  formSubmit(event) {
    event.preventDefault();
    console.log("form submitted");
  }

  rideSubmit = (e) => {
    const {
      team,
      waterproof1,
      waterproof2,
      waterproof3,
      waterproof4,
      enclosure1,
      enclosure2,
      enclosure3,
      enclosure4,

      engineering_report1,
      engineering_report2,
      engineering_report3,
      engineering_report4,

      price,
      ride1,
      ride2,
      ride3,
      ride4,
      ride1Minutes,
      ride2Minutes,
      ride3Minutes,
      ride4Minutes,
      duration,
      buyMinutes,
    } = this.state;

    if (ride1Minutes + ride2Minutes + ride3Minutes + ride4Minutes > duration) {
      toast.error(
        "You're ride minutes cannot exceed the maximum duration.  Please reduce minutes or purchase extra minutes"
      );
      return;
    }

    ride1.ride_length = ride1Minutes;
    ride2.ride_length = ride2Minutes;
    ride3.ride_length = ride3Minutes;
    ride4.ride_length = ride4Minutes;

    let amount = 0;

    if (buyMinutes) {
      amount = amount + price;
    }

    if (waterproof1) {
      amount = amount + price;
      ride1.waterproof = true;
    }
    if (enclosure1) {
      amount = amount + price;
      ride1.enclosure = true;
    }
    if (engineering_report1) {
      amount = amount + price;
      ride1.engineering_report = true;
    }
    if (waterproof2) {
      amount = amount + price;
      ride2.waterproof = true;
    }
    if (enclosure2) {
      amount = amount + price;
      ride2.enclosure = true;
    }
    if (engineering_report2) {
      amount = amount + price;
      ride2.engineering_report = true;
    }
    if (waterproof3) {
      amount = amount + price;
      ride3.waterproof = true;
    }
    if (enclosure3) {
      amount = amount + price;
      ride3.enclosure = true;
    }
    if (engineering_report3) {
      amount = amount + price;
      ride3.engineering_report = true;
    }
    if (waterproof4) {
      amount = amount + price;
      ride4.waterproof = true;
    }
    if (enclosure4) {
      amount = amount + price;
      ride4.enclosure = true;
    }
    if (engineering_report4) {
      amount = amount + price;
      ride4.engineering_report = true;
    }
    //do this for each upgrade we have
    console.log(amount);
    const budget = team.budget; // used to set api team.budget

    const isBudgetNotNegative = parseInt(budget, 10) - parseInt(amount, 10);
    if (isBudgetNotNegative < 0) {
      toast.error("You don't have enough money!");
      return;
    }
    team.budget = parseInt(budget, 10) - parseInt(amount, 10);
    this.context.currentUser.budget = team.budget; //updates the context
    this.setState({ test: true });
    http.put(
      config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
      team
    );
    //end budget check
    if (ride1) {
      http.put(
        config.apiEndpoint + "/rides/" + this.context.currentUser.teamID + "/1",
        ride1
      );
    }
    if (ride2) {
      http.put(
        config.apiEndpoint + "/rides/" + this.context.currentUser.teamID + "/2",
        ride2
      );
    }
    if (ride3) {
      http.put(
        config.apiEndpoint + "/rides/" + this.context.currentUser.teamID + "/3",
        ride3
      );
    }
    if (ride4) {
      http.put(
        config.apiEndpoint + "/rides/" + this.context.currentUser.teamID + "/4",
        ride4
      );
    }
    //put request here to ride/teamid/rideid
  };

  handleCheckBoxChange = (e) => {
    let state = e.currentTarget.attributes.stateVar.value; //this is the state var being changed by checking box
    this.setState((initialState) => ({
      [state]: !initialState[state],
    }));
    if (this.state.buyMinutes === false) {
      this.setState({ duration: 18 });
    } else {
      this.setState({ duration: 14 });
    }
  };

  handleDropDownChange = (e) => {
    this.setState({
      [e.currentTarget.attributes.stateVar.value]: parseInt(
        e.currentTarget.value,
        10
      ),
    });
  };

  onBuyRide = (e) => {
    const { history } = this.props;
    history.push("/buyride");
  };

  onFinishPeriod = (e) => {
    console.log("submit");
  };

  render() {
    const {
      buyMinutes,
      price,
      ride1Capacity,
      ride2Capacity,
      ride3Capacity,
      ride4Capacity,
      ride1Minutes,
      ride2Minutes,
      ride3Minutes,
      ride4Minutes,
      ride1,
      ride2,
      ride3,
      ride4,
      waterproof1,
      waterproof2,
      waterproof3,
      waterproof4,
      enclosure1,
      enclosure2,
      enclosure3,
      enclosure4,
      engineering_report1,
      engineering_report2,
      engineering_report3,
      engineering_report4,
    } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Box display="flex" id="wrapper">
          <Sidebar activePage="rides" onFinishPeriod={this.onFinishPeriod} />
          <Container id="page-content-wrapper">
            <NavBar
              pagename="Rides"
              budget={this.context.currentUser.budget}
              period={this.context.currentUser.round}
            />
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
                    Ride Maintenance
                  </Box>
                </Grid>
                <Box
                  p={2}
                  margin="auto"
                  textAlign="center"
                  float="center"
                  fontWeight="fontWeightBold"
                  className="bg-lightblue box-shadow rounded"
                >
                  Duration: {this.state.duration} <br />
                  Cart Capacity: {this.state.cartCapacity}
                  <br />
                  <RideCheckBox
                    name="Buy 5 Minutes"
                    price={price}
                    checked={buyMinutes}
                    stateVar="buyMinutes"
                    onChange={this.handleCheckBoxChange}
                  />
                </Box>
              </Grid>
              <br />
              {!ride2 && (
                <Box>
                  {ride1 && (
                    <div class="cardData">
                      <Ride
                        rideNum="1"
                        name={ride1.description}
                        pictureLink={logo} //{ride1.image}
                      ></Ride>
                      <form class="center" onSubmit={this.formSubmit}>
                        <RideCheckBox
                          name="Waterproof"
                          price={price}
                          checked={waterproof1}
                          stateVar="waterproof1"
                          onChange={this.handleCheckBoxChange}
                        />
                        <br />

                        <RideCheckBox
                          name="Enclosure"
                          price={price}
                          checked={enclosure1}
                          stateVar="enclosure1"
                          onChange={this.handleCheckBoxChange}
                        />
                        <br />
                        <RideCheckBox
                          name="Engineering Report"
                          price={price}
                          checked={engineering_report1}
                          stateVar="engineering_report1"
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
                      </form>
                    </div>
                  )}
                </Box>
              )}
              {ride2 && ( //start of 2 col for 2 rides
                <Box class="columns2">
                  {ride1 && (
                    <div class="cardData">
                      <Ride
                        rideNum="1"
                        name={ride1.description}
                        pictureLink={logo} //{ride1.image}
                      ></Ride>
                      <form class="center" onSubmit={this.formSubmit}>
                        <RideCheckBox
                          name="Waterproof"
                          price={price}
                          checked={waterproof1}
                          stateVar="waterproof1"
                          onChange={this.handleCheckBoxChange}
                        />
                        <br />
                        <RideCheckBox
                          name="Enclosure"
                          price={price}
                          checked={enclosure1}
                          stateVar="enclosure1"
                          onChange={this.handleCheckBoxChange}
                        />
                        <br />
                        <RideCheckBox
                          name="Engineering Report"
                          price={price}
                          checked={engineering_report1}
                          stateVar="engineering_report1"
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
                      </form>
                    </div>
                  )}
                  <br></br>

                  {ride2 && (
                    <div class="cardData">
                      <Ride
                        rideNum="2"
                        name={ride2.description}
                        pictureLink={logo} //{ride1.image}
                      ></Ride>
                      <form class="center" onSubmit={this.formSubmit}>
                        <RideCheckBox
                          name="Waterproof"
                          price={price}
                          checked={waterproof2}
                          stateVar="waterproof2"
                          onChange={this.handleCheckBoxChange}
                        />
                        <br />
                        <RideCheckBox
                          name="Enclosure"
                          price={price}
                          checked={enclosure2}
                          stateVar="enclosure2"
                          onChange={this.handleCheckBoxChange}
                        />

                        <br />
                        <RideCheckBox
                          name="Engineering Report"
                          price={price}
                          checked={engineering_report2}
                          stateVar="engineering_report2"
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
                      </form>
                    </div>
                  )}
                  {ride3 && (
                    <div class="cardData">
                      <Ride
                        rideNum="3"
                        name={ride3.description}
                        pictureLink={logo} //{ride1.image}
                      ></Ride>
                      <form class="center" onSubmit={this.formSubmit}>
                        <RideCheckBox
                          name="Waterproof"
                          price={price}
                          checked={waterproof3}
                          stateVar="waterproof3"
                          onChange={this.handleCheckBoxChange}
                        />
                        <br />
                        <RideCheckBox
                          name="Enclosure"
                          price={price}
                          checked={enclosure3}
                          stateVar="enclosure3"
                          onChange={this.handleCheckBoxChange}
                        />

                        <br />
                        <RideCheckBox
                          name="Engineering Report"
                          price={price}
                          checked={engineering_report3}
                          stateVar="engineering_report3"
                          onChange={this.handleCheckBoxChange}
                        />
                        <br />
                        <RideDropDown
                          name="Capacity"
                          value={ride3Capacity}
                          onChange={this.handleDropDownChange}
                          stateVar="ride3Capacity"
                        ></RideDropDown>
                        <br />
                        <RideDropDown
                          name="Minutes"
                          value={ride3Minutes}
                          onChange={this.handleDropDownChange}
                          stateVar="ride3Minutes"
                        ></RideDropDown>
                        <br />
                      </form>
                    </div>
                  )}
                  {ride4 && (
                    <div class="cardData">
                      <Ride
                        rideNum="4"
                        name={ride4.description}
                        pictureLink={logo} //{ride1.image}
                      ></Ride>
                      <form class="center" onSubmit={this.formSubmit}>
                        <RideCheckBox
                          name="Waterproof"
                          price={price}
                          checked={waterproof4}
                          stateVar="waterproof4"
                          onChange={this.handleCheckBoxChange}
                        />
                        <br />
                        <RideCheckBox
                          name="Enclosure"
                          price={price}
                          checked={enclosure4}
                          stateVar="enclosure4"
                          onChange={this.handleCheckBoxChange}
                        />

                        <br />
                        <RideCheckBox
                          name="Engineering Report"
                          price={price}
                          checked={engineering_report4}
                          stateVar="engineering_report4"
                          onChange={this.handleCheckBoxChange}
                        />
                        <br />
                        <RideDropDown
                          name="Capacity"
                          value={ride4Capacity}
                          onChange={this.handleDropDownChange}
                          stateVar="ride4Capacity"
                        ></RideDropDown>
                        <br />
                        <RideDropDown
                          name="Minutes"
                          value={ride4Minutes}
                          onChange={this.handleDropDownChange}
                          stateVar="ride4Minutes"
                        ></RideDropDown>
                        <br />
                      </form>
                    </div>
                  )}
                </Box>
              )}
              <button onClick={this.ride2Submit} className="btn btn-dark ">
                Submit Ride Settings
              </button>
              <br />
              <button
                onClick={this.onBuyRide}
                class="btn btn-primary leftButton"
              >
                Buy Rides
              </button>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default RideMaintenance;
