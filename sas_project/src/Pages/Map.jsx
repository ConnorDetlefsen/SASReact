import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import UserContext from "../Context/UserContext";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { toast, ToastContainer } from "react-toastify";
import { Box, Container, Grid } from "@material-ui/core";

import MapImage from "../Images/map.jpg";
import WeatherA from "../Images/WeatherA.png";

class Map extends Component {
  static contextType = UserContext;

  state = {};

  onFinishPeriod = (e) => {
    console.log("submit");
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Box display="flex" id="wrapper">
          <Sidebar activePage="map" onFinishPeriod={this.onFinishPeriod} />
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
                    Map
                  </Box>
                </Grid>
              </Grid>
              <div class="map">
                <img src={MapImage} alt="" />

                <div id="pin-1" class="mapMarker">
                  <h3>A</h3>
                  <div class="pin-text">
                    <img src={WeatherA} class="weatherImage" />
                  </div>
                </div>

                <div id="pin-2" class="box">
                  <div class="pin-text">
                    <h3>Location 2</h3>
                  </div>
                </div>
              </div>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default Map;
