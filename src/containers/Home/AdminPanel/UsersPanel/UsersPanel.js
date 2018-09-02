import React, { Component } from "react";
import UserCard from "../../../../components/UserCard/UserCard";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import Divider from "@material-ui/core/Divider/Divider";
import Aux from "../../../../hoc/Aux/Aux";

const styles = {
    usersCardsContainer: {
        width: 500
    }
};

class UsersPanel extends Component {
    componentWillMount() {
        this.props.onInit();
    }
    render() {
        const { users, classes } = this.props;
        const usersCards = users
            ? users.map(user => (
                  <Aux>
                      <UserCard key={user.key} user={user} /> <Divider />
                  </Aux>
              ))
            : null;
        return (
            <Paper className={classes.usersCardsContainer}>{usersCards}</Paper>
        );
    }
}

export default withStyles(styles)(UsersPanel);
