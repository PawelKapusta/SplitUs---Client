import React, { forwardRef, useState } from "react";
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
import UserGroupsListBodyContent from "../molecules/UserGroupsListBodyContent";
import { Column } from "../../styles/footerStyles";

interface Column {
  id: "Name" | "Description" | "DataCreated";
  label: string;
  minWidth?: number;
  align?: "center";
}

const columns: Column[] = [
  { id: "Name", label: "Name", minWidth: 200 },
  { id: "Description", label: "Description", minWidth: 300 },
  { id: "DataCreated", label: "DataCreated", minWidth: 200 },
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

const UserGroupsList: React.FC = () => {
  const userGroupsList = useSelector((state: RootStateOrAny) => state.userGroupsList);
  const { groups, loading } = userGroupsList;
  console.log(groups);
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
          <h1 className={classes.title}>My groups</h1>
        </Grid>
        <Grid item xs="auto" md="auto" lg="auto">
          <Paper className={classes.paper}>
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map(column => (
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
                      <UserGroupsListBodyContent
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

export default UserGroupsList;
