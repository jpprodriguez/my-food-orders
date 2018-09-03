import React, { Component } from "react";
import UserCard from "../../../../components/UserCard/UserCard";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import Divider from "@material-ui/core/Divider/Divider";
import Aux from "../../../../hoc/Aux/Aux";
import UserEditModal from "../../../../components/Modals/UserEditModal/UserEditModal";

const styles = {
    usersCardsContainer: {
        width: 500
    }
};

class UsersPanel extends Component {
    state = {
        isModalOpen: false,
        userToEdit: null
    };
    componentWillMount() {
        this.props.onInit();
    }
    render() {
        const { users, classes } = this.props;
        const usersCards = users
            ? users.map(user => (
                  <Aux key={user.key}>
                      <UserCard
                          user={user}
                          onEditClick={user => {
                              this.handleEditClick(user);
                          }}
                      />
                      <Divider />
                  </Aux>
              ))
            : null;
        return (
            <Aux>
                <Paper className={classes.usersCardsContainer}>
                    {usersCards}
                </Paper>
                <UserEditModal
                    open={this.state.isModalOpen}
                    user={this.state.userToEdit}
                    onClose={() => this.handleModalClose()}
                />
            </Aux>
        );
    }
    handleEditClick = user => {
        this.setState({ userToEdit: user, isModalOpen: true });
    };
    handleModalClose = () => {
        this.setState({ userToEdit: null, isModalOpen: false });
    };
}

export default withStyles(styles)(UsersPanel);
