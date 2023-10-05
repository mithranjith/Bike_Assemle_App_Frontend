import { Grid } from "@mui/material";
import AnimatedNumber from 'animated-number-react';
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";
import React from'react';
const AdminMetrics = () => {
  // const Chart = dynamic(() => import("animated-number-react"), { ssr: false });
  let duration = 2000;
 
  const metrics = [
    { name: "Number of Subscriptions", value: 32, color: "#0084FF" },
    { name: "Number of Stores", value: 30, color: "#46DEFF" },
    { name: "Revenue", value: 15, color: "#9747FF" },
  ];
  const formatValue = (value: number) => Math.round(value);
  return (
    <Grid container spacing={2} className="justify-center">
      {metrics.map((metric, index) => (
        <Grid
          item
          xs={8}
          md={9}
          key={index}
          className="!my-8 !sm:my-4 rounded-xl border-1 border-grey-500 bg-n-2 dark:bg-n-7 !py-8 sm:!py-6 !px-0 shadow-lg shadow-ligt-500/50"
        >
          <div className="text-xl text-n-4 font-semibold sm:text-lg flex justify-center items-baseline">
            <span className={"text-xl sm:text-xl"}>
              <span className="text-[#E68A1D]"></span> {" "}
            </span>
            &nbsp;{metric.name}
          </div>
          <AnimatedNumber
            value={metric.value}
            formatValue={formatValue}
            className="h2 sm:h5 flex justify-center mt-5"
            duration={duration}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default AdminMetrics;
