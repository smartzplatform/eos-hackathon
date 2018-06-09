import React, { PureComponent } from "react";

import "./GridTable.less";
import { tabs } from "../Table";
import Consumers from "./consumers/Consumers";
import Counters from "./counters/Counters";
import Rates from "./rates/Rates";
import Statistics from "./statistics/Statistics";

export default class GridTable extends PureComponent {
  render() {
    const { gridTable } = this.props;
    let content;

    switch (gridTable) {
      case tabs.CONSUMERS:
        content = <Consumers />;
        break;
      case tabs.COUNTERS:
        content = <Counters />;
        break;
      case tabs.RATES:
        content = <Rates />;
        break;
      case tabs.STATISTICS:
        content = <Statistics />;
        break;

      default:
        break;
    }
    return <div className="grid-table">{content}</div>;
  }
}
