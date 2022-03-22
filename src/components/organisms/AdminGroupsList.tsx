import React, { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
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
import { makeStyles } from "@material-ui/core/styles";
import AdminGroupsListBodyContent from "../molecules/AdminGroupsListBodyContent";

interface Column {
  id: "Name" | "Description" | "DataCreated";
  label: string;
  minWidth?: number;
  align?: "center";
}

const groupsColumns: Column[] = [
  {
    id: "Name",
    label: "Name",
    minWidth: 100,
  },
  {
    id: "Description",
    label: "Description",
    minWidth: 100,
  },
  {
    id: "DataCreated",
    label: "Data Created",
    minWidth: 150,
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

const AdminGroupsList = () => {
  const groupsList = useSelector((state: RootStateOrAny) => state.groupsList);
  const { loading: groupsListLoading, groups } = groupsList;
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
          <h1 className={classes.title}>All groups in system</h1>
        </Grid>
        <Grid item xs="auto" md="auto" lg="auto">
          <Paper className={classes.paper}>
            {groupsListLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {groupsColumns.map(column => (
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
                      <AdminGroupsListBodyContent
                        page={page}
                        rowsPerPage={rowsPerPage}
                        columns={groupsColumns}
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={groups?.length}
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

export default AdminGroupsList;
