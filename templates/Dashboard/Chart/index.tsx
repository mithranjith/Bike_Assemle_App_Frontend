import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";
import { useColorMode } from "@chakra-ui/color-mode";
import { useMediaQuery } from "react-responsive";
import Select from "@/components/Select";
const colors = [
  {
    id: "0",
    title: "This month",
  },
  {
    id: "1",
    title: "Today",
  },
  {
    id: "2",
    title: "All time",
  },
  {
    id: "3",
    title: "Custom",
  },
];
type MainProps = {
  activeItem?: number;
};

const CustomLegend = ({ series }: { series: any }) => {
  return (
    <div className="custom-legend">
      {series.map((s: any, index: number) => (
        <div
          key={index}
          className="flex items-center mr-[20px] p-[16px] rounded-xl bg-[#34383980] sm:p-[8px] sm:mr-[10px]"
        >
          <div
            className="legend-color"
            style={{ backgroundColor: s.color }}
          ></div>
          <div className="text-xl sm:text-md font-bold">{s.name}</div>
        </div>
      ))}
    </div>
  );
};

const Chart = ({ activeItem }: MainProps) => {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [activeTab, setActiveTab] = useState<any>({
    id: "0",
    title: "This month",
  });
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === "light";

  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });
  var options = {
    colors: ["#8E55EA", "#46DEFF"],
    chart: {
      height: 350,
      foreColor: colorMode === "light" ? "grey" : "white",
      padding: "8px",
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false, // Hide the default legend
    },
    dataLabels: {
      enabled: false,
    },
    "stroke.curve": "smooth",
    "xaxis.type": "datetime",
    "xaxis.categories": [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
    tooltip: {
      theme: "false",
      x: {
        format: "dd/MM/yy",
      },
    },
  };

  const series = [
    {
      name: "Recommendations",
      data: [31, 40, 28, 51, 42, 109, 100],
      color: "#8E55EA",
    },
    {
      name: "Purchases",
      data: [11, 32, 45, 32, 34, 52, 41],
      color: "#46DEFF",
    },
  ];
  const tabs = [
    { label: "This month" },
    { label: "Today" },
    { label: "All time" },
    { label: "Custom" },
  ];

  return (
    <>
      <div
        className="flex justify-start gap-4 m-5 sm:justify-start h-10"
        style={{ height: "70px" }}
      >
        {isMobile ? (
          <Select
            className="grow ml-15 mt-0 mr-10 shrink-0"
            classButton="dark:bg-transparent"
            classArrow="dark:fill-n-4"
            items={colors}
            value={activeTab}
            onChange={setActiveTab}
          />
        ) : (
          <>
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={twMerge(
                  `px-8 py-5 sm:px-4 sm:py-3 base2 text-sm text-n-1 whitespace-nowrap ${
                    activeTab === index
                      ? "btn bg-primary-1 shadow-lg border-none"
                      : "btn-stroke-light text-n-4"
                  } `
                )}
                onClick={() => {
                  setActiveTab(index);
                }}
              >
                {tab.label}
              </button>
            ))}
          </>
        )}
      </div>
      <Chart options={options} series={series} type="area" />
      <CustomLegend series={series} />
      {/* <Chart options={options} series={series} type="area" /> */}
    </>
  );
};

export default Chart;
