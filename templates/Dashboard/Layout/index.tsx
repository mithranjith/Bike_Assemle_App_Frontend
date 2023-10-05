import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Chart from "../Chart";
import Metrics from "../Metrics";

type MainProps = {};

const Main = ({}: MainProps) => {

  return (
    <>
      <Grid container spacing={2} className="mt-10 sm:mt-0">
        <Grid item md={4} xs={12}>
          <Metrics />
        </Grid>
        <Grid item md={8} xs={12} className="sm:p-8">
          <Chart />
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
