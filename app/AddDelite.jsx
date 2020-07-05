import React, { Component } from 'react';
import { connect } from 'react-redux'

class AddDelite extends Component {
    add() {
        this.props.onAdd({
            index: this.props.index
        });
    }
    render() {
        return (
            <div
                title="Add a line here"
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
)(AddDelite);