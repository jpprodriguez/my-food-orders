import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import Modal from "@material-ui/core/Modal/Modal";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";

const styles = {
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        width: 600
    },
    modalTitle: {
        marginBottom: 16
    },
    cardContent: {
        paddingBottom: "8px !important"
    }
};
const FormModal = props => {
    const { open, onClose, classes, children, title } = props;
    return (
        <Modal
            open={open}
            onClose={onClose}
            className={classes.root}
            disableAutoFocus
        >
            <Card className={classes.modalContent}>
                <CardContent className={classes.cardContent}>
                    <Typography
                        variant="title"
                        component={"p"}
                        className={classes.modalTitle}
                    >
                        {title}
                    </Typography>
                    {children}
                </CardContent>
            </Card>
        </Modal>
    );
};

export default withStyles(styles)(FormModal);
