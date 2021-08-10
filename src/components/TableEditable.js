import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import {IoAddCircle, MdDeleteForever} from "react-icons/all";



class TableEditable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: []
        };

        this.handleDeleteRow = this.handleDeleteRow.bind();
    }

    onAfterSaveCell(row){
        console.log('onChange ' + JSON.stringify(row))
        this.props.onTableChange(row, 'saveOrUpdate');
    }

    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            this.setState(() => ({
                selected: [...this.state.selected, row.id]
            }));
        } else {
            this.setState(() => ({
                selected: this.state.selected.filter(x => x !== row.id)
            }));
        }
    }

    handleDeleteRow = (row) => {
        this.props.onTableChange(row, 'delete');
    }

    handleAddRow = () => {

        const emptyCell = {
            id: this.props.data.length + 1,
            descripcion: '',
            latitud: '',
            longitud: '',
            direccion: '',
            superficie: '',
            type: ''
        }

        this.onAfterSaveCell(emptyCell)
    }

    handleSelectedType = (row) => {
        console.log('selected type ' + JSON.stringify(row))
    }

    render() {
        const columns = [
            {
                dataField: 'id',
                hidden: true
            },
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
                            label: ''
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
            },
            {
                isDummyField: true,

                formatter: (cell, row) => {
                    return <button
                        className="btn btn-danger"
                        onClick={() => this.handleDeleteRow(row)}>
                        <MdDeleteForever />
                    </button>
                },
                headerFormatter: () => {
                    return <button
                        className="btn btn-success"
                        onClick={() => this.handleAddRow()}>
                        <IoAddCircle />
                    </button>
                }
            }
        ];

        return (
            <div>
                <BootstrapTable
                    keyField="id"
                    data={this.props.data}
                    columns={columns}
                    cellEdit={
                        cellEditFactory({
                            mode: 'click',
                            blurToSave: true,
                            afterSaveCell: (row) =>
                                this.onAfterSaveCell(row)
                        })
                    }
                />
            </div>
        );
    }
}

export default TableEditable;
