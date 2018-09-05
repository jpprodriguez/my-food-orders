import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import deepPurple from "@material-ui/core/colors/deepPurple";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import CheckIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "16px"
    },
    nameContainer: {
        display: "flex",
        alignItems: "center",
        width: 200,
        flexGrow: 1,
        marginRight: 24
    },
    avatar: {
        marginRight: 16,
        backgroundColor: deepPurple[300]
    },
    checkIcon: {
        color: green[500]
    },
    cancelIcon: {
        color: red[700]
    },
    veggieText: {
        display: "flex",
        alignItems: "center"
    },
    profileContainer: {
        flexGrow: 1
    },
    actionsContainer: {
        flexGrow: 1,
        textAlign: "right"
    },
    editButton: {
        color: blue[700]
    },
    deleteButton: {
        color: red[700]
    }
};

const UserCard = props => {
    const { classes, user, onEditClick } = props;
    return (
        <div className={classes.root}>
            <div className={classes.nameContainer}>
                <Avatar className={classes.avatar}>
                    {getUserInitials(user.name)}
                </Avatar>
                <div>
                    <Typography component="p" variant="subheading">
                        {user.name}
                    </Typography>
                    <Typography component="p" variant="caption">
                        email@email.com
                    </Typography>
                </div>
            </div>
            <div className={classes.profileContainer}>
                <Typography component="p" variant="body1">
                    File Number: {user.fileNumber ? user.fileNumber : "-"}
                </Typography>
                <Typography
                    component="p"
                    variant="body1"
                    className={classes.veggieText}
                >
                    Veggie:{" "}
                    {user.isVeggie ? (
                        <CheckIcon className={classes.checkIcon} />
                    ) : (
                        <CancelIcon className={classes.cancelIcon} />
                    )}
                </Typography>
            </div>
            <div className={classes.actionsContainer}>
                <IconButton
                    onClick={() => {
                        onEditClick(user);
                    }}
                >
                    <EditIcon className={classes.editButton} />
                </IconButton>
                <IconButton>
                    <DeleteIcon className={classes.deleteButton} />
                </IconButton>
            </div>
        </div>
    );
};
const getUserInitials = name => {
    let initials = "";
    for (let x = 0; x < name.length; x++) {
        if (initials.length === 0) {
            initials += name[x];
        } else if (
            name[x] === " " &&
            name.length > x + 1 &&
            name[x + 1] !== " "
        ) {
            initials += name[x + 1];
        }
    }
    return initials;
};

export default withStyles(styles)(UserCard);
