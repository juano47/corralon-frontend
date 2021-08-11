import React, {Component, useState} from 'react'
import WorkService from '../../services/WorkService';
import ClientService from "../../services/ClientService";

class CreateWorkComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            description: '',
            latitude: '',
            longitude: '',
            address: '',
            area: '',
            type: '',
            client: {
                id: '',
                companyName:''
            },

            //extra state
            clients: []
        }
    }

    // step 3
    async componentDidMount(){

        //load clients
        ClientService.getClients().then((res) => {
            this.setState({clients: res.data});
        });


        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            const work= (await WorkService.getWorkById(this.state.id)).data;
            const client = (await ClientService.getClientByWorkId(this.state.id)).data;
            this.setState({
                description: work.descripcion,
                latitude: work.latitud,
                longitude: work.longitud,
                address : work.direccion,
                area : work.superficie,
                type: work.tipoObra.id,
                client: {
                    id: client.id,
                    companyName: client.razonSocial
                },
            });

        }
    }

    saveOrUpdateWork = (e) => {
        e.preventDefault();
        let work = {
            descripcion: this.state.description,
            latitud: this.state.latitude,
            longitud: this.state.longitude,
            direccion: this.state.address,
            superficie: this.state.area,
            tipoObra: {
                id: this.state.type
            },
            cliente: this.state.client

        };
        console.log('work => ' + JSON.stringify(work));
        // step 5
        if(this.state.id === '_add'){
            WorkService.createWork(work).then(res =>{
                this.props.history.push('/works');
            });
        }else{
            WorkService.updateWork(work, this.state.id).then( res => {
                this.props.history.push('/works');
            });
        }
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }

    changeLatitudeHandler= (event) => {
        this.setState({latitude: event.target.value});
    }

    changeLongitudeHandler= (event) => {
        this.setState({longitude: event.target.value});
    }

    changeAddressHandler= (event) => {
        this.setState({address: event.target.value});
    }

    changeAreaHandler= (event) => {
        this.setState({area: event.target.value});
    }

    selectTypeHandler= (event) => {
        this.setState({type: event.target.value});
    }

    selectClientHandler= (event) => {
        const work = this.state;
        work.client.id = event.target.value;
        this.setState(work);
    }

    cancel(){
        this.props.history.push('/works');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Work</h3>
        }else{
            return <h3 className="text-center">Update Work</h3>
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
                                        <label> Description: </label>
                                        <input placeholder="Description" name="description" className="form-control"
                                               value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Latitude: </label>
                                        <input placeholder="Latitude" name="latitude" className="form-control" type="number"
                                               value={this.state.latitude} onChange={this.changeLatitudeHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Longitude: </label>
                                        <input placeholder="Longitude" name="longitude" className="form-control" type="number"
                                               value={this.state.longitude} onChange={this.changeLongitudeHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Address: </label>
                                        <input placeholder="Address" name="address" className="form-control"
                                               value={this.state.address} onChange={this.changeAddressHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Area: </label>
                                        <input placeholder="Area" name="area" className="form-control" type="number"
                                               value={this.state.area} onChange={this.changeAreaHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Type: </label>
                                        <select className="custom-select" onChange={this.selectTypeHandler}
                                            value={this.state.type}>
                                            <option selected>Choose...</option>
                                            <option value="1">Reforma</option>
                                            <option value="2">Vivienda</option>
                                            <option value="3">Edificio</option>
                                            <option value="4">Vial</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label> Client: </label>
                                        <select className="custom-select" onChange={this.selectClientHandler}
                                            value={this.state.id}>
                                            <option selected>Choose...</option>
                                            {this.state.clients.map((client) => {
                                                return (
                                                    <option key={client.id} value={client.id}>
                                                        {client.razonSocial}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateWork}>Save</button>
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

export default CreateWorkComponent
