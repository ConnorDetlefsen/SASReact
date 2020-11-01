import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import MarketingPack from "../Components/MarketingPack";
import UserContext from "../Context/UserContext";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { toast, ToastContainer } from "react-toastify";
import { Box, Container, Grid } from "@material-ui/core";

import FacebookImage from "../Images/Facebook.png";
import InstagramImage from "../Images/instagram.png";
import TVImage from "../Images/TV.png";
import TwitterImage from "../Images/Twitter.png";
import { Twitter } from "@material-ui/icons";

class Marketing extends Component {
  static contextType = UserContext;

  state = {
    facebook: false,
    twitter: false,
    instagram: false,
    television: false,
    newspaper: false,
    team: [],

    marketingBools: [],

    test: false,
  };

  async componentDidMount() {
    const { history } = this.props;

    if (this.context.currentUser.name === null) {
      history.push("/");
    }

    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        this.context.currentUser.budget = res.data.budget; //updates the context
      });
    http
      .get(
        config.apiEndpoint +
          "/marketing/" +
          +this.context.currentUser.teamID +
          "/" +
          this.context.currentUser.round +
          "/" +
          this.context.currentUser.period
      ) // round | period
      .then((res) => {
        console.log(res.data);
        this.setState({
          marketingBools: res.data,
          facebook: res.data.facebook,
          instagram: res.data.instagram,
          television: res.data.television,
          newspaper: res.data.newspaper,
        });
      });
  }

  budgetUpdate = async (team) => {
    const amount = this.state.amount;
    const budget = team.budget; // used to set api team.budget

    const isBudgetNotNegative = parseInt(budget, 10) - parseInt(amount, 10);
    console.log(isBudgetNotNegative);
    if (isBudgetNotNegative < 0) {
      toast.error("You don't have enough money!");
      return;
    }
    team.budget = parseInt(budget, 10) - parseInt(amount, 10);

    this.context.currentUser.budget = team.budget; //updates the context

    const { data } = await http.put(
      config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
      team
    );
    console.log(data);
  };

  onClick = (e) => {
    const { team, marketingBools } = this.state;

    const amount = e.currentTarget.value;
    const budget = team.budget; // used to set api team.budget

    const isBudgetNotNegative = parseInt(budget, 10) - parseInt(amount, 10);
    console.log(isBudgetNotNegative);
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

    if (e.currentTarget.name === "Twitter") {
      this.setState({ twitter: true });
      this.state.marketingBools.twitter = true;
      http.put(
        config.apiEndpoint + "/marketing/" + this.context.currentUser.teamID,
        marketingBools
      );
      //api calls in here to update booleans
    }
    if (e.currentTarget.name === "Instagram") {
      this.setState({ instagram: true });
      this.state.marketingBools.instagram = true;
      http.put(
        config.apiEndpoint + "/marketing/" + this.context.currentUser.teamID,
        marketingBools
      );
    }
    if (e.currentTarget.name === "Facebook") {
      this.setState({ facebook: true });
      this.state.marketingBools.facebook = true;
      http.put(
        config.apiEndpoint + "/marketing/" + this.context.currentUser.teamID,
        marketingBools
      );
    }
    if (e.currentTarget.name === "Television") {
      this.setState({ television: true });
      this.state.marketingBools.television = true;
      http.put(
        config.apiEndpoint + "/marketing/" + this.context.currentUser.teamID,
        marketingBools
      );
    }
  };

  render() {
    const { facebook, instagram, twitter, television } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />

        <Box display="flex" id="wrapper">
          <Sidebar activePage="marketing" />
          <Container id="page-content-wrapper">
            <NavBar
              pagename="Marketing"
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
                    Marketing
                  </Box>
                </Grid>
              </Grid>
              <br />
              <Box class="columns2">
                <div class="column">
                  {facebook === true && (
                    <div>
                      <MarketingPack
                        image={FacebookImage}
                        name="Facebook"
                        value="5000"
                        onClick={this.onClick}
                        purchased="true"
                      />
                    </div>
                  )}
                  {facebook === false && (
                    <div>
                      <MarketingPack
                        image={FacebookImage}
                        name="Facebook"
                        value="5000"
                        onClick={this.onClick}
                        displayButton="true"
                      />
                    </div>
                  )}
                  <br />
                  {twitter === true && (
                    <div>
                      <MarketingPack
                        image={TwitterImage}
                        name="Twitter"
                        value="5000"
                        onClick={this.onClick}
                        purchased="true"
                      />
                    </div>
                  )}
                  {twitter === false && (
                    <div>
                      <MarketingPack
                        image={TwitterImage}
                        name="Twitter"
                        value="5000"
                        onClick={this.onClick}
                        displayButton="true"
                      />
                    </div>
                  )}
                </div>
                <div class="column">
                  {instagram === true && (
                    <div>
                      <MarketingPack
                        image={InstagramImage}
                        name="Instagram"
                        value="5000"
                        onClick={this.onClick}
                        purchased="true"
                      />
                    </div>
                  )}
                  {instagram === false && (
                    <div>
                      <MarketingPack
                        image={InstagramImage}
                        name="Instagram"
                        value="5000"
                        onClick={this.onClick}
                        displayButton="true"
                      />
                    </div>
                  )}
                  <br />
                  {television === true && (
                    <div>
                      <MarketingPack
                        image={TVImage}
                        name="Television"
                        value="5000"
                        onClick={this.onClick}
                        purchased="true"
                      />
                    </div>
                  )}
                  {television === false && (
                    <div>
                      <MarketingPack
                        image={TVImage}
                        name="Television"
                        value="5000"
                        onClick={this.onClick}
                        displayButton="true"
                      />
                    </div>
                  )}
                </div>
              </Box>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default Marketing;
