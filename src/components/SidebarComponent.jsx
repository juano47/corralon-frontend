import React, { Component } from 'react'
import {ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {FaGem} from "react-icons/fa";
import {Link} from "react-router-dom";
import {AiOutlineLogout, BiBuildingHouse, GoListOrdered, ImUsers, RiProductHuntLine} from "react-icons/all";
import {logout} from "../services/AuthService";

class SidebarComponent extends Component{
    render(){
        return (
            <ProSidebar >
                <Menu iconShape="square">
                    <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
                    <SubMenu title="Users" icon={<ImUsers />}>
                        <MenuItem>
                            Employees
                            <Link to="/employees" />
                        </MenuItem>
                        <MenuItem>
                            Clients
                            <Link to="/clients" />
                        </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<BiBuildingHouse />}>
                        Works
                        <Link to="/works" />
                    </MenuItem>
                    <MenuItem icon={<RiProductHuntLine />}>
                        Products
                        <Link to="/products" />
                    </MenuItem>
                    <MenuItem icon={<GoListOrdered />}>
                        Orders
                        <Link to="/orders" />
                    </MenuItem>
                </Menu>
                <SidebarFooter>
                    <Menu iconShape="square">
                        <MenuItem
                            icon={<AiOutlineLogout />}
                            onClick={logout}>
                            Logout
                            <Link to="/" />
                        </MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        );
    }
}

export default SidebarComponent;
