import { createTheme } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";

// import { select } from "redux-saga/effects";

export default function DataGridDemo() {
  const columns = ["Name", "Company", "City", "State"];

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
  ];

  const options: any = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 3,
    rowsPerPageOptions: [3, 6, 9],
  };

  const getMuiTheme = () =>
    createTheme({
      palette: {
        background: {
          paper: "#FFFFFF9b",
          default: "#FFFFFF9b",
        },
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: "20px",
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            head: {
              Padding: "10px 4px",
              // margin: "0px 10px ",
            },
            body: {
              padding: "9px 15px",
              color: "#777",
            },
          },
        },
      },
    });

  return (
    <div>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Out of stock info"}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
}
