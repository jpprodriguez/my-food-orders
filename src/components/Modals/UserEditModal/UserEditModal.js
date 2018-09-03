import React from "react";
import { createMenu, updateMenuById } from "../../../firebase/MenuService";
import { SnackbarTypes } from "../../Snackbar/Snackbars";
import { toast } from "react-toastify";
import Snackbar from "../../Snackbar/Snackbars";
import FormModal from "../common/FormModal/FormModal";
import UserEditForm from "./UserEditForm/UserEditForm";

const UserEditModal = props => {
    const { open, user, onClose } = props;
    return (
        <FormModal open={open} onClose={onClose} title="Edit User">
            <UserEditForm
                user={user}
                onFormCancelled={() => handleFormCancel(onClose)}
                onFormSubmitted={newUser => handleUserChange(newUser, onClose)}
            />
        </FormModal>
    );
};

const handleUserChange = (newUser, onClose) => {
    // TODO
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

export default UserEditModal;
