import React, { Component } from 'react';
import { connect } from 'react-redux'

class AddRow extends Component {
    add() {
        this.props.onAdd({
            index: this.props.index
        });
    }
    render() {
        return (
            <div
                title="Add a row here"
                className="addRow button"
                onClick={this.add.bind(this)}
            ></div>

        )
    }
}

export default connect(
    state => ({
        table: state.table
    }),
    dispatch => ({
        onAdd: (index) => {
            dispatch({ type: 'ADD_ROW', payload: index })
        }
    })
)(AddRow);