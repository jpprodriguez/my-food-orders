import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import { logOut } from "../../store/actions";

const Home = props => (
    <div>
        <p>This is HOME</p>
        <Button
            fullWidth
            variant="raised"
            color="primary"
            onClick={() => props.onLogout()}
        >
            Logout
        </Button>
    </div>
);
const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logOut())
});

export default connect(
    null,
    mapDispatchToProps
)(Home);
