import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.sass';

import Item from "./Item.jsx";
import RowDelite from "./RowDelite.jsx";
import AddDelite from "./AddDelite.jsx";

class App extends Component {
    render() {
        return (
            <div className="wrap">

                <div className="content">

                    {this.props.table[0].data.map((row, parentindex) =>
                        <div
                            className={"row row_" + parentindex}
                            id={"row_" + parentindex}>

                            <RowDelite index={parentindex}></RowDelite>
                            <AddDelite index={parentindex}></AddDelite>
                            {row.data.map((item, index) =>

                                <Item
                                    name="item"
                                    similar={item.similar}
                                    ID={item.ID}
                                    parentID={parentindex}
                                    index={index}
                                    Amount={item.Amount}
                                ></Item>

                            )}

                            {
                                <Item
                                    name="summRow"
                                    percent={row.summRow.percent}
                                    index={parentindex}
                                    Amount={row.summRow.amount}
                                ></Item>
                            }

                        </div>
                    )}
                    {
                        <div className={"row row_mediumColl"} id={"row_mediumColl"}>

                            {this.props.table[0].mediumColl.map((item, index) =>
                                <span className={"item item_mediumColl"} id={"item_mediumColl_" + index} > {item}</span>
                            )}
                            <span className={"item item_mediumColl_clear"} id={"item_mediumColl_clear"} ></span>
                        </div>
                    }
                </div>

                <div>
                </div>

            </div>

        )
    }
}

export default connect(
    state => ({
        table: state.table,
    }),
    dispatch => ({
        onRowDelite: (id) => {
            console.log(333);
            dispatch({ type: 'ADD_TRACK', payload: id })
        }
    })
)(App);