import React, { Component } from 'react'
import ProductService from '../../services/ProductService';

class CreateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            description: '',
            price: '',
            currentStock: '',
            minStock: '',
            unit: {
                id: ''
            }

        }
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        }else{
            ProductService.getProductById(this.state.id).then( (res) =>{
                let product = res.data;
                this.setState({
                    name: product.nombre,
                    description: product.descripcion,
                    price: product.precio,
                    currentStock : product.stockActual,
                    minStock : product.stockMinimo,
                    unit: {
                        id: product.unidad.id
                    }
                });
            });
        }
    }

    saveOrUpdateProduct = (e) => {
        e.preventDefault();
        let product = {
            nombre: this.state.name,
            descripcion: this.state.description,
            precio: this.state.price,
            stockActual: this.state.currentStock,
            stockMinimo: this.state.minStock,
            unidad: this.state.unit

        };
        console.log('product => ' + JSON.stringify(product));

        if(this.state.id === '_add'){
            ProductService.createProduct(product).then(res =>{
                this.props.history.push('/products');
            });
        }else{
            ProductService.updateProduct(product, this.state.id).then( res => {
                this.props.history.push('/products');
            });
        }
    }

    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }

    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }

    changeCurrentStockHandler= (event) => {
        this.setState({currentStock: event.target.value});
    }

    changeMinStockHandler= (event) => {
        this.setState({minStock: event.target.value});
    }

    selectUnitHandler= (event) => {
        const product = this.state;
        product.unit.id = event.target.value;
        this.setState(product);
    }

    cancel(){
        this.props.history.push('/products');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Product</h3>
        }else{
            return <h3 className="text-center">Update Product</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Name: </label>
                                        <input placeholder="Name" name="name" className="form-control"
                                               value={this.state.name}
                                               onChange={this.changeNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Description: </label>
                                        <input placeholder="Description" name="description" className="form-control"
                                               value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Price: </label>
                                        <input placeholder="Price" name="price" className="form-control" type="number"
                                               value={this.state.price} onChange={this.changePriceHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Current Stock: </label>
                                        <input placeholder="Current Stock" name="currentStock" className="form-control" type="number"
                                               value={this.state.currentStock} onChange={this.changeCurrentStockHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Minim Stock: </label>
                                        <input placeholder="Minim Stock" name="minStock" className="form-control" type="number"
                                               value={this.state.minStock} onChange={this.changeMinStockHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Unit: </label>
                                        <select className="custom-select" onChange={this.selectUnitHandler}
                                                value={this.state.unit.id}>
                                            <option selected>Choose...</option>
                                            <option value="1">Kg</option>
                                            <option value="2">m3</option>
                                            <option value="3">m2</option>
                                            <option value="4">l</option>
                                            <option value="5">Bags</option>
                                        </select>
                                    </div>


                                    <button className="btn btn-success" onClick={this.saveOrUpdateProduct}>Save</button>
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

export default CreateProductComponent
