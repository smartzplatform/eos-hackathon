import React, { PureComponent } from "react";

import "./TabBar.less";
import { tabs } from "./../Table";

export default class TabBar extends PureComponent {
  render() {
    const { gridTable, onClick } = this.props;

    const tabsLocal = [
      {
        name: tabs.RATES
      },
      {
        name: tabs.CONSUMERS
      },
      {
        name: tabs.COUNTERS
      },
      {
        name: tabs.STATISTICS
      }
    ];

    return (
      <div className="tab-bar">
        <ul className="tab-list flex">
          {tabsLocal.map((item, i) => (
            <li
              key={item.name + i}
              onClick={onClick(item.name)}
              className={`tab-item flex ${
                item.name === gridTable ? "select" : ""
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
