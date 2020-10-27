import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import UserContext from "../Context/UserContext";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { toast, ToastContainer } from "react-toastify";
import { Box, Container, Grid } from "@material-ui/core";

class Finances extends Component {
  static contextType = UserContext;

  state = {};
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Box display="flex" id="wrapper">
          <Sidebar activePage="finances" />
          <Container id="page-content-wrapper">
            <NavBar
              pagename="Marketing"
              budget={this.context.currentUser.budget}
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
                    Finances
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default Finances;
