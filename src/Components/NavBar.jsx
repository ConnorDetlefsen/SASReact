import React from "react";
import {Box} from "@material-ui/core";

const NavBar = ({ pagename, budget }) => {
  return (
    <Box mb={4} display="flex" justifyContent="flex-end" className="navbar box-shadow" >
      <h1 className="box-shadow">Bank Balance: {budget}</h1>
    </Box>
  );
};

export default NavBar;
