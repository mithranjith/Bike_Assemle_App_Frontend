import React from "react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import { FaUser, FaAngleUp } from "react-icons/fa";
import { GetUsers } from "@/services/api.service";
import Image from "@/components/Image";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { useColorMode } from "@chakra-ui/color-mode";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { table } from "console";
type FilterOption = "firstName" | "lastName" | "email" | "phone";
type UsersListProps = {
  users: any;
  loading: boolean;
  setPage: (page: number) => void;
  totalPages: number;
  page: number;
  search: string;
  setSearch: (search: string) => void;
  setSort: (sort: number) => void;
};
interface Users {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  profileUrl: string;
}
const useroptions = [
  { id: -1, title: "Recently Added" },
  { id: 1, title: "Old to New" },
];
const UsersList = ({
  users,
  loading,
  totalPages,
  setPage,
  page,
  search,
  setSearch,
  setSort,
}: UsersListProps) => {
  const [userlist, setUserlist] = useState<Users[]>([]);
  const [value, setValue] = useState(useroptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(
    null
  );
  const itemsPerPage = 10;
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { colorMode, setColorMode } = useColorMode();
  const tableTheme = createTheme({
    overrides: {
      MuiPaper: {
        root: {
          boxShadow: "none",
          border: "none",
        },
      },
    },
  });
  useEffect(() => {
    setUserlist(users);
  }, [users]);
  useEffect(() => {
    setSort(value.id);
  }, [value]);
  const columns = [
    {
      name: "firstName",
      label: "First Name",
      options: {
        filter: true,

        customBodyRender: (value: string, tableMeta: any, updateValue: any) => {
          const rowData = userlist[tableMeta.rowIndex];

          if (!rowData) {
            return null;
          }

          const firstName = rowData.firstName;
          const profileUrl = rowData.profileUrl;

          return (
            <div className="dark:text-white flex place-self-center w-[250px] sm:w-[250px]">
              <>
                {profileUrl ? (
                  <Image
                    src={profileUrl}
                    width={40}
                    height={40}
                    alt="user"
                    className="w-[40px] h-[40px]  rounded-full mr-3"
                  />
                ) : (
                  <FaUser className="w-[40px] h-[40px] rounded-full mr-3" />
                )}
              </>
              <div className="p-2">{firstName ? firstName : "-"}</div>
            </div>
          );
        },
      },
    },

    {
      name: "lastName",
      label: "Last Name",
      options: {
        filter: true,
        customBodyRender: (lastName: string) => (
          <div className="dark:text-white w-[170px] sm:w-[200px]">
            {lastName ? lastName : "-"}
          </div>
        ),
      },
    },

    {
      name: "email",
      label: "Email",
      options: {
        filter: true,

        customBodyRender: (email: string) => (
          <div className="dark:text-white w-[170px] sm:w-[200px]">
            {email ? email : "-"}
          </div>
        ),
      },
    },

    {
      name: "phone",
      label: "Phone",
      options: {
        filter: true,
        customBodyRender: (phone: string) => (
          <div className="dark:text-white w-[150px] sm:w-[150px]">
            {phone ? phone : "-"}
          </div>
        ),
      },
    },
  ];

  const options = {
    search: false,
    searchOpen: false,
    selectableRows: false,
    fixedSelectColumn: false,
    download: false,
    downloadOptions: {
      download: false,
    },
    print: false,
    filterType: false,
    stickyHeader: false,
    scrollY: false,
    style: {
      backgroundColor: "#000000",
    },
    viewColumns: false,
    filter: false,
    pagination: true,
    customFooter: (count: number, page1: number, changePage: any) => {
      return (
        <div className="pagination-container  my-2">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                className={`pagination-item ${
                  item.page === page ? "active" : ""
                }`}
              />
            )}
          />
        </div>
      );
    },
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };
  const handleRowSelect = (
    currentRowsSelected: number[],
    allRowsSelected: number[]
  ) => {
    setSelectedRows(currentRowsSelected);
  };
  return (
    <div>
      <div className="flex   md:flex-col gap-4">
        <Field
          className="mb-4"
          classInput="border-n-4 dark:border-n-4 dark:focus:bg-transparent min-w-[14.5rem]"
          placeholder="Serach"
          icon="search"
          value={search}
          onChange={(e: any) => {
            setSearch(e.target.value);
          }}
        />
        <Select
          className=" shrink-0 min-w-[14.5rem]"
          classButton="border-2 border-n-4 dark:border-n-4 "
          items={useroptions}
          value={value}
          onChange={setValue}
        />
      </div>
      <div className="p-1.5 w-full mb-10 ">
        <MuiThemeProvider theme={tableTheme}>
          <MUIDataTable
            className={`table-fixed flex-wr dark:bg-n-6 dark:text-white question-table   ${
              colorMode !== "dark" && "question-table-dark"
            }`}
            data={userlist}
            columns={columns}
            options={{
              ...options,
              // selectableRows: "multiple",
              // selectableRowsOnClick: true,
              responsive: "standard",
              onRowsSelect: (
                currentRowsSelected: any[],
                allRowsSelected: any[]
              ) => {
                // Handle selected rows here
              },
            }}
          />
        </MuiThemeProvider>
      </div>
      {/* <DataTable
        columns={columns}
        data={userlist}
        defaultSortFieldId="title"
        sortIcon={<FaAngleUp />}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        selectableRows={false}
        subHeader
      /> */}
    </div>
  );
};
export default UsersList;
