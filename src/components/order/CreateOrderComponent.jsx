import React, { Component } from 'react'
import OrderService from '../../services/OrderService';
import ClientService from "../../services/ClientService";
import WorkService from "../../services/WorkService";
import TableEditable from "../TableEditable";
import ProductService from "../../services/ProductService";
import {Type} from "react-bootstrap-table2-editor";
import {MdDeleteForever} from "react-icons/all";

class CreateOrderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            orderDate: '',
            work: {
                id: '',
                description: ''
            },
            orderItems: [],
            state: 1,

            //extra state
            works: [],
            products: []
        }
    }

    componentDidMount(){

        //load works
        WorkService.getWorks().then((res) => {
            this.setState({works: res.data});
        });

        //load products
        ProductService.getProducts().then((res) => {
            this.setState({products: res.data});
        });

        if(this.state.id === '_add'){
            return
        }else{
            OrderService.getOrderById(this.state.id).then( (res) =>{
                let order = res.data;
                this.setState({
                    firstName: order.nombre,
                    lastName: order.apellido,
                    dni: order.dni,
                    email : order.mail,
                    user: {
                        id: order.user.id,
                        username: order.user.user,
                        password: order.user.password
                    }
                });
            });
        }
    }

    saveOrUpdateOrder = (e) => {
        e.preventDefault();
        let order = {
            nombre: this.state.firstName,
            apellido: this.state.lastName,
            dni: this.state.dni,
            mail: this.state.email,
            user: {
                id: this.state.user.id,
                user: this.state.user.username,
                password: this.state.user.password,
                tipoUsuario:{
                    id: 2,
                    tipo: "Empleado"
                }
            }

        };
        console.log('order => ' + JSON.stringify(order));

        if(this.state.id === '_add'){
            OrderService.createOrder(order).then(res =>{
                this.props.history.push('/orders');
            });
        }else{
            OrderService.updateOrder(order, this.state.id).then( res => {
                this.props.history.push('/orders');
            });
        }
    }

    changeOrderDateHandler= (event) => {
        this.setState({orderDate: event.target.value});
    }

    selectWorkHandler= (event) => {
        const order = this.state;
        order.work.id = event.target.value;
        this.setState(order);
    }

    handleTableChange(row, action){
        if(!row.id){
            return;
        }
        let orderItems = this.state.orderItems.slice();

        switch (action){
            case 'saveOrUpdate':
                let updateAction = false;

                orderItems.map(t => {
                    if(t.id === row.id){
                        Object.assign(t, row);
                        updateAction = true;
                    }
                })
                if(!updateAction){
                    orderItems.push(row);
                }
                break;
            case 'delete':
                orderItems = orderItems.filter(t => t.id !== row.id)
                break;
        }

        this.setState({orderItems: orderItems});
        console.log(orderItems);
    }

    cancel(){
        this.props.history.push('/orders');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Order</h3>
        }else{
            return <h3 className="text-center">Update Order</h3>
        }
    }

    render() {
        const columns = [
            {
                dataField: 'product',
                text: 'Product',
                editor: {
                    type: Type.SELECT,
                    getOptions: (setOptions, { row, column }) => {
                        console.log(`current editing row id: ${row.id}`);
                        console.log(`current editing column: ${column.dataField}`);
                        return this.state.products.map(product => {
                            return {
                                value: product.nombre,
                                label: product.nombre
                            }
                        })
                    }
                },
                formatter: (cell, row) => {
                    console.log('row: ', JSON.stringify(row))
                    let product;
                    this.state.products.forEach(prod => {
                        if(prod.nombre == row.product){
                            product = prod;
                        }
                    });
                    console.log('products: ', product)
                    console.log('product precio: ', product)
                    row.unitPrice = 3;
                    return row.product;
                },
            },
            {
                dataField: 'unitPrice',
                text: 'Unit Price',
                editable: false,
            },
            {
                dataField: 'cantidad',
                text: 'Quantity'
            },
            {
                dataField: 'precio',
                text: 'Total Price',
                editable: false,
            }


        ];
        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-9 offset-md-2">
                            {
                                this.getTitle()
                            }
                            <div className = "card-body">
                                <form onSubmit={e => { e.preventDefault() }}>
                                    <div className = "form-group">
                                        <label> Order Date: </label>
                                        <input placeholder="Order Date" name="orderDate" className="form-control" type="date"
                                               value={this.state.orderDate} onChange={this.changeOrderDateHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Work: </label>
                                        <select className="custom-select" onChange={this.selectWorkHandler}
                                                value={this.state.work.id}>
                                            <option selected>Choose...</option>
                                            {this.state.works.map((work) => {
                                                return (
                                                    <option key={work.id} value={work.id}>
                                                        {work.descripcion}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <h4>Items</h4>
                                        <TableEditable
                                            data={this.state.orderItems}
                                            columns={columns}
                                            onTableChange={(row, action) => this.handleTableChange(row, action)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label> State: </label>
                                        <select className="custom-select"
                                                disabled={this.state.id === '_add' ? true : null}
                                                onChange={this.selectTypeHandler}
                                                value={this.state.state}>
                                            <option selected>Choose...</option>
                                            <option value="1">NUEVO</option>
                                            <option value="2">CONFIRMADO</option>
                                            <option value="3">PENDIENTE</option>
                                            <option value="4">CANCELADO</option>
                                            <option value="2">ACEPTADO</option>
                                            <option value="3">RECHAZADO</option>
                                            <option value="4">EN PREPARACION</option>
                                            <option value="4">ENTREGADO</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateOrder}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateOrderComponent
