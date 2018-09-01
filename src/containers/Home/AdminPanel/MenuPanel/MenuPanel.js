import React, { Component } from "react";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import {
    getMenusByCategory,
    updateMenuById
} from "../../../../firebase/MenuService";
import AdminMenuCard from "../../../../components/MenuCard/AdminMenuCard/AdminMenuCard";
import Aux from "../../../../hoc/Aux/Aux";
import MenuEditModal from "../../../../components/MenuEditModal/MenuEditModal";

const style = {
    root: {
        display: "flex",
        flexWrap: "wrap",
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
                    {menuCards}
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
    handleModalClose = () => {
        this.setState({
            menuToEdit: null,
            isModalOpen: false
        });
    };
}

export default withStyles(style)(MenuPanel);
