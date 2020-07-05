import React, { Component } from 'react';
import { connect } from 'react-redux'

class Item extends Component {
    increment() {
        this.props.onIncrement({
            pID: this.props.parentID,
            ID: this.props.index
        });
    }
    hover() {
        this.props.onHover({
            pID: this.props.parentID,
            ID: this.props.index
        });
    }
    noHover() {
        this.props.ofHover({
            pID: this.props.parentID,
            ID: this.props.index
        });
    }

    render() {
        let id;
        if (this.props.ID) {
            id = this.props.ID
        } else {
            id = this.props.index
        }
        if (this.props.name === 'item') {
            let similar = ' ';

            if (this.props.similar) {
                similar = " similar";
            }
            return (
                <div
                    onMouseEnter={this.hover.bind(this)}
                    onMouseLeave={this.noHover.bind(this)}
                    onClick={this.increment.bind(this)}
                    className={"item " + this.props.name + "_" + this.props.index + similar}
                    id={this.props.name + "_" + id}
                    key={this.props.index}
                >
                    {this.props.Amount}
                </div>
            )
        }
        if (this.props.name === 'summRow') {

            let content = this.props.Amount;
            let percent = { top: "100%" };
            if (this.props.percent) {
                content = this.props.percent + "%";
                let count = 100 - this.props.percent;
                percent = {
                    top: count + "%"
                };
            }
            return (
                < div
                    className={
                        "item " + this.props.name + "_" + this.props.index
                    }
                    id={this.props.name + "_" + id}
                    key={this.props.index} >
                    <span className={this.props.name + "_cont"}>
                        {content}
                    </span>
                    <span
                        style={percent}
                        className={this.props.name + "_bg"}
                    ></span>

                </div >
            )
        }
    }
}
export default connect(
    state => ({
        table: state.table
    }),
    dispatch => ({
        onIncrement: (ids) => {
            dispatch({ type: 'INCREMENT', payload: ids })
        },
        onHover: (ids) => {
            dispatch({ type: 'HOVER', payload: ids })
        },
        ofHover(ids) {
            dispatch({ type: 'OF_HOVER', payload: ids })
        }
    })
)(Item);