import React, { Component } from 'react';
import { connect } from 'react-redux'

class AddStartData extends Component {
    add() {
        if (this.collInput.valueAsNumber > 0 && this.rowInput.valueAsNumber > 0 && this.x.valueAsNumber > 0) {
            this.props.onAdd({
                collInput: this.collInput.valueAsNumber,
                rowInput: this.rowInput.valueAsNumber,
                x: this.x.valueAsNumber
            });
        }
    }
    render() {
        return (
            <div
                className="wrap_input_def"
            >
                <div className="title_input_def">All fields must be filled in, number at least 1.</div>

                <label className="label_wrap" htmlFor="input_Сolumns">
                    <div className="label_text">
                        The number of columns
                    </div>
                    <input
                        className="input_def"
                        title="number 1 or more" required min="1" id="input_Сolumns" placeholder="Сolumns" type="number" ref={collInput => this.collInput = collInput} />
                </label>


                <label className="label_wrap" htmlFor="input_Rows">
                    <div className="label_text">
                        The number of rows
                    </div>
                    <input
                        className="input_def"
                        title="number 1 or more" required min="1" id="input_Rows" placeholder="Rows" type="number" ref={rowInput => this.rowInput = rowInput} />
                </label>


                <label className="label_wrap" htmlFor="input_x">
                    <div className="label_text">
                        The number of similar cells
                    </div>
                    <input
                        className="input_def"
                        title="number 1 or more" required min="1" id="input_x" placeholder="x" type="number" ref={x => this.x = x} />
                </label>


                <div className="label_wrap">
                    <input
                        className="submit input_def"
                        onClick={this.add.bind(this)}
                        type="submit"
                    />
                </div>

            </div>

        )
    }
}

export default connect(
    state => ({
        table: state.table
    }),
    dispatch => ({
        onAdd: (values) => {
            dispatch({ type: 'ADD_START_DATA', payload: values })
        }
    })
)(AddStartData);