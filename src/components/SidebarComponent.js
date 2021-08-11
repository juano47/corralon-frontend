import React, { Component } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {FaGem, FaHeart} from "react-icons/fa";
import {Link} from "react-router-dom";
import {BiBuildingHouse, ImUsers, RiProductHuntLine} from "react-icons/all";

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
                </Menu>
            </ProSidebar>
        );
    }
}

export default SidebarComponent;
