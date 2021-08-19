import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListEmployeeComponent from './components/employee/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/employee/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/employee/ViewEmployeeComponent';
import SidebarComponent from "./components/SidebarComponent";
import CreateClientComponent from "./components/client/CreateClientComponent";
import ViewClientComponent from "./components/client/ViewClientComponent";
import ListClientComponent from "./components/client/ListClientComponent";
import ListWorkComponent from "./components/work/ListWorkComponent";
import CreateWorkComponent from "./components/work/CreateWorkComponent";
import ViewWorkComponent from "./components/work/ViewWorkComponent";
import CreateProductComponent from "./components/product/CreateProductComponent";
import ListProductComponent from "./components/product/ListProductComponent";
import ViewProductComponent from "./components/product/ViewProductComponent";
import ListOrderComponent from "./components/order/ListOrderComponent";
import CreateOrderComponent from "./components/order/CreateOrderComponent";
import ViewOrderComponent from "./components/order/ViewOrderComponent";
import LoginComponent from "./components/auth/LoginComponent";
import {getAccessToken} from "axios-jwt";

function App() {
    if (!getAccessToken()) {
        return (
            <LoginComponent/>
        );
    }
    return (
        <div>
            <HeaderComponent />
            <div className="container row">
                <Router>
                    <div className="col-md-3">
                        <SidebarComponent/>
                    </div>
                    <div className="col-md-9">

                        <Switch>
                            <Route path = "/" exact component = {ListEmployeeComponent}/>
                            <Route path = "/employees" component = {ListEmployeeComponent}/>
                            <Route path = "/add-employee/:id" component = {CreateEmployeeComponent}/>
                            <Route path = "/view-employee/:id" component = {ViewEmployeeComponent}/>
                            <Route path = "/clients" component = {ListClientComponent}/>
                            <Route path = "/add-client/:id" component = {CreateClientComponent}/>
                            <Route path = "/view-client/:id" component = {ViewClientComponent}/>
                            <Route path = "/works" component = {ListWorkComponent}/>
                            <Route path = "/add-work/:id" component = {CreateWorkComponent}/>
                            <Route path = "/view-work/:id" component = {ViewWorkComponent}/>
                            <Route path = "/products" component = {ListProductComponent}/>
                            <Route path = "/add-product/:id" component = {CreateProductComponent}/>
                            <Route path = "/view-product/:id" component = {ViewProductComponent}/>
                            <Route path = "/orders" component = {ListOrderComponent}/>
                            <Route path = "/add-order/:id" component = {CreateOrderComponent}/>
                            <Route path = "/view-order/:id" component = {ViewOrderComponent}/>
                            <Route path = "/login" component = {LoginComponent}/>
                        </Switch>
                        {/*<FooterComponent />*/}

                    </div>
                </Router>
            </div>
        </div>
    );
}

export default App;
