import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";
import { useColorMode } from "@chakra-ui/color-mode";
import { useMediaQuery } from "react-responsive";
import Select from "@/components/Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GetAssembledDataReports } from "@/services/api.service";

const colors = [
  {
    id: 0,
    title: "This month",
  },
  {
    id: 1,
    title: "Today",
  },
  {
    id: 2,
    title: "All time",
  },
  {
    id: 3,
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
        <div key={index} className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: s.color }}
          ></div>
          <div className="legend-label">{s.name}</div>
        </div>
      ))}
    </div>
  );
};

const AdminChart = ({ activeItem }: MainProps) => {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [activeTab, setActiveTab] = useState<any>("0");
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === "light";
  const [startDate, setStartDate] = useState<Date | null>(new Date() || null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [chartOptions, setChartOptions] = useState<any>({
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
    xaxis: {
      categories: [],
    },
    tooltip: {
      theme: "false",
    },
  });

  const [chartSeries, setChartSeries] = useState<any>([
    {
      name: "Number of Bikes",
      data: [],
      color: "#8E55EA",
    },
  ]);
  const onchange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (end !== null) getReport(start, end);
  };

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
    xaxis: {
      categories: [
        "2018-09-14",
        "2018-09-15",
        "2018-09-16",
        "2018-09-17",
        "2018-09-18",
        "2018-09-19",
        "2018-09-20",
      ],
    },
    tooltip: {
      theme: "false",
    },
  };

  const series = [
    {
      name: "Number of Stores",
      data: [31, 40, 28, 51, 42, 109, 100],
      // color: "#8E55EA",
    },
  ];
  const tabs = [
    { label: "This month" },
    { label: "Today" },
    { label: "All time" },
    { label: "Custom" },
  ];

  const getReport = async (start, end) => {
    let body = {};

    console.log("Cheking active tab...", activeTab);

    switch (activeTab) {
      case 0:
        body = {
          mode: "month",
        };
        break;
      case 1:
        body = {
          mode: "day",
        };
        break;
      case 2:
        body = {
          mode: "year",
        };
        break;
      case 3:
        body = {
          mode: "custom",
          lastDate: end,
          startDate: start,
        };
        break;
      default:
        body = {
          mode: "month",
        };
        break;
    }

    let result;

    try {
      result = await GetAssembledDataReports(body);
    } catch (error) {
      return console.log("Error while fetching data...", error);
    }
    if (result.success) {
      setChartOptions({
        ...chartOptions,
        xaxis: { categories: result.dataset.labels },
      });
      setChartSeries([
        { ...chartSeries[0], data: result.dataset.datasets[0].data },
      ]);
    }
  };

  useEffect(() => {
    getReport(startDate, endDate);
  }, [activeTab]);

  useEffect(() => {
    console.log("Checking data....", chartOptions, chartSeries);
  }, [chartOptions, chartSeries]);

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
              <div key={index}>
                <button
                  className={twMerge(
                    `px-8 py-5 sm:px-4 sm:py-3 base2 text-sm text-n-1 whitespace-nowrap ${
                      activeTab === index
                        ? "btn bg-primary-1 shadow-lg border-none"
                        : "btn-stroke-light text-n-4"
                    } `
                  )}
                  onClick={() => {
                    setActiveTab(index);
                    // {startDate &&{}
                    if (index === 3) {
                      setIsDatePickerOpen(true);
                    } else {
                      setActiveTab(index);
                      setIsDatePickerOpen(false);
                    }
                  }}
                >
                  {tab.label}
                </button>
              </div>
            ))}

            <div className=" -ml-34 ">
              {isDatePickerOpen && (
                <DatePicker
                  selected={startDate}
                  onChange={onchange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  className=" btn bg-primary-1 shadow-lg flex-wrap xl:w-38 lg:w-full lg:px-auto whitespace-nowrap text-n-1 xl:px-1 border-none "
                />
              )}
            </div>
          </>
        )}
      </div>
      <div className={`chart-container ${isDatePickerOpen ? "mt-20" : ""}`}>
        {/* <Chart options={chartOptions} series={series} type="area" /> */}
        <Chart options={chartOptions} series={chartSeries} type="bar" />

        <CustomLegend series={chartSeries} />
        {/* <Chart options={options} series={series} type="area" /> */}
      </div>
    </>
  );
};

export default AdminChart;
