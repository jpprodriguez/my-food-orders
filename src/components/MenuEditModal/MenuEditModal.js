import React from "react";
import Modal from "@material-ui/core/Modal/Modal";
import MenuEditForm from "./MenuEditForm/MenuEditForm";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import { updateMenuById } from "../../firebase/MenuService";
import { SnackbarTypes } from "../Snackbar/Snackbars";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Snackbar from "../Snackbar/Snackbars";

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
    },
    toast: {
        background: "transparent",
        padding: 0,
        margin: 0,
        width: "fit-content"
    }
};
const MenuEditModal = props => {
    const { open, menu, onClose, classes } = props;
    return (
        <Modal
            open={open ? open : false}
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
                        Edit Menu
                    </Typography>
                    <MenuEditForm
                        menu={menu ? menu.data : null}
                        onFormCancelled={() => handleFormCancel(onClose)}
                        onFormSubmitted={newMenu =>
                            handleMenuChange(menu.id, newMenu, onClose)
                        }
                    />
                </CardContent>
            </Card>
        </Modal>
    );
};

const handleMenuChange = (id, newMenu, onClose) => {
    updateMenuById(id, newMenu)
        .then(() => {
            toast(
                <Snackbar
                    variant={SnackbarTypes.success}
                    message="Menu successfully updated"
                />
            );
        })
        .catch(err => {
            toast(
                <Snackbar variant={SnackbarTypes.error} message={err.message} />
            );
        });
    onClose();
};
const handleFormCancel = onClose => {
    onClose();
};

export default withStyles(styles)(MenuEditModal);
