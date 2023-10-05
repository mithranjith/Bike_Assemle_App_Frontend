import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Chart from "../Chart";
import AdminMetrics from "../Metrics";

type AdminMain = {};

const AdminMain = ({}: AdminMain) => {
  return (
    <>
      <Grid container spacing={2} className="mt-10 sm:mt-0">
        <Grid item md={2}>
          {/* <AdminMetrics /> */}
        </Grid>
        <Grid item md={8} xs={12} className="sm:p-8">
          <Chart />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminMain;
