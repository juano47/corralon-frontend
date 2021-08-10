import React, { Component } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {FaGem, FaHeart} from "react-icons/fa";
import {Link} from "react-router-dom";
import {ImUsers} from "react-icons/all";

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
                </Menu>
            </ProSidebar>
        );
    }
}

export default SidebarComponent;
