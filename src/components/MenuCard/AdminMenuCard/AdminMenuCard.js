import React from "react";
import MenuCard from "../common/MenuCard";

class AdminMenuCard extends React.Component {
    render() {
        const { menu } = this.props;
        return (
            <MenuCard
                isAdmin={true}
                menu={menu}
                selected={false}
                options={menu.options}
                onMenuSelected={null}
                onMenuDetailSelected={null}
            />
        );
    }
}

export default AdminMenuCard;
