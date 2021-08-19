import React, { Component } from 'react'
import ClientService from '../../services/ClientService';
import TableEditable from "../TableEditable";
import {Type} from "react-bootstrap-table2-editor";

class CreateClientComponent extends Component {
    constructor(props) {
        super(props)


        this.state = {
            // step 2
            id: this.props.match.params.id,
            companyName: '',
            cuit: '',
            email: '',
            maxLimitCheckingAccount: '',
            works: [],
            user:{
                id: '',
                username: '',
                password: ''
            }
        }
        /* this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
         this.changeLastNameHandler = this.changeLastNameHandler.bind(this);*/
        //this.saveOrUpdateClient = this.saveOrUpdateClient.bind(this);
    }

    // step 3
    componentDidMount(){
        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ClientService.getClientById(this.state.id).then( (res) =>{
                let client = res.data;
                const works = client.obras.map(work => {
                    return(
                        {
                            id: work.id,
                            descripcion: work.descripcion,
                            latitud: work.latitud,
                            longitud: work.longitud,
                            direccion: work.direccion,
                            superficie: work.superficie,
                            type: work.tipoObra.descripcion

                        }
                    )
                })
                this.setState({
                    companyName: client.razonSocial,
                    cuit: client.cuit,
                    maxLimitCheckingAccount: client.maxCuentaCorriente,
                    email : client.mail,
                    user: {
                        id: client.user.id,
                        username: client.user.username,
                        password: client.user.password
                    },
                    works: works
                });
            });
        }
    }

    saveOrUpdateClient = (e) => {
        console.log(JSON.stringify(this.state));
        e.preventDefault();
        const obras = this.state.works.map(work => {
            let tipoObraId;
            switch(work.type){
                case 'Reforma': tipoObraId = 1; break;
                case 'Vivienda': tipoObraId = 2; break;
                case 'Edificio': tipoObraId = 3; break;
                case 'Vial': tipoObraId = 4; break;
            }
            return (
                {
                    descripcion: work.descripcion,
                    latitud: work.latitud,
                    longitud: work.longitud,
                    direccion: work.direccion,
                    superficie: work.superficie,
                    tipoObra:{
                        id: tipoObraId,
                        descripcion: work.type
                    }
                }
            )
        })
        let client = {
            razonSocial: this.state.companyName,
            cuit: this.state.cuit,
            mail: this.state.email,
            maxCuentaCorriente: this.state.maxLimitCheckingAccount,
            user: {
                id: this.state.user.id,
                username: this.state.user.username,
                password: this.state.user.password,
                tipoUsuario:{
                    id: 1,
                    tipo: "Cliente"
                }
            },
            obras: obras

        };
        console.log('client => ' + JSON.stringify(client));
        // step 5
        if(this.state.id === '_add'){
            ClientService.createClient(client).then(res =>{
                this.props.history.push('/clients');
            });
        }else{
            ClientService.updateClient(client, this.state.id).then( res => {
                this.props.history.push('/clients');
            });
        }
    }

    changeCompanyNameHandler= (event) => {
        this.setState({companyName: event.target.value});
    }

    changeCuitHandler= (event) => {
        this.setState({cuit: event.target.value});
    }

    changeMaxLimitCheckingAccountHandler= (event) => {
        this.setState({maxLimitCheckingAccount: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changeUsernameHandler= (event) => {
        const client = this.state;
        client.user.username = event.target.value;
        this.setState(client);
    }

    changePasswordHandler= (event) => {
        const client = this.state;
        client.user.password = event.target.value;
        this.setState(client);
    }

    cancel(){
        this.props.history.push('/clients');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Client</h3>
        }else{
            return <h3 className="text-center">Update Client</h3>
        }
    }

    handleTableChange(row, action){
        if(!row.id){
            return;
        }
        console.log('entra a delete row' + JSON.stringify(row))

        let works = this.state.works.slice();

        switch (action){
            case 'saveOrUpdate':
                let updateAction = false;

                works.map(t => {
                    if(t.id === row.id){
                        Object.assign(t, row);
                        updateAction = true;
                    }
                })
                if(!updateAction){
                    works.push(row);
                }
                break;
            case 'delete':
                console.log('action ' + action)
                works = works.filter(t => t.id !== row.id)
                break;
        }

        this.setState({works: works});
        console.log(works);
    }

    render() {
        const columns = [
            {
                dataField: 'descripcion',
                text: 'Description'
            },
            {
                dataField: 'latitud',
                text: 'Latitude'
            },
            {
                dataField: 'longitud',
                text: 'Longitude'
            },
            {
                dataField: 'direccion',
                text: 'Address'
            },
            {
                dataField: 'superficie',
                text: 'Area'
            },
            {
                dataField: 'type',
                text: 'Type',
                editor: {
                    type: Type.SELECT,
                    getOptions: (setOptions, { row, column }) => {
                        /*console.log(`current editing row id: ${row.id}`);
                        console.log(`current editing column: ${column.dataField}`);*/
                        return [{
                            value: '',
                            label: 'Choose...'
                        }, {
                            value: 'Vivienda',
                            label: 'Vivienda'
                        }, {
                            value: 'Edificio',
                            label: 'Edificio'
                        }, {
                            value: 'Reforma',
                            label: 'Reforma'
                        }, {
                            value: 'Vial',
                            label: 'Vial'
                        }];
                    }
                }
            }
        ]
        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-12">
                            {
                                this.getTitle()
                            }
                            <div className = "card-body">
                                <form onSubmit={e => { e.preventDefault() }}>
                                    <div className = "form-group">
                                        <label> Company Name: </label>
                                        <input placeholder="Company Name" name="companyName" className="form-control"
                                               value={this.state.companyName} onChange={this.changeCompanyNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> CUIT: </label>
                                        <input placeholder="Cuit" name="cuit" className="form-control"
                                               value={this.state.cuit} onChange={this.changeCuitHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Max Limit Checking Account: </label>
                                        <input placeholder="Max Limit Checking Account" name="maxLimitCheckingAccount" className="form-control"
                                               value={this.state.maxLimitCheckingAccount} onChange={this.changeMaxLimitCheckingAccountHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Email: </label>
                                        <input placeholder="Email Address" name="email" className="form-control"
                                               value={this.state.email} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Username: </label>
                                        <input placeholder="Username" name="username" className="form-control"
                                               value={this.state.user.username} onChange={this.changeUsernameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Password: </label>
                                        <input placeholder="Password" name="password" className="form-control"
                                               value={this.state.user.password} onChange={this.changePasswordHandler}/>
                                    </div>
                                    <div>
                                        <h4>Works</h4>
                                        <TableEditable
                                            data={this.state.works}
                                            columns={columns}
                                            onTableChange={(row, action) => this.handleTableChange(row, action)}
                                        />
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateClient}>Save</button>
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

export default CreateClientComponent
