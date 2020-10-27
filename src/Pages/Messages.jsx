import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import UserContext from "../Context/UserContext";
import Message from "../Components/Message";
import { Box, Container, Grid } from "@material-ui/core";

import { ToastContainer, toast } from "react-toastify";

class Messages extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      new_message: "",
      errors: {},
      team: [],
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    //this is where the post to database goes
    /*
    http
      .post(config.apiEndpoint + "/message/", {
        message: this.state.new_message,
        team_id: this.context.currentUser.teamID,
      })
      .then((res) => {
        console.log(res);
        toast.success(`Message Sent`);
      })
      .catch((err) => {
        toast.error(`Message could not be sent `);
      }); */
  };

  handleChange = (e) => {
    this.setState({ new_message: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Box display="flex" id="wrapper">
          <Sidebar activePage="messages" />
          <Container id="page-content-wrapper">
            <NavBar pagename="map" budget={this.context.currentUser.budget} />
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
                    Messages
                  </Box>
                </Grid>
              </Grid>
              <center>
                <form onSubmit={this.handleSubmit}>
                  <div class="form-group">
                    <br />
                    <Box class="columns">
                      <Message
                        description="Lorem ipsum dolor sit amet, at illud delicata definitionem nec. Eu vix omnium animal, ius quas fierent ad, vix omnes theophrastus ea. Nobis corpora cu sea, ne accusam officiis eum. Ne vel euismod nostrum. Latine tamquam suavitate nec at.
Ea idque apeirian eos, vim dicat moderatius te. Vel natum solum corpora ea. Viderer tacimates qualisque et est, no ius percipit splendide mediocritatem, laudem bonorum accusam ut per. In oportere reformidans quo, et ius suscipit erroribus, novum tractatos ei vix. Quo wisi veniam id. Saepe salutandi voluptaria ad cum."
                      />
                      <Message
                        description="Lorem ipsum dolor sit amet, at illud delicata definitionem nec. Eu vix omnium animal, ius quas fierent ad, vix omnes theophrastus ea. Nobis corpora cu sea, ne accusam officiis eum. Ne vel euismod nostrum. Latine tamquam suavitate nec at.
Ea idque apeirian eos, vim dicat moderatius te. Vel natum solum corpora ea. Viderer tacimates qualisque et est, no ius percipit splendide mediocritatem, laudem bonorum accusam ut per. In oportere reformidans quo, et ius suscipit erroribus, novum tractatos ei vix. Quo wisi veniam id. Saepe salutandi voluptaria ad cum."
                      />
                      <Message
                        description="Lorem ipsum dolor sit amet, at illud delicata definitionem nec. Eu vix omnium animal, ius quas fierent ad, vix omnes theophrastus ea. Nobis corpora cu sea, ne accusam officiis eum. Ne vel euismod nostrum. Latine tamquam suavitate nec at.
Ea idque apeirian eos, vim dicat moderatius te. Vel natum solum corpora ea. Viderer tacimates qualisque et est, no ius percipit splendide mediocritatem, laudem bonorum accusam ut per. In oportere reformidans quo, et ius suscipit erroribus, novum tractatos ei vix. Quo wisi veniam id. Saepe salutandi voluptaria ad cum."
                      />
                    </Box>
                  </div>
                  <button
                    // disabled={!this.context.currentUser.isManager}
                    type="submit"
                    class="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </center>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default Messages;
