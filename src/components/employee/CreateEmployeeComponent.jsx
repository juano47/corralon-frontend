import React, { Component } from 'react'
import EmployeeService from '../../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            dni: '',
            email: '',
            user:{
                id: '',
                username: '',
                password: ''
            }
        }
        /* this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
         this.changeLastNameHandler = this.changeLastNameHandler.bind(this);*/
        //this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({
                    firstName: employee.nombre,
                    lastName: employee.apellido,
                    dni: employee.dni,
                    email : employee.mail,
                    user: {
                        id: employee.user.id,
                        username: employee.user.user,
                    }

                });
            });
        }
    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {
            nombre: this.state.firstName,
            apellido: this.state.lastName,
            dni: this.state.dni,
            mail: this.state.email,
            user: {
                id: this.state.user.id,
                username: this.state.user.username,
                password: this.state.user.password,
                tipoUsuario:{
                    id: 2,
                    tipo: "Empleado"
                }
            }

        };
        console.log('employee => ' + JSON.stringify(employee));
        console.log('State id: ' + this.state.id);
        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }

    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeDniHandler= (event) => {
        this.setState({dni: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changeUsernameHandler= (event) => {
        const employee = this.state;
        employee.user.username = event.target.value;
        this.setState(employee);
    }

    changePasswordHandler= (event) => {
        const employee = this.state;
        employee.user.password = event.target.value;
        this.setState(employee);
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
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
                                        <label> First Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                               value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                               value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Dni: </label>
                                        <input placeholder="Dni" name="dni" className="form-control"
                                               value={this.state.dni} onChange={this.changeDniHandler}/>
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

                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
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

export default CreateEmployeeComponent
