import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";

import TablePagination from "@material-ui/core/TablePagination";
import Grid from "@material-ui/core/Grid";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RootStateOrAny, useSelector } from "react-redux";
import { Column } from "../../styles/footerStyles";
import AdminUsersListBodyContent from "../molecules/AdminUsersListBodyContent";

interface Column {
  id: "FullName" | "Phone" | "BirthDate" | "isAdmin" | "isBlocked";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: boolean) => string;
}

const usersColumns: Column[] = [
  {
    id: "FullName",
    label: "Full Name",
    minWidth: 100,
    format: (value: boolean) => value.toLocaleString(),
  },
  {
    id: "Phone",
    label: "Phone",
    minWidth: 100,
    format: (value: boolean) => value.toLocaleString(),
  },
  {
    id: "BirthDate",
    label: "Birth Date",
    minWidth: 150,
    format: (value: boolean) => value.toLocaleString(),
  },
  {
    id: "isAdmin",
    label: "isAdmin",
    minWidth: 50,
    format: (value: boolean) => value.toLocaleString(),
  },
  {
    id: "isBlocked",
    label: "isBlocked",
    minWidth: 50,
    format: (value: boolean) => value.toLocaleString(),
  },
];

const useStyles = makeStyles({
  root: {
    margin: "2%",
  },
  title: {
    color: "#ffffff",
    fontSize: "48px",
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

const AdminUsersList: React.FC = () => {
  const userList = useSelector((state: RootStateOrAny) => state.userList);
  const { loading: usersListLoading, users } = userList;
  console.log(users);
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
          <h1 className={classes.title}>All users in system</h1>
        </Grid>
        <Grid item xs="auto" md="auto" lg="auto">
          <Paper className={classes.paper}>
            {usersListLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {usersColumns.map(column => (
                          <TableCell
                            key={Column.id}
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
                      <AdminUsersListBodyContent
                        page={page}
                        rowsPerPage={rowsPerPage}
                        columns={usersColumns}
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={users?.length}
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

export default AdminUsersList;
