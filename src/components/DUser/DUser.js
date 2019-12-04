import React, { Component } from 'react'
import axios from 'axios';

export class DUser extends Component {
    constructor() {
        super();
        this.state = {
            emps: [],
            emp: {
                deptId: 0,
                deptName: '',
                empName: '',
                empSalary: 0
            }
        }
        this.submitHandler = this.submitHandler.bind(this);
    }
    componentDidMount(prevProps, prevState) {
        axios.get('https://localhost:5001/api/emp')
            .then(res => {
                this.setState({ emps: res.data });
            })
            .catch(err => console.log(err));
    }

    getData() {
        axios.get('https://localhost:5001/api/emp')
            .then(res => {
                this.setState({ emps: res.data });
            })
            .catch(err => console.log(err));
    }

    inputHandler = (event) => {
        this.state.emp[event.target.name] = event.target.value;
        this.setState({ emp: this.state.emp });
    }

    submitHandler(e) {
        e.preventDefault();
        let data = { deptId: parseInt(this.state.emp.deptId), empSalary: parseInt(this.state.emp.empSalary), empName: this.state.emp.empName, deptName: this.state.emp.deptName };
        console.log(data);
        axios.post('https://localhost:5001/api/emp', data)
            .then(res => {
                this.getData();
            })
            .catch(err => console.log(err));
    }

    editHandler(id) {
        axios.get('https://localhost:5001/api/uemp/' + id)
            .then(res => {
                this.getData();
            })
            .catch(err => console.log(err));
    }

    render() {
        let employeeList = this.state.emps.map((x, index) => (
            <tr key={index}>
                <td>{x.deptId}</td>
                <td>{x.deptName}</td>
                <td>{x.empName}</td>
                <td>{x.empSalary}</td>
                <td>
                    <button className="w3-btn w3-blue" onClick={() => this.editHandler(x.deptId)}>Edit</button>
                </td>
            </tr>
        ))
        return (
            <div className="w3-container" style={{ paddingTop: '80px' }}>
                <h1>Output:</h1>
                <table className="w3-table w3-striped w3-border">
                    <thead>
                        <tr>
                            <th>Dept ID</th>
                            <th>Dept Name</th>
                            <th>Emp Name</th>
                            <th>Salary</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeList}
                    </tbody>
                </table>
                <div className="w3-container w3-border w3-margin-top">
                    <h1>Add New</h1>
                    <form onSubmit={this.submitHandler}>
                        <div className="w3-row w3-section">
                            <div className="w3-col" style={{ width: '120px', padding: '10px' }}>
                                <label className="w3-medium">Dept Id</label>
                            </div>
                            <div className="w3-rest">
                                <input className="w3-input w3-border" type="number" name="deptId" onChange={e => this.inputHandler(e)} required />
                            </div>
                        </div>
                        <div className="w3-row w3-section">
                            <div className="w3-col" style={{ width: '120px', padding: '10px' }}>
                                <label className="w3-medium">Dept Name</label>
                            </div>
                            <div className="w3-rest">
                                <input className="w3-input w3-border" type="text" name="deptName" onChange={e => this.inputHandler(e)} required />
                            </div>
                        </div>
                        <div className="w3-row w3-section">
                            <div className="w3-col" style={{ width: '120px', padding: '10px' }}>
                                <label className="w3-medium">Emp Name</label>
                            </div>
                            <div className="w3-rest">
                                <input className="w3-input w3-border" type="text" name="empName" onChange={e => this.inputHandler(e)} required />
                            </div>
                        </div>
                        <div className="w3-row w3-section">
                            <div className="w3-col" style={{ width: '120px', padding: '10px' }}>
                                <label className="w3-medium">Salary</label>
                            </div>
                            <div className="w3-rest">
                                <input className="w3-input w3-border" type="number" name="empSalary" onChange={e => this.inputHandler(e)} required />
                            </div>
                        </div>
                        <p className="clearfix">
                            <button className="w3-btn main-bg-color div-title" style={{ float: 'right' }}>Add</button>
                        </p>
                    </form>
                </div>
            </div >
        )
    }
}

export default DUser
