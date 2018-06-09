import React, { Component } from "react";

import "./Table.less";

export default class Table extends Component {
  render() {
    const { data } = this.props;
    if (!data) {
      return null;
    }
    return (
      <div className="table">
        <div className="header">
          <ul className="header-list flex-v">
            {data.headers.map((item, i) => {
              return (
                <li key={item + i} className="header-item flex-v">
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="table-list">
          {data.fields.map((item, i) => {
            return (
              <li className="table-item flex" key={item + i}>
                {item.map((item, i) => {
                  return (
                    <div className="field flex-v" key={item + "5sdf" + i}>
                      {item}
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
