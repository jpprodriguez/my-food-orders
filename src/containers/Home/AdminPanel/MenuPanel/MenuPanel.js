import React, { Component } from "react";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import {
    deleteMenu,
    getMenusByCategory
} from "../../../../firebase/MenuService";
import AdminMenuCard from "../../../../components/MenuCard/AdminMenuCard/AdminMenuCard";
import Aux from "../../../../hoc/Aux/Aux";
import MenuEditModal from "../../../../components/MenuEditModal/MenuEditModal";
import Button from "@material-ui/core/Button/Button";
import NewMenuCard from "../../../../components/MenuCard/common/NewMenuCard";
import { MenuOption } from "../../../../firebase/common/models";
import { SnackbarTypes } from "../../../../components/Snackbar/Snackbars";
import { toast } from "react-toastify";
import Snackbar from "../../../../components/Snackbar/Snackbars";

const style = {
    root: {
        padding: "24px",
        marginBottom: "64px",
        backgroundColor: "transparent"
    },
    title: {
        textTransform: "capitalize",
        width: "100%",
        marginBottom: "16px"
    },
    menuCard: {
        margin: "0 16px 16px 0px"
    },
    cardsContainer: {
        display: "flex",
        flexWrap: "wrap"
    }
};

class MenuPanel extends Component {
    menusRef = null;
    state = {
        menus: null,
        menuToEdit: null
    };
    componentDidMount() {
        this.menusRef = getMenusByCategory(this.props.category);
        this.menusRef.on("value", snapshot => {
            this.setState({ menus: snapshot.val() });
        });
    }
    componentWillUnmount() {
        if (this.menusRef) {
            this.menusRef.off();
        }
    }
    render() {
        const { classes } = this.props;
        const { isModalOpen, menuToEdit, menus } = this.state;
        const menuCards = menus
            ? Object.keys(menus).map(key => (
                  <div className={classes.menuCard} key={key}>
                      <AdminMenuCard
                          id={key}
                          menu={menus[key]}
                          onEditClicked={(menu, id) =>
                              this.handleMenuEditClick(menu, id)
                          }
                          onDeleteClicked={id => this.handleMenuDeleteClick(id)}
                      />
                  </div>
              ))
            : null;
        return (
            <Aux>
                <Paper className={classes.root}>
                    <Typography
                        className={classes.title}
                        component={"h3"}
                        variant={"title"}
                    >
                        {this.props.title}
                    </Typography>
                    <div className={classes.cardsContainer}>
                        {menuCards}
                        <NewMenuCard
                            onAddButtonClicked={this.handleMenuAddClick}
                        />
                    </div>
                </Paper>
                <MenuEditModal
                    menu={menuToEdit}
                    open={isModalOpen}
                    onClose={() => this.handleModalClose()}
                    onMenuChanged={newMenu => this.handleMenuChange(newMenu)}
                />
            </Aux>
        );
    }
    handleMenuEditClick = (menu, id) => {
        this.setState({
            menuToEdit: { data: menu, id: id },
            isModalOpen: true
        });
    };
    handleMenuAddClick = () => {
        this.setState({
            menuToEdit: {
                data: new MenuOption(this.props.category, "", "", null),
                id: null
            },
            isModalOpen: true
        });
    };
    handleMenuDeleteClick = id => {
        deleteMenu(id)
            .then(() => {
                toast(
                    <Snackbar
                        variant={SnackbarTypes.success}
                        message="Menu successfully deleted"
                    />
                );
            })
            .catch(err => {
                toast(
                    <Snackbar
                        variant={SnackbarTypes.error}
                        message={err.message}
                    />
                );
            });
    };
    handleModalClose = () => {
        this.setState({
            menuToEdit: null,
            isModalOpen: false
        });
    };
}

export default withStyles(style)(MenuPanel);
