import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import { RootStateOrAny, useSelector } from "react-redux";
import GroupBillsListBodyContent from "../molecules/GroupBillsListBodyContent";

interface Column {
  id: "Name" | "Description" | "DataCreated" | "DataEnd" | "CurrencyCode" | "Debt";
  label: string;
  minWidth?: number;
  align?: "center";
}

const columns: Column[] = [
  { id: "Name", label: "Name", minWidth: 180 },
  { id: "Description", label: "Description", minWidth: 150 },
  { id: "DataCreated", label: "DataCreated", minWidth: 50 },
  { id: "DataEnd", label: "DataEnd", minWidth: 100 },
  { id: "CurrencyCode", label: "CurrencyCode", minWidth: 20 },
  { id: "Debt", label: "Debt", minWidth: 50 },
];

const useStyles = makeStyles({
  root: {
    margin: "3%",
  },
  title: {
    color: "#ffffff",
    fontSize: "40px",
    fontFamily: "Signika",
    paddingBottom: "10px",
  },

  paper: {
    boxShadow: ".5em .7em #888888",
  },
  container: {
    maxHeight: 740,
  },
});

const GroupBillsList: React.FC = () => {
  const allBillsInGroup = useSelector((state: RootStateOrAny) => state.allBillsInGroup);
  const { bills, loading: allBillsInGroupLoading } = allBillsInGroup;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    const temporary = event;
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Grid spacing={1} alignContent="center" alignItems="center">
        <Grid item xs="auto" md="auto" lg="auto">
          <h2 className={classes.title}>All bills in this group:</h2>
        </Grid>
        <Grid item xs="auto" md="auto" lg="auto">
          <Paper className={classes.paper}>
            {allBillsInGroupLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map(column => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              fontWeight: "bold",
                              fontSize: "1.1rem",
                            }}>
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <GroupBillsListBodyContent
                        page={page}
                        rowsPerPage={rowsPerPage}
                        columns={columns}
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={bills?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default GroupBillsList;
