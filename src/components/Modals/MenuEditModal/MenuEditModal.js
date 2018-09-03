import React from "react";
import MenuEditForm from "../../Forms/MenuEditForm/MenuEditForm";
import { createMenu, updateMenuById } from "../../../firebase/MenuService";
import { SnackbarTypes } from "../../Snackbar/Snackbars";
import { toast } from "react-toastify";
import Snackbar from "../../Snackbar/Snackbars";
import FormModal from "../common/FormModal/FormModal";

const MenuEditModal = props => {
    const { open, menu, onClose } = props;
    return (
        <FormModal open={open} onClose={onClose} title="Edit Menu">
            <MenuEditForm
                menu={menu ? menu.data : null}
                onFormCancelled={() => handleFormCancel(onClose)}
                onFormSubmitted={newMenu =>
                    handleMenuChange(menu.id, newMenu, onClose)
                }
            />
        </FormModal>
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

export default MenuEditModal;
