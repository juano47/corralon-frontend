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
        const columns = this.props.columns;
        const fields = columns.map(column => {
            return column.dataField;
        })

        let emptyRow =  {
            id: this.props.data.length + 1
        };

        fields.forEach(field => {
            emptyRow[field] = ''
        })

        this.onAfterSaveCell(emptyRow)
    }

    render() {
        const idColumn = {
            dataField: 'id',
            hidden: true
        };

        const actionColumn = {
            isDummyField: true,
            editable: false,
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
        };

        const columns = this.props.columns.slice();
        columns.push(idColumn);
        columns.push(actionColumn);

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
