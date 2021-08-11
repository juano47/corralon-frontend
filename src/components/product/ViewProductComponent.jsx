import React, { Component } from 'react'
import ProductService from '../../services/ProductService'

class ViewProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        ProductService.getProductById(this.state.id).then( res => {
            this.setState({employee: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Product Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Name: </label>
                            <div> { this.state.employee.nombre }</div>
                        </div>
                        <div className = "row">
                            <label> Description: </label>
                            <div> { this.state.employee.descripcion }</div>
                        </div>
                        <div className = "row">
                            <label> Price: </label>
                            <div> { this.state.employee.precio }</div>
                        </div>
                        <div className = "row">
                            <label> Current Stock: </label>
                            <div> { this.state.employee.stockActual }</div>
                        </div>
                        <div className = "row">
                            <label> Minim Stock: </label>
                            <div> { this.state.employee.stockMinimo }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewProductComponent
