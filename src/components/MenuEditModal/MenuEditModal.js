import React from "react";
import Modal from "@material-ui/core/Modal/Modal";
import MenuEditForm from "./MenuEditForm/MenuEditForm";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import { createMenu, updateMenuById } from "../../firebase/MenuService";
import { SnackbarTypes } from "../Snackbar/Snackbars";
import { toast } from "react-toastify";
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
    if (id) {
        updateMenu(id, newMenu);
    } else {
        creatNewMenu(newMenu);
    }

    onClose();
};
const handleFormCancel = onClose => {
    onClose();
};
const creatNewMenu = newMenu => {
    createMenu(newMenu)
        .then(() => {
            triggerToast(SnackbarTypes.success, "Menu successfully created");
        })
        .catch(err => {
            triggerToast(SnackbarTypes.error, err.message);
        });
};
const updateMenu = (id, newMenu) => {
    updateMenuById(id, newMenu)
        .then(() => {
            triggerToast(SnackbarTypes.success, "Menu successfully updated");
        })
        .catch(err => {
            triggerToast(SnackbarTypes.error, err.message);
        });
};
const triggerToast = (type, text) => {
    toast(<Snackbar variant={type} message={text} />);
};

export default withStyles(styles)(MenuEditModal);
