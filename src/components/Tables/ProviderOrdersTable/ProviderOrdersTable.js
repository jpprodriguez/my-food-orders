import React from "react";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    root: {
        paddingTop: 16
    },
    title: {
        marginLeft: 24,
        textTransform: "capitalize"
    },
    table: {
        "& th": {
            width: "28%"
        },
        "& td": {
            "&:first-letter": {
                textTransform: "capitalize"
            }
        }
    },
    total: {
        fontWeight: 700
    }
};

const ProviderOrdersTable = props => {
    const { orders, classes } = props;
    return (
        <Paper className={classes.root}>
            <Typography variant={"title"} className={classes.title}>
                {props.category}
            </Typography>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Food</TableCell>
                        <TableCell>Options</TableCell>
                        <TableCell>Numbers</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders ? (
                        orders.map((order, index) => (
                            <TableRow key={index}>
                                <TableCell>{order.food}</TableCell>
                                <TableCell>{order.options || "-"}</TableCell>
                                <TableCell>
                                    {parseNumbers(order.numbers)}
                                </TableCell>
                                <TableCell>{order.numbers.length}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow />
                    )}
                    <TableRow selected>
                        <TableCell component={"th"} className={classes.total}>
                            TOTAL
                        </TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell className={classes.total}>
                            {getTotalOrders(orders)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};

const parseNumbers = numberArray => {
    let numberString = "";
    for (let number of numberArray) {
        numberString += number + ", ";
    }
    return numberString.slice(0, -2);
};
const getTotalOrders = orders => {
    let total = 0;
    for (let order of orders) {
        total += order.numbers.length;
    }
    return total;
};

export default withStyles(styles)(ProviderOrdersTable);
