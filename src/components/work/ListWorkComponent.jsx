import React, { Component } from 'react'
import WorkService from '../../services/WorkService'
import ClientService from "../../services/ClientService";

class ListWorkComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            works: []
        }
        this.addWork = this.addWork.bind(this);
        this.editWork = this.editWork.bind(this);
        this.deleteWork = this.deleteWork.bind(this);
    }

    deleteWork(id){
        WorkService.deleteWork(id).then( res => {
            this.setState({works: this.state.works.filter(work => work.id !== id)});
        });
    }
    viewWork(id){
        this.props.history.push(`/view-work/${id}`);
    }
    editWork(id){
        this.props.history.push(`/add-work/${id}`);
    }

    async componentDidMount(){
        let works = (await WorkService.getWorks()).data;
        if(works) {
            await Promise.all(
                works.map(async (work) => {
                    work.cliente =  (await ClientService.getClientByWorkId(work.id)).data;
                })
            )
        }
        this.setState({ works: works})
    }

    addWork(){
        this.props.history.push('/add-work/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Works List</h2>
                <div className = "row">
                    <button className="btn btn-primary" onClick={this.addWork}> Add Work</button>
                </div>
                <br></br>
                <div className = "row">
                    <table className = "table table-striped table-bordered">

                        <thead>
                        <tr>
                            <th>Description</th>
                            <th>Address</th>
                            <th>Area</th>
                            <th>Type</th>
                            <th>Client</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.works.map(
                                work =>
                                    <tr key = {work.id}>
                                        <td> { work.descripcion} </td>
                                        <td> {work.direccion}</td>
                                        <td> {work.superficie}</td>
                                        <td> {work.tipoObra.descripcion}</td>
                                        <td> {work.cliente.razonSocial}</td>
                                        <td>
                                            <button onClick={ () => this.editWork(work.id)} className="btn btn-info">Update </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteWork(work.id)} className="btn btn-danger">Delete </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.viewWork(work.id)} className="btn btn-info">View </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default ListWorkComponent
