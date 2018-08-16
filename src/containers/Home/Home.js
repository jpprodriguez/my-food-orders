import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import { logOut, createOrder } from "../../store/actions";

const Home = props => (
    <div>
        <p>This is HOME</p>
        <Button
            variant="raised"
            color="primary"
            onClick={() => props.createOrder()}
        >
            Create Order
        </Button>
        <Button
            variant="raised"
            color="primary"
            onClick={() => props.onLogout()}
        >
            Logout
        </Button>
    </div>
);
const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logOut()),
    createOrder: () => dispatch(createOrder())
});

export default connect(
    null,
    mapDispatchToProps
)(Home);
