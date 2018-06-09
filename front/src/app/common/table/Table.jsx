import React, { Component } from "react";

import "./Table.less";

export default class Table extends Component {
  render() {
    if (!this.props.data) {
      return null;
    }

    const { headers, order, fields } = this.props.data;

    return (
      <div className="table">
        <div className="header">
          <ul className="header-list flex-v">
            {headers.map((item, i) => {
              return (
                <li key={item + i} className="header-item flex-v">
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="table-list">
          {fields.map((row, i) => {
            return (
              <li className="table-item flex" key={row + i}>
                {order.map((item, i) => {
                  return (
                    <div className="field flex-v" key={item + "5sdf" + i}>
                      {row[item]}
                    </div>
                  );
                })}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
