import React from "react";
import { getMenuByIdRef } from "../../../firebase/MenuService";
import MenuCard from "../common/MenuCard";

class CustomerMenuCard extends React.Component {
    state = { menu: null };
    menuByIdRef = null;

    componentDidMount() {
        this.menuByIdRef = getMenuByIdRef(this.props.menuId);
        this.menuByIdRef.on("value", snapshot => {
            this.setState({ menu: snapshot.val() });
        });
    }
    componentWillUnmount() {
        if (this.menuByIdRef) {
            this.menuByIdRef.off();
        }
    }

    render() {
        return (
            <MenuCard
                isAdmin={false}
                menu={this.state.menu}
                selected={this.props.selected}
                options={this.props.options}
                onMenuSelected={() => this.props.onMenuSelected()}
                onMenuDetailSelected={item =>
                    this.props.onMenuDetailSelected(item)
                }
            />
        );
    }
}

export default CustomerMenuCard;
