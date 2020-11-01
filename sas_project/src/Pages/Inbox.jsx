import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import UserContext from "../Context/UserContext";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { ToastContainer } from "react-toastify";
import { Box, Container, Grid } from "@material-ui/core";

class Inbox extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      team: [],
      inbox: [],
    };
  }

  async componentDidMount() {
    const { history } = this.props;

    if (this.context.currentUser.name === null) {
      history.push("/");
    }

    if (this.context.currentUser.isFinance === true) {
      http
        .get(
          config.apiEndpoint +
            "/inbox/" +
            this.context.currentUser.teamID +
            "/" +
            this.context.currentUser.round +
            "/" +
            this.context.currentUser.period +
            "/Finance"
        )
        .then((res) => {
          this.setState({ inbox: res.data });
        });
    }
    if (this.context.currentUser.isManager === true) {
      http
        .get(
          config.apiEndpoint +
            "/inbox/" +
            this.context.currentUser.teamID +
            "/" +
            this.context.currentUser.round +
            "/" +
            this.context.currentUser.period +
            "/Manager"
        )
        .then((res) => {
          this.setState({ inbox: res.data });
        });
    }
    if (this.context.currentUser.isConsultant === true) {
      http
        .get(
          config.apiEndpoint +
            "/inbox/" +
            this.context.currentUser.teamID +
            "/" +
            this.context.currentUser.round +
            "/" +
            this.context.currentUser.period +
            "/Consultant"
        )
        .then((res) => {
          this.setState({ inbox: res.data });
        });
    }
    if (this.context.currentUser.isMarketing === true) {
      http
        .get(
          config.apiEndpoint +
            "/inbox/" +
            this.context.currentUser.teamID +
            "/" +
            this.context.currentUser.round +
            "/" +
            this.context.currentUser.period +
            "/Marketing"
        )
        .then((res) => {
          this.setState({ inbox: res.data });
        });
    }

    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
      });
  }
  render() {
    const { inbox } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />

        <Box display="flex" id="wrapper">
          <Sidebar activePage="inbox" />
          <Container id="page-content-wrapper">
            <NavBar
              pagename="Inbox"
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
                    Inbox
                  </Box>
                </Grid>
              </Grid>
              <br />
              <div>
                <center>
                  <table class="table">
                    <thead class="thead-light">
                      <tr>
                        <th scope="col">Date</th>

                        <th scope="col">Sender</th>
                        <th scope="col">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{("" + inbox.stamp).substring(0, 10)}</td>
                        <td>{inbox.sender}</td>
                        <td>{inbox.message}</td>
                      </tr>
                    </tbody>
                  </table>
                </center>
              </div>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default Inbox;
