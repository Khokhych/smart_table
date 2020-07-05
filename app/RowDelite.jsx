import React, { Component } from 'react';
import { connect } from 'react-redux'

class RowDelite extends Component {
    delite() {
        this.props.onDelite({
            ID: this.props.index
        });
    }
    render() {
        return (
            <div
                title="Delete this row"
                className="rowDelite button"
                onClick={this.delite.bind(this)}
            ></div>

        )
    }
}

export default connect(
    state => ({
        table: state.table
    }),
    dispatch => ({
        onDelite: (ID) => {
            dispatch({ type: 'DELITE', payload: ID })
        }
    })
)(RowDelite);