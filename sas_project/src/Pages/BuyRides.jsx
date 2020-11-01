import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import UserContext from "../Context/UserContext";

import Ride from "../Components/RideSelection";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { toast, ToastContainer } from "react-toastify";
import { Box, Container, Grid } from "@material-ui/core";
import { FastfoodOutlined } from "@material-ui/icons";

import WoodenCoasterImage from "../Images/RideImages/wooden_coaster.jpg";
import Inverted from "../Images/RideImages/inverted_coaster.jpg";
import Water from "../Images/RideImages/water_coaster.jpg";
import Drop from "../Images/RideImages/drop_tower.jpg";
import Accelerator from "../Images/RideImages/accelerator_coaster.jpg";
import Standup from "../Images/RideImages/standing_coaster.jpg";
import DriverCoaster from "../Images/RideImages/driver_coaster.jpg";
import FourD from "../Images/RideImages/4D_animation.jpg";

class BuyRides extends Component {
  static contextType = UserContext;

  state = {
    ride1Purchased: false,
    ride2Purchased: false,
    ride3Purchased: false,
    ride4Purchased: false,
    ride5Purchased: false,
    ride6Purchased: false,
    ride7Purchased: false,
    ride8Purchased: false,

    kidFriendly1: false,
    kidFriendly2: false,
    kidFriendly3: false,
    kidFriendly4: false,
    kidFriendly5: false,
    kidFriendly6: false,
    kidFriendly7: false,
    kidFriendly8: false,

    rideOptions: [],

    ride1: [],
    ride2: [],
    ride3: [],
    ride4: [],
    ride5: [],
    ride6: [],
    ride7: [],
    ride8: [],

    ridePost: {
      team_id: 1,
      ride_length: 4,
      seats: 4,
      description: "Wooden",
      kid_friendly: true,
      ride_id: 1,
      waterproof: false,
      enclosure: false,
      damaged: false,
    },
    ridesPurchased: [],
  };

  async componentDidMount() {
    const { history } = this.props;

    if (this.context.currentUser.name === null) {
      history.push("/");
    }

    http
      .get(
        config.apiEndpoint +
          "/ridespurchased/" +
          this.context.currentUser.teamID
      )
      .then((res) => {
        this.setState({ ridesPurchased: res.data });
      });

    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        this.context.currentUser.budget = res.data.budget; //updates the context
      });
    http.get(config.apiEndpoint + "/rideoptions/").then((res) => {
      this.setState({
        rideOptions: res.data,
        ride1: res.data[0],
        ride2: res.data[1],
        ride3: res.data[2],
        ride4: res.data[3],
        ride5: res.data[4],
        ride6: res.data[5],
        ride7: res.data[6],
        ride8: res.data[7],

        // test: res.data.slice(0, 8),
      });
    });
    //read in ride purchased table for team
  }

  /*
   {this.state.test.map((test) => (
                <tr key={test.id}>
                  <Ride
                    value={test.price}
                    description={test.description}
                    onClick={(e) => {
                      this.handleClick(e);
                    }}
                    id={test.ride_id}
                    time={test.ride_length}
                  ></Ride>
                  <br></br>
                </tr>
              ))}
              */

  handleCheckBoxChange = (e) => {
    let state = e.currentTarget.attributes.stateVar.value; //this is the state var being changed by checking box
    this.setState((initialState) => ({
      [state]: !initialState[state],
    }));
  };

  onNextClick = (e) => {
    const { history } = this.props;
    history.push("/buyride2");
  };

  onRideMaintenance = (e) => {
    const { history } = this.props;
    history.push("/ridemaintenance");
  };
  handleClick = (e) => {
    const { team, ridePost } = this.state;

    const amount = e.currentTarget.value;
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

    let kidBool = e.currentTarget.attributes.stateVar.value;
    let RideLengthTest = parseInt(e.currentTarget.attributes.time.value, 10);
    let rideID = parseInt(e.currentTarget.id, 10);
    http
      .post(config.apiEndpoint + "/rides/", {
        team_id: this.context.currentUser.teamID,
        ride_id: rideID,
        ride_length: RideLengthTest,
        seats: 4,
        description: e.currentTarget.name,
        kid_friendly: this.state[kidBool],
        waterproof: false,
        enclosure: false,
        damaged: false,
        engineering_report: false,
      })
      .then((res) => {
        console.log(res);
        toast.success(`Ride Bought Sent`);
      });

    let rideVar = "ride" + rideID;
    this.state.ridesPurchased[rideVar] = true;

    http.put(
      config.apiEndpoint + "/ridespurchased/" + this.context.currentUser.teamID,
      this.state.ridesPurchased
    );

    //update ridespurchased table here
  };

  render() {
    const {
      kidFriendly1,
      ride1,
      kidFriendly2,
      ride2,
      kidFriendly3,
      ride3,
      kidFriendly4,
      ride4,
      kidFriendly5,
      ride5,
      kidFriendly6,
      ride6,
      kidFriendly7,
      ride7,
      kidFriendly8,
      ride8,
    } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Box display="flex" id="wrapper">
          <Sidebar activePage="rides" />
          <Container id="page-content-wrapper">
            <NavBar
              pagename="map"
              budget={this.context.currentUser.budget}
              period={this.context.currentUser.round}
            />
            <Box
              px={5}
              py={4}
              className="bg-white box-shadow rounded"
              minHeight={"calc(100vh - 140px)"}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Box
                    p={1}
                    textAlign="center"
                    fontWeight="fontWeightBold"
                    className="bg-blue box-shadow rounded"
                  >
                    Buy Rides
                  </Box>
                </Grid>
              </Grid>
              <br />

              <div class="columns4">
                <Ride
                  name={ride1.description}
                  image={WoodenCoasterImage}
                  value={ride1.price}
                  time={ride1.ride_length}
                  purchased={this.state.ridesPurchased.ride1}
                  stateVar="kidFriendly1"
                  checked={kidFriendly1}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride1.ride_id}
                ></Ride>
                <Ride
                  name={ride2.description}
                  value={ride2.price}
                  image={Inverted}
                  time={ride2.ride_length}
                  purchased={this.state.ridesPurchased.ride2}
                  stateVar="kidFriendly2"
                  checked={kidFriendly2}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride2.ride_id}
                ></Ride>
                <Ride
                  name={ride3.description}
                  value={ride3.price}
                  time={ride3.ride_length}
                  image={Water}
                  purchased={this.state.ridesPurchased.ride3}
                  stateVar="kidFriendly3"
                  checked={kidFriendly3}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride3.ride_id}
                ></Ride>
                <Ride
                  name={ride4.description}
                  value={ride4.price}
                  image={Drop}
                  time={ride4.ride_length}
                  purchased={this.state.ridesPurchased.ride4}
                  stateVar="kidFriendly4"
                  checked={kidFriendly4}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride4.ride_id}
                ></Ride>
                <Ride
                  name={ride5.description}
                  value={ride5.price}
                  image={Accelerator}
                  time={ride5.ride_length}
                  purchased={this.state.ridesPurchased.ride5}
                  stateVar="kidFriendly5"
                  checked={kidFriendly5}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride5.ride_id}
                ></Ride>
                <Ride
                  name={ride6.description}
                  value={ride6.price}
                  image={Standup}
                  time={ride6.ride_length}
                  purchased={this.state.ridesPurchased.ride6}
                  stateVar="kidFriendly6"
                  checked={kidFriendly6}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride6.ride_id}
                ></Ride>
                <Ride
                  name={ride7.description}
                  value={ride7.price}
                  image={DriverCoaster}
                  time={ride7.ride_length}
                  purchased={this.state.ridesPurchased.ride7}
                  stateVar="kidFriendly7"
                  checked={kidFriendly7}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride7.ride_id}
                ></Ride>
                <Ride
                  name={ride8.description}
                  value={ride8.price}
                  image={FourD}
                  time={ride8.ride_length}
                  purchased={this.state.ridesPurchased.ride8}
                  stateVar="kidFriendly8"
                  checked={kidFriendly8}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride8.ride_id}
                ></Ride>
              </div>
              <br></br>
              <button
                onClick={this.onRideMaintenance}
                class="btn btn-primary leftButton"
              >
                Ride Maintenance
              </button>
              <button
                onClick={this.onNextClick}
                class="btn btn-primary rightButton"
              >
                Next Page
              </button>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default BuyRides;
