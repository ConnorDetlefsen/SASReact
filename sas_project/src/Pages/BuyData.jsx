import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import DataPack from "../Components/DataPack";
import DataPackDownload from "../Components/DataPackDownload";
import UserContext from "../Context/UserContext";
import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { Box, Container, Grid } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";

class BuyData extends Component {
  static contextType = UserContext;

  state = {
    cost: 0,
    data: [],
    purchasedData: [],

    data1: false,
    data2: false,
    data3: false,
    data4: false,
    data5: false,
    data6: false,

    team: [],

    test: false,

    dataLinks: [],
  };

  /*
{this.state.data.map((data) => (
                  <tr key={data.id}>
                    <DataPack
                      value={data.price}
                      description={data.description}
                      onClick={(e) => {
                        this.handleClick(e);
                      }}
                      id={data.data_id}
                    ></DataPack>
                    <br></br>
                  </tr>
                ))}
  */

  async componentDidMount() {
    console.log("page started");
    http.get(config.apiEndpoint + "/dataoptions/").then((res) => {
      console.log(res.data);
      this.setState({ data: res.data });
    });

    http
      .get(
        config.apiEndpoint +
          "/filename/" +
          this.context.currentUser.round +
          "/" +
          this.context.currentUser.period +
          "/" +
          this.context.currentUser.teamID
      )
      .then((res) => {
        this.setState({ datalinks: res.data });
      });

    http
      .get(
        config.apiEndpoint +
          "/buydata/" +
          this.context.currentUser.teamID +
          "/" +
          this.context.currentUser.round +
          "/" +
          this.context.currentUser.period
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ purchasedData: res.data });
      });
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        console.log(res.data);
        this.setState({ team: res.data });
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

  handleClick = (e) => {
    const { team } = this.state;

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

    let id = "data" + e.currentTarget.id;
    this.state.purchasedData[id] = true;
    toast.success("Data Pack Purchased");
    http.put(
      config.apiEndpoint +
        "/buydata/" +
        this.context.currentUser.teamID +
        "/" +
        this.context.currentUser.round +
        "/" +
        this.context.currentUser.period,
      this.state.purchasedData
    );
  };

  onFinishPeriod = (e) => {
    console.log("submit");
  };

  render() {
    const { data, dataLinks } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Box display="flex" id="wrapper">
          <Sidebar activePage="buydata" onFinishPeriod={this.onFinishPeriod} />
          <Container id="page-content-wrapper">
            <NavBar
              pagename="Buy Data"
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
                    Buy Data
                  </Box>
                </Grid>
              </Grid>
              <br />
              <Box class="columns">
                <DataPack
                  value={5000}
                  description="Weather DataPack"
                  onClick={(e) => {
                    this.handleClick(e);
                  }}
                  id="1"
                  disabled={this.state.purchasedData.data1}
                  isPurchased={this.state.purchasedData.data1}
                  dataLink={dataLinks.filename1}
                ></DataPack>
                <DataPack
                  value={5000}
                  description="Basic Engineering Report"
                  onClick={(e) => {
                    this.handleClick(e);
                  }}
                  id="2"
                  disabled={this.state.purchasedData.data2}
                  isPurchased={this.state.purchasedData.data2}
                  dataLink={dataLinks.filename2}
                ></DataPack>
                <DataPack
                  value={5000}
                  description="Advanced Engineering Report"
                  onClick={(e) => {
                    this.handleClick(e);
                  }}
                  id="3"
                  disabled={this.state.purchasedData.data3}
                  isPurchased={this.state.purchasedData.data3}
                  dataLink={dataLinks.filename3}
                ></DataPack>
                <DataPack
                  value={5000}
                  description="Visitor DataPack"
                  onClick={(e) => {
                    this.handleClick(e);
                  }}
                  id="4"
                  disabled={this.state.purchasedData.data4}
                  isPurchased={this.state.purchasedData.data4}
                  dataLink={dataLinks.filename4}
                ></DataPack>
                <DataPack
                  value={5000}
                  description="Ticket Sales DataPack"
                  onClick={(e) => {
                    this.handleClick(e);
                  }}
                  id="5"
                  disabled={this.state.purchasedData.data5}
                  isPurchased={this.state.purchasedData.data5}
                  dataLink={dataLinks.filename5}
                ></DataPack>
                <DataPack
                  value={5000}
                  description="Competitor DataPack"
                  onClick={(e) => {
                    this.handleClick(e);
                  }}
                  id="6"
                  disabled={this.state.purchasedData.data6}
                  isPurchased={this.state.purchasedData.data6}
                  dataLink={dataLinks.filename6}
                ></DataPack>
              </Box>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default BuyData;
