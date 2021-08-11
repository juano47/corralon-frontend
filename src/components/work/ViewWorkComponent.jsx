import React, { Component } from 'react'
import WorkService from '../../services/WorkService'
import ClientService from "../../services/ClientService";

class ViewWorkComponent extends Component {
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
                companyName:'',
                cuit: ''
            },
        }
    }

    async componentDidMount(){
        const work= (await WorkService.getWorkById(this.state.id)).data;
        const client = (await ClientService.getClientByWorkId(this.state.id)).data;
        this.setState({
            description: work.descripcion,
            latitude: work.latitud,
            longitude: work.longitud,
            address : work.direccion,
            area : work.superficie,
            type: work.tipoObra.descripcion,
            client: {
                id: client.id,
                companyName: client.razonSocial,
                cuit: client.cuit
            },
        });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Work Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Description: </label>
                            <div> { this.state.description }</div>
                        </div>
                        <div className = "row">
                            <label> Latitude: </label>
                            <div> { this.state.latitude }</div>
                        </div>
                        <div className = "row">
                            <label> Longitude: </label>
                            <div> { this.state.longitude }</div>
                        </div>
                        <div className = "row">
                            <label> Address: </label>
                            <div> { this.state.address }</div>
                        </div>
                        <div className = "row">
                            <label> Area: </label>
                            <div> { this.state.area }</div>
                        </div>
                        <div className = "row">
                            <label> Type: </label>
                            <div> { this.state.type }</div>
                        </div>
                        <br/>
                        <div className = "row">
                            <h5>Client</h5>
                        </div>
                        <div className = "row">
                            <label> Company: </label>
                            <div> { this.state.client.companyName }</div>
                        </div>
                        <div className = "row">
                            <label> CUIT: </label>
                            <div> { this.state.client.cuit }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewWorkComponent
