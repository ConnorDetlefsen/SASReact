import React from "react";
import { Box } from "@material-ui/core";
import Refresh from "../Components/Refresh";

const NavBar = ({ pagename, budget, period }) => {
  return (
    <Box
      mb={4}
      display="flex"
      justifyContent="flex-end"
      className="navbar box-shadow"
    >
      <Refresh class="leftButton"></Refresh>

      <h1 className="box-shadow">
        Period: {period} | Bank Balance: {budget}
      </h1>
    </Box>
  );
};

export default NavBar;
