import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {
        minWidth: 700
    }
});

function SimpleTable(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>File Number</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Options</TableCell>
                        <TableCell>Delivered</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map(row => {
                        return (
                            <TableRow key={row.fileNumber}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.fileNumber}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>
                                    {row.options ? row.options[0] : "-"}
                                </TableCell>
                                <TableCell>
                                    {row.delivered ? "yes" : "no"}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
